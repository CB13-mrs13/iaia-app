import { onRequest } from 'firebase-functions/v2/https';
const server = await import('firebase-frameworks');
export const ssriaia5ecf3 = onRequest({ region: 'us-central1' }, (req, res) => {
  server.handle(req, res);
});