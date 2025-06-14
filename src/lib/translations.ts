
import type { SupportedLanguage } from '@/contexts/language-context';

// Define a general structure for your translations
// You can expand this as your app grows
type PageTranslations = {
  searchForm: {
    title: string;
    description: string;
    promptPlaceholder: string;
    button: string;
  };
  home: {
    discoverTitle: string;
    discoverSubtitle: string;
    searchPlaceholder: string;
    noToolsFound: string;
    tryAdjustingFilters: string;
  };
  filters: {
    title: string;
    allToolsButton: string;
  };
};

export const translations: Record<SupportedLanguage, PageTranslations> = {
  en: {
    searchForm: {
      title: "AI-Powered Tool Finder",
      description: "Describe what you want to achieve, and our AI will suggest the best tool for the job!",
      promptPlaceholder: "e.g., 'I need to create a professional presentation with animated charts' or 'Help me write a blog post about climate change'",
      button: "Get Suggestion",
    },
    home: {
      discoverTitle: "Discover Top AI Tools",
      discoverSubtitle: "Browse our curated list of AI tools or use filters to find exactly what you need.",
      searchPlaceholder: "Search tools by name, description, or tag...",
      noToolsFound: "No tools found matching your criteria.",
      tryAdjustingFilters: "Try adjusting your filters or search term.",
    },
    filters: {
      title: "Filter by Category",
      allToolsButton: "All Tools",
    }
  },
  fr: {
    searchForm: {
      title: "Découverte d'outils par IA", // Vous fournirez ce texte
      description: "Décrivez ce que vous voulez accomplir, et notre IA vous suggérera le meilleur outil !", // Vous fournirez ce texte
      promptPlaceholder: "ex : 'Je dois créer une présentation professionnelle avec des graphiques animés' ou 'Aidez-moi à écrire un article de blog sur le changement climatique'", // Vous fournirez ce texte
      button: "Obtenir une suggestion", // Vous fournirez ce texte
    },
    home: {
      discoverTitle: "Découvrez les meilleurs outils d'IA", // Vous fournirez ce texte
      discoverSubtitle: "Parcourez notre liste d'outils d'IA ou utilisez les filtres pour trouver exactement ce dont vous avez besoin.", // Vous fournirez ce texte
      searchPlaceholder: "Rechercher des outils par nom, description ou mot-clé...", // Vous fournirez ce texte
      noToolsFound: "Aucun outil ne correspond à vos critères.", // Vous fournirez ce texte
      tryAdjustingFilters: "Essayez de modifier vos filtres ou votre terme de recherche.", // Vous fournirez ce texte
    },
    filters: {
      title: "Filtrer par catégorie", // Vous fournirez ce texte
      allToolsButton: "Tous les outils", // Vous fournirez ce texte
    }
  },
  es: {
    searchForm: {
      title: "Buscador de Herramientas con IA", // Vous fournirez ce texte
      description: "¡Describe lo que quieres lograr y nuestra IA te sugerirá la mejor herramienta para el trabajo!", // Vous fournirez ce texte
      promptPlaceholder: "ej: 'Necesito crear una presentación profesional con gráficos animados' o 'Ayúdame a escribir una entrada de blog sobre el cambio climático'", // Vous fournirez ce texte
      button: "Obtener Sugerencia", // Vous fournirez ce texte
    },
    home: {
      discoverTitle: "Descubre las Mejores Herramientas de IA", // Vous fournirez ce texte
      discoverSubtitle: "Navega por nuestra lista de herramientas de IA o usa filtros para encontrar exactamente lo que necesitas.", // Vous fournirez ce texte
      searchPlaceholder: "Buscar herramientas por nombre, descripción o etiqueta...", // Vous fournirez ce texte
      noToolsFound: "No se encontraron herramientas que coincidan con sus criterios.", // Vous fournirez ce texte
      tryAdjustingFilters: "Intenta ajustar tus filtros o término de búsqueda.", // Vous fournirez ce texte
    },
    filters: {
      title: "Filtrar por Categoría", // Vous fournirez ce texte
      allToolsButton: "Todas las Herramientas", // Vous fournirez ce texte
    }
  },
};
