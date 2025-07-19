// This script is used to import the AI tool data into Firestore.
// It should be run from the command line using `npm run import-firestore`.
// Before running, you must set up authentication by creating a service account key.
//
// How to set up authentication:
// 1. Go to your Firebase project settings in the Firebase Console.
// 2. Navigate to the "Service accounts" tab.
// 3. Click "Generate new private key". This will download a JSON file.
// 4. IMPORTANT: Rename this downloaded file to `service-account-key.json`.
// 5. Place the `service-account-key.json` file in the root directory of your project (the same level as package.json).
// 6. Ensure this file is listed in your `.gitignore` file to prevent it from being committed to your repository. It contains sensitive credentials.
//
// Once the setup is complete, you can run `npm run import-firestore` to populate the 'tools' collection.

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// --- IMPORTANT: Path to your service account key file ---
const serviceAccountKeyPath = path.resolve(__dirname, '../service-account-key.json');
const aiToolDataPath = path.resolve(__dirname, '../src/ai-tool-data.json');

// Check if service account key exists
if (!fs.existsSync(serviceAccountKeyPath)) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: `service-account-key.json` not found in the project root.');
  console.error('Please follow the setup instructions in `scripts/import-firestore.js` to create and place the file.');
  process.exit(1);
}

// Check if tool data file exists
if (!fs.existsSync(aiToolDataPath)) {
    console.error('\x1b[31m%s\x1b[0m', `ERROR: \`src/ai-tool-data.json\` not found.`);
    process.exit(1);
}

const serviceAccount = require(serviceAccountKeyPath);
const aiTools = require(aiToolDataPath);

// Initialize Firebase Admin SDK
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} catch (error) {
    if (error.code === 'app/duplicate-app') {
        console.log('Firebase Admin SDK already initialized.');
    } else {
        console.error('\x1b[31m%s\x1b[0m', 'Firebase Admin SDK initialization error:', error);
        process.exit(1);
    }
}


const db = admin.firestore();
const toolsCollection = db.collection('tools');

async function deleteCollection(collectionRef, batchSize = 100) {
    const query = collectionRef.orderBy('__name__').limit(batchSize);
    let snapshot = await query.get();
    
    if (snapshot.size === 0) {
        return;
    }

    let numDeleted = 0;
    while (snapshot.size > 0) {
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        numDeleted += snapshot.size;
        snapshot = await query.get();
    }
    console.log(`\x1b[33m%s\x1b[0m`,`Successfully deleted ${numDeleted} old tool documents.`);
}

async function importData() {
  // Delete all existing documents in the collection first
  console.log("Clearing existing 'tools' collection...");
  await deleteCollection(toolsCollection);
  console.log("'tools' collection cleared.");

  if (!aiTools || aiTools.length === 0) {
    console.log('No tools to import.');
    return;
  }

  console.log(`Starting import of ${aiTools.length} tools...`);
  const batch = db.batch();

  for (const tool of aiTools) {
    // We will use the tool's own `id` field as the document ID in Firestore.
    // This makes it easier to link favorites and access tools directly.
    if (!tool.id) {
        console.warn('\x1b[33m%s\x1b[0m', `Skipping tool without an ID: ${tool.name}`);
        continue;
    }
    const docRef = toolsCollection.doc(tool.id);
    batch.set(docRef, tool);
  }

  try {
    await batch.commit();
    console.log('\x1b[32m%s\x1b[0m', `Successfully imported ${aiTools.length} tools to the 'tools' collection.`);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error importing data:', error);
  }
}

importData();
