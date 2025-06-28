
"use client";

import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const translations = {
    en: {
        title: "Model Access Error (Step 2)",
        p1: "Thank you for enabling the Vertex AI API. Unfortunately, the error persists, which is common with preview models.",
        p2: "The most likely cause is that your Firebase project was created in a <strong>geographic region</strong> where this specific image model is not yet available.",
        step1: "Check your region:",
        step1_link: "Go to your Firebase project settings",
        step1_text: "and note the 'Default GCP resource location'.",
        step2: "Check model availability:",
        step2_link: "Consult the Gemini model region list",
        step2_text: "and ensure your region is listed for `gemini-2.0-flash` models.",
        p3: "If your region is not compatible, the only solution is to create a <strong>new Firebase project</strong> in a supported region (like `us-central1`) and use its API keys.",
        p4: "This is a limitation of early-access models and is outside the application's control.",
    },
    fr: {
        title: "Erreur d'Accès au Modèle (Étape 2)",
        p1: "Merci d'avoir activé l'API Vertex AI. Malheureusement, l'erreur persiste, ce qui est courant avec les modèles en avant-première ('preview').",
        p2: "La cause la plus probable est que votre projet Firebase a été créé dans une <strong>région géographique</strong> où ce modèle d'image n'est pas encore disponible.",
        step1: "Vérifiez votre région :",
        step1_link: "Allez dans les paramètres de votre projet Firebase",
        step1_text: "et notez votre 'Default GCP resource location'.",
        step2: "Vérifiez la disponibilité du modèle :",
        step2_link: "Consultez la liste des régions pour les modèles Gemini",
        step2_text: "et assurez-vous que votre région est listée pour les modèles `gemini-2.0-flash`.",
        p3: "Si votre région n'est pas compatible, la seule solution est de créer un <strong>nouveau projet Firebase</strong> dans une région supportée (comme `us-central1`) et d'utiliser ses clés API.",
        p4: "Ceci est une limitation des modèles en accès anticipé et est hors du contrôle de l'application.",
    },
    es: {
        title: "Error de Acceso al Modelo (Paso 2)",
        p1: "Gracias por habilitar la API de Vertex AI. Desafortunadamente, el error persiste, lo cual es común con los modelos en vista previa ('preview').",
        p2: "La causa más probable es que su proyecto de Firebase fue creado en una <strong>región geográfica</strong> donde este modelo de imagen específico aún no está disponible.",
        step1: "Verifique su región:",
        step1_link: "Vaya a la configuración de su proyecto de Firebase",
        step1_text: "y anote la 'Default GCP resource location'.",
        step2: "Verifique la disponibilidad del modelo:",
        step2_link: "Consulte la lista de regiones para los modelos Gemini",
        step2_text: "y asegúrese de que su región esté en la lista para los modelos `gemini-2.0-flash`.",
        p3: "Si su región no es compatible, la única solución es crear un <strong>nuevo proyecto de Firebase</strong> en una región admitida (como `us-central1`) y usar sus claves de API.",
        p4: "Esta es una limitación de los modelos de acceso anticipado y está fuera del control de la aplicación.",
    }
};

export default function ModelAccessError() {
    const { language } = useLanguage();
    const t = translations[language] || translations.en;
    // Dynamically create a direct link to the user's specific Firebase project settings
    const firebaseSettingsLink = `https://console.firebase.google.com/project/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/settings/general`;

    return (
        <Card className="mt-4 border-destructive bg-destructive/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <CardTitle className="text-destructive text-lg">{t.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-destructive/90">
              <p>{t.p1}</p>
              <p dangerouslySetInnerHTML={{ __html: t.p2 }} />
              <ol className="list-decimal list-inside space-y-2 pt-1">
                <li>
                  <strong>{t.step1}</strong>{' '}
                  <a href={firebaseSettingsLink} target="_blank" rel="noopener noreferrer" className="underline font-semibold text-destructive hover:text-destructive/80">
                    {t.step1_link}
                  </a>{' '}
                  {t.step1_text}
                </li>
                <li>
                  <strong>{t.step2}</strong>{' '}
                  <a href="https://cloud.google.com/vertex-ai/docs/generative-ai/locations#gemini-models" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-destructive hover:text-destructive/80">
                    {t.step2_link}
                  </a>{' '}
                  {t.step2_text}
                </li>
              </ol>
              <p className="pt-2 font-medium" dangerouslySetInnerHTML={{ __html: t.p3 }} />
              <p className="pt-1 text-xs italic">{t.p4}</p>
          </CardContent>
        </Card>
    )
}
