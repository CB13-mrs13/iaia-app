
"use client";

import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const translations = {
    en: {
        title: "Model Access Error",
        p1: "The image generation model is not available for your API key.",
        p2: "This usually happens when the 'Vertex AI' API is not enabled in your Google Cloud project, or if the specific model requires authorization.",
        step1: "Enable the Vertex AI API:",
        step1_link: "Click here to go to the Google Cloud console",
        step1_end: "and enable the API for your project.",
        step2: "Check model access:",
        step2_text: "This model may be in 'preview'. Ensure your account has access to it.",
        p3: "After enabling the API, please try generating an image again.",
    },
    fr: {
        title: "Erreur d'accès au modèle",
        p1: "Le modèle de génération d'images n'est pas disponible pour votre clé API.",
        p2: "Cela se produit généralement lorsque l'API 'Vertex AI' n'est pas activée dans votre projet Google Cloud, ou si le modèle spécifique nécessite une autorisation.",
        step1: "Activez l'API Vertex AI :",
        step1_link: "Cliquez ici pour aller à la console Google Cloud",
        step1_end: "et activez l'API pour votre projet.",
        step2: "Vérifiez l'accès au modèle :",
        step2_text: "Ce modèle peut être en 'preview'. Assurez-vous que votre compte y a accès.",
        p3: "Après avoir activé l'API, veuillez réessayer de générer une image.",
    },
    es: {
        title: "Error de acceso al modelo",
        p1: "El modelo de generación de imágenes no está disponible para su clave de API.",
        p2: "Esto suele ocurrir cuando la API de 'Vertex AI' no está habilitada en su proyecto de Google Cloud, o si el modelo específico requiere autorización.",
        step1: "Habilite la API de Vertex AI:",
        step1_link: "Haga clic aquí para ir a la consola de Google Cloud",
        step1_end: "y habilite la API para su proyecto.",
        step2: "Verifique el acceso al modelo:",
        step2_text: "Este modelo puede estar en 'preview'. Asegúrese de que su cuenta tenga acceso a él.",
        p3: "Después de habilitar la API, intente generar una imagen nuevamente.",
    }
}

export default function ModelAccessError() {
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

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
              <p>{t.p2}</p>
              <ol className="list-decimal list-inside space-y-2 pt-1">
                <li>
                  <strong>{t.step1}</strong>{' '}
                  <a href="https://console.cloud.google.com/apis/library/aiplatform.googleapis.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-destructive hover:text-destructive/80">
                    {t.step1_link}
                  </a>{' '}
                  {t.step1_end}
                </li>
                <li>
                  <strong>{t.step2}</strong>{' '}
                  {t.step2_text}
                </li>
              </ol>
              <p className="pt-2 font-medium">{t.p3}</p>
          </CardContent>
        </Card>
    )
}
