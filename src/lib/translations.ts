
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
  aiSearchResults: {
      title: string;
      suggestedToolLabel: string;
      reasoningLabel: string;
      learnMoreButton: string;
  };
  home: {
    featuredTitle: string;
    featuredSubtitle: string;
    discoverTitle: string;
    discoverSubtitle: string;
    searchPlaceholder: string;
    noToolsFound: string;
    tryAdjustingFilters: string;
    backToTop: string;
  };
  filters: {
    title: string;
    allToolsButton: string;
  };
  toolPage: {
    backToAllTools: string;
    sponsored: string;
    ratingLabel: string;
    pricingLabel: string;
    tagsLabel: string;
    visitWebsite: string;
    aboutTitle: string;
    featuresTitle: string;
  };
  account: {
    title: string;
    subtitle: string;
    profileTitle: string;
    profileSubtitle: string;
    passwordTitle: string;
    passwordSubtitle: string;
    dangerZoneTitle: string;
    dangerZoneSubtitle: string;
    displayName: string;
    displayNamePlaceholder: string;
    email: string;
    emailCannotBeChanged: string;
    saveChanges: string;
    newPassword: string;
    newPasswordPlaceholder: string;
    confirmNewPassword: string;
    confirmNewPasswordPlaceholder: string;
    changePassword: string;
    deleteAccount: string;
    deleteAccountConfirmTitle: string;
    deleteAccountConfirmDesc: string;
    cancel: string;
    confirmDelete: string;
    // Toasts
    noChangesToastTitle: string;
    noChangesToastDesc: string;
    errorToastTitle: string;
    unauthenticatedToastDesc: string;
    profileUpdatedToastTitle: string;
    profileUpdatedToastDesc: string;
    updateFailedToastTitle: string;
    updateFailedToastDesc: string;
    reauthToastDesc: string;
    passwordUpdatedToastTitle: string;
    passwordUpdatedToastDesc: string;
    accountDeletedToastTitle: string;
    accountDeletedToastDesc: string;
    deleteFailedToastTitle: string;
    deleteFailedToastDesc: string;
    favoriteAddedToastTitle: string;
    favoriteRemovedToastTitle: string;
    favoriteErrorToastDesc: string;
  };
  userNav: {
    home: string;
    accountSettings: string;
    signOut: string;
    user: string;
    myFavorites: string;
    // Toasts
    signOutSuccessToastTitle: string;
    signOutSuccessToastDesc: string;
    signOutErrorToastTitle: string;
    signOutErrorToastDesc: string;
  };
  favoritesPage: {
    title: string;
    subtitle: string;
    noFavoritesTitle: string;
    noFavoritesSubtitle: string;
    discoverTools: string;
  };
  studio: {
    title: string;
    subtitle: string;
    cardTitle: string;
    cardDescription: string;
    promptPlaceholder: string;
    button: string;
    loadingText: string;
    errorTitle: string;
    errorDescription: string;
    resultTitle: string;
    waitingTitle: string;
    waitingDescription: string;
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
    aiSearchResults: {
        title: "AI Suggestion",
        suggestedToolLabel: "Suggested Tool",
        reasoningLabel: "Reasoning",
        learnMoreButton: "Learn more about {toolName}"
    },
    home: {
      featuredTitle: "Featured AIs",
      featuredSubtitle: "The hottest AI tools of the moment, selected for you.",
      discoverTitle: "Discover Top AI Tools",
      discoverSubtitle: "Browse our curated list of AI tools or use filters to find exactly what you need.",
      searchPlaceholder: "Search tools by name, description, or tag...",
      noToolsFound: "No tools found matching your criteria.",
      tryAdjustingFilters: "Try adjusting your filters or search term.",
      backToTop: "Back to Top",
    },
    filters: {
      title: "Filter by Category",
      allToolsButton: "All Tools",
    },
    toolPage: {
      backToAllTools: "Back to All Tools",
      sponsored: "Sponsored",
      ratingLabel: "Rating",
      pricingLabel: "Pricing",
      tagsLabel: "Tags",
      visitWebsite: "Visit Website",
      aboutTitle: "About {toolName}",
      featuresTitle: "Key Features",
    },
    account: {
      title: "Account Settings",
      subtitle: "Manage your account details and preferences.",
      profileTitle: "Profile Information",
      profileSubtitle: "Update your personal information.",
      passwordTitle: "Password Settings",
      passwordSubtitle: "Change your account password.",
      dangerZoneTitle: "Danger Zone",
      dangerZoneSubtitle: "Actions in this zone are irreversible.",
      displayName: "Display Name",
      displayNamePlaceholder: "Your display name",
      email: "Email",
      emailCannotBeChanged: "Email cannot be changed.",
      saveChanges: "Save Changes",
      newPassword: "New Password",
      newPasswordPlaceholder: "Enter new password",
      confirmNewPassword: "Confirm New Password",
      confirmNewPasswordPlaceholder: "Confirm new password",
      changePassword: "Change Password",
      deleteAccount: "Delete My Account",
      deleteAccountConfirmTitle: "Are you absolutely sure?",
      deleteAccountConfirmDesc: "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      cancel: "Cancel",
      confirmDelete: "Yes, delete account",
      noChangesToastTitle: "No Changes",
      noChangesToastDesc: "No changes were made to your profile.",
      errorToastTitle: "Error",
      unauthenticatedToastDesc: "User not authenticated.",
      profileUpdatedToastTitle: "Profile Updated",
      profileUpdatedToastDesc: "Your profile has been successfully updated.",
      updateFailedToastTitle: "Update Failed",
      updateFailedToastDesc: "Could not update your profile. Please try again.",
      reauthToastDesc: "This operation is sensitive and requires recent authentication. Please log out and log back in.",
      passwordUpdatedToastTitle: "Password Updated",
      passwordUpdatedToastDesc: "Your password has been successfully changed.",
      accountDeletedToastTitle: "Account Deleted",
      accountDeletedToastDesc: "Your account has been permanently deleted.",
      deleteFailedToastTitle: "Deletion Failed",
      deleteFailedToastDesc: "Could not delete your account. Please try again.",
      favoriteAddedToastTitle: "Added to Favorites",
      favoriteRemovedToastTitle: "Removed from Favorites",
      favoriteErrorToastDesc: "Could not update favorites. Check your Firestore rules to ensure you have write permissions.",
    },
    userNav: {
      home: "Home",
      accountSettings: "Account Settings",
      signOut: "Sign Out",
      user: "User",
      myFavorites: "My Favorites",
      // Toasts
      signOutSuccessToastTitle: "Signed Out",
      signOutSuccessToastDesc: "You have been successfully signed out.",
      signOutErrorToastTitle: "Sign Out Error",
      signOutErrorToastDesc: "Failed to sign out. Please try again.",
    },
    favoritesPage: {
      title: "My Favorites",
      subtitle: "Your handpicked collection of top AI tools.",
      noFavoritesTitle: "No favorites yet",
      noFavoritesSubtitle: "Click the star icon on any tool to add it to your favorites.",
      discoverTools: "Discover Tools",
    },
    studio: {
      title: "AI Image Studio",
      subtitle: "Bring your ideas to life. Describe an image and let AI create it for you.",
      cardTitle: "Image Prompt",
      cardDescription: "Be as descriptive as possible for the best results.",
      promptPlaceholder: "e.g., 'A photorealistic image of a cat wearing a tiny wizard hat, sitting in a library'",
      button: "Generate Image",
      loadingText: "Your masterpiece is being generated...",
      errorTitle: "Generation Error",
      errorDescription: "The AI was unable to generate an image. This could be due to a safety filter or a temporary issue. Please try a different prompt.",
      resultTitle: "Your Generated Image",
      waitingTitle: "Your canvas is ready.",
      waitingDescription: "What will you create today?",
    },
  },
  fr: {
    searchForm: {
      title: "Découverte d'outils par IA",
      description: "Décrivez ce que vous voulez accomplir, et notre IA vous suggérera le meilleur outil !",
      promptPlaceholder: "ex : 'Je dois créer une présentation professionnelle avec des graphiques animés' ou 'Aidez-moi à écrire un article de blog sur le changement climatique'",
      button: "Obtenir une suggestion",
    },
     aiSearchResults: {
        title: "Suggestion de l'IA",
        suggestedToolLabel: "Outil suggéré",
        reasoningLabel: "Raisonnement",
        learnMoreButton: "En savoir plus sur {toolName}"
    },
    home: {
      featuredTitle: "Les IA à la Une",
      featuredSubtitle: "Les outils IA les plus en vogue du moment, sélectionnés pour vous.",
      discoverTitle: "Découvrez les meilleurs outils d'IA",
      discoverSubtitle: "Parcourez notre liste d'outils d'IA ou utilisez les filtres pour trouver exactly ce dont vous avez besoin.",
      searchPlaceholder: "Rechercher des outils par nom, description ou mot-clé...",
      noToolsFound: "Aucun outil ne correspond à vos critères.",
      tryAdjustingFilters: "Essayez de modifier vos filtres ou votre terme de recherche.",
      backToTop: "Retour en haut",
    },
    filters: {
      title: "Filtrer par catégorie",
      allToolsButton: "Tous les outils",
    },
    toolPage: {
      backToAllTools: "Retour à tous les outils",
      sponsored: "Sponsorisé",
      ratingLabel: "Évaluation",
      pricingLabel: "Tarifs",
      tagsLabel: "Mots-clés",
      visitWebsite: "Visiter le site web",
      aboutTitle: "À propos de {toolName}",
      featuresTitle: "Fonctionnalités clés",
    },
    account: {
      title: "Paramètres du compte",
      subtitle: "Gérez les détails et préférences de votre compte.",
      profileTitle: "Informations de profil",
      profileSubtitle: "Mettez à jour vos informations personnelles.",
      passwordTitle: "Paramètres du mot de passe",
      passwordSubtitle: "Changez le mot de passe de votre compte.",
      dangerZoneTitle: "Zone de danger",
      dangerZoneSubtitle: "Les actions dans cette zone sont irréversibles.",
      displayName: "Nom d'affichage",
      displayNamePlaceholder: "Votre nom d'affichage",
      email: "Email",
      emailCannotBeChanged: "L'email ne peut pas être modifié.",
      saveChanges: "Enregistrer les modifications",
      newPassword: "Nouveau mot de passe",
      newPasswordPlaceholder: "Saisir le nouveau mot de passe",
      confirmNewPassword: "Confirmer le nouveau mot de passe",
      confirmNewPasswordPlaceholder: "Confirmer le nouveau mot de passe",
      changePassword: "Changer le mot de passe",
      deleteAccount: "Supprimer mon compte",
      deleteAccountConfirmTitle: "Êtes-vous absolument sûr(e) ?",
      deleteAccountConfirmDesc: "Cette action est irréversible. Elle supprimera définitivement votre compte et vos données de nos serveurs.",
      cancel: "Annuler",
      confirmDelete: "Oui, supprimer le compte",
      noChangesToastTitle: "Aucun changement",
      noChangesToastDesc: "Aucune modification n'a été apportée à votre profil.",
      errorToastTitle: "Erreur",
      unauthenticatedToastDesc: "Utilisateur non authentifié.",
      profileUpdatedToastTitle: "Profil mis à jour",
      profileUpdatedToastDesc: "Votre profil a été mis à jour avec succès.",
      updateFailedToastTitle: "Échec de la mise à jour",
      updateFailedToastDesc: "Impossible de mettre à jour votre profil. Veuillez réessayer.",
      reauthToastDesc: "Cette opération nécessite une authentification récente. Veuillez vous déconnecter et vous reconnecter.",
      passwordUpdatedToastTitle: "Mot de passe mis à jour",
      passwordUpdatedToastDesc: "Votre mot de passe a été changé avec succès.",
      accountDeletedToastTitle: "Compte supprimé",
      accountDeletedToastDesc: "Votre compte a été supprimé définitivement.",
      deleteFailedToastTitle: "Échec de la suppression",
      deleteFailedToastDesc: "Impossible de supprimer votre compte. Veuillez réessayer.",
      favoriteAddedToastTitle: "Ajouté aux favoris",
      favoriteRemovedToastTitle: "Retiré des favoris",
      favoriteErrorToastDesc: "Impossible de mettre à jour les favoris. Vérifiez vos règles Firestore pour vous assurer que vous avez les droits d'écriture.",
    },
    userNav: {
      home: "Accueil",
      accountSettings: "Paramètres du compte",
      signOut: "Se déconnecter",
      user: "Utilisateur",
      myFavorites: "Mes Favoris",
      // Toasts
      signOutSuccessToastTitle: "Déconnecté",
      signOutSuccessToastDesc: "Vous avez été déconnecté avec succès.",
      signOutErrorToastTitle: "Erreur de déconnexion",
      signOutErrorToastDesc: "Échec de la déconnexion. Veuillez réessayer.",
    },
    favoritesPage: {
      title: "Mes Favoris",
      subtitle: "Votre collection personnelle des meilleurs outils IA.",
      noFavoritesTitle: "Aucun favori pour le moment",
      noFavoritesSubtitle: "Cliquez sur l'icône étoile sur n'importe quel outil pour l'ajouter à vos favoris.",
      discoverTools: "Découvrir des outils",
    },
    studio: {
      title: "Atelier d'Images par IA",
      subtitle: "Donnez vie à vos idées. Décrivez une image et laissez l'IA la créer pour vous.",
      cardTitle: "Prompt pour l'image",
      cardDescription: "Soyez aussi descriptif que possible pour obtenir les meilleurs résultats.",
      promptPlaceholder: "ex: 'Une image photoréaliste d'un chat portant un petit chapeau de sorcier, assis dans une bibliothèque'",
      button: "Générer l'image",
      loadingText: "Votre chef-d'œuvre est en cours de création...",
      errorTitle: "Erreur de génération",
      errorDescription: "L'IA n'a pas pu générer d'image. Cela peut être dû à un filtre de sécurité ou à un problème temporaire. Veuillez essayer un autre prompt.",
      resultTitle: "Votre Image Générée",
      waitingTitle: "Votre toile est prête.",
      waitingDescription: "Qu'allez-vous créer aujourd'hui ?",
    },
  },
  es: {
    searchForm: {
      title: "Buscador de Herramientas con IA",
      description: "¡Describe lo que quieres lograr y nuestra IA te sugerirá la mejor herramienta para el trabajo!",
      promptPlaceholder: "ej: 'Necesito crear una presentación profesional con gráficos animados' o 'Ayúdame a escribir una entrada de blog sobre el cambio climático'",
      button: "Obtener Sugerencia",
    },
    aiSearchResults: {
        title: "Sugerencia de IA",
        suggestedToolLabel: "Herramienta sugerida",
        reasoningLabel: "Razonamiento",
        learnMoreButton: "Aprender más sobre {toolName}"
    },
    home: {
      featuredTitle: "IA Destacadas",
      featuredSubtitle: "Las herramientas de IA más populares del momento, seleccionadas para ti.",
      discoverTitle: "Descubre las Mejores Herramientas de IA",
      discoverSubtitle: "Navega por nuestra lista de herramientas de IA o usa filtros para encontrar exactamente lo que necesitas.",
      searchPlaceholder: "Buscar herramientas por nombre, descripción o etiqueta...",
      noToolsFound: "No se encontraron herramientas que coincidan con sus criterios.",
      tryAdjustingFilters: "Intenta ajustar tus filtros o término de búsqueda.",
      backToTop: "Volver Arriba",
    },
    filters: {
      title: "Filtrar por Categoría",
      allToolsButton: "Todas las Herramientas",
    },
    toolPage: {
      backToAllTools: "Volver a todas las herramientas",
      sponsored: "Patrocinado",
      ratingLabel: "Valoración",
      pricingLabel: "Precios",
      tagsLabel: "Etiquetas",
      visitWebsite: "Visitar el sitio web",
      aboutTitle: "Acerca de {toolName}",
      featuresTitle: "Características principales",
    },
    account: {
      title: "Configuración de la cuenta",
      subtitle: "Gestiona los detalles y preferencias de tu cuenta.",
      profileTitle: "Información del perfil",
      profileSubtitle: "Actualiza tu información personal.",
      passwordTitle: "Configuración de la contraseña",
      passwordSubtitle: "Cambia la contraseña de tu cuenta.",
      dangerZoneTitle: "Zona de peligro",
      dangerZoneSubtitle: "Las acciones en esta zona son irreversibles.",
      displayName: "Nombre de usuario",
      displayNamePlaceholder: "Tu nombre de usuario",
      email: "Correo electrónico",
      emailCannotBeChanged: "El correo electrónico no se puede cambiar.",
      saveChanges: "Guardar cambios",
      newPassword: "Nueva contraseña",
      newPasswordPlaceholder: "Introduce la nueva contraseña",
      confirmNewPassword: "Confirmar nueva contraseña",
      confirmNewPasswordPlaceholder: "Confirmar nueva contraseña",
      changePassword: "Cambiar contraseña",
      deleteAccount: "Eliminar mi cuenta",
      deleteAccountConfirmTitle: "¿Estás absolutamente seguro?",
      deleteAccountConfirmDesc: "Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y tus datos de nuestros servidores.",
      cancel: "Cancelar",
      confirmDelete: "Sí, eliminar cuenta",
      noChangesToastTitle: "Sin cambios",
      noChangesToastDesc: "No se realizaron cambios en tu perfil.",
      errorToastTitle: "Error",
      unauthenticatedToastDesc: "Usuario no autenticado.",
      profileUpdatedToastTitle: "Perfil actualizado",
      profileUpdatedToastDesc: "Tu perfil se ha actualizado correctamente.",
      updateFailedToastTitle: "Error al actualizar",
      updateFailedToastDesc: "No se pudo actualizar tu perfil. Por favor, inténtalo de nuevo.",
      reauthToastDesc: "Esta operación es sensible y requiere autenticación reciente. Cierra sesión y vuelve a iniciar sesión.",
      passwordUpdatedToastTitle: "Contraseña actualizada",
      passwordUpdatedToastDesc: "Tu contraseña ha sido cambiada exitosamente.",
      accountDeletedToastTitle: "Cuenta eliminada",
      accountDeletedToastDesc: "Tu cuenta ha sido eliminada permanentemente.",
      deleteFailedToastTitle: "Error al eliminar",
      deleteFailedToastDesc: "No se pudo eliminar tu cuenta. Por favor, inténtalo de nuevo.",
      favoriteAddedToastTitle: "Añadido a favoritos",
      favoriteRemovedToastTitle: "Eliminado de favoritos",
      favoriteErrorToastDesc: "No se pudieron actualizar los favoritos. Revisa tus reglas de Firestore para asegurarte de que tienes permisos de escritura.",
    },
    userNav: {
      home: "Inicio",
      accountSettings: "Configuración de la cuenta",
      signOut: "Cerrar sesión",
      user: "Usuario",
      myFavorites: "Mis Favoritos",
      // Toasts
      signOutSuccessToastTitle: "Sesión cerrada",
      signOutSuccessToastDesc: "Has cerrado sesión correctamente.",
      signOutErrorToastTitle: "Error al cerrar sesión",
      signOutErrorToastDesc: "No se pudo cerrar la sesión. Por favor, inténtalo de nuevo.",
    },
    favoritesPage: {
      title: "Mis Favoritos",
      subtitle: "Tu colección personal de las mejores herramientas de IA.",
      noFavoritesTitle: "Aún no hay favoritos",
      noFavoritesSubtitle: "Haz clic en el icono de estrella en cualquier herramienta para agregarla a tus favoritos.",
      discoverTools: "Descubrir herramientas",
    },
    studio: {
      title: "Estudio de Imágenes con IA",
      subtitle: "Da vida a tus ideas. Describe una imagen y deja que la IA la cree por ti.",
      cardTitle: "Prompt de imagen",
      cardDescription: "Sé lo más descriptivo posible para obtener los mejores resultados.",
      promptPlaceholder: "ej: 'Una imagen fotorrealista de un gato con un pequeño sombrero de mago, sentado en una biblioteca'",
      button: "Generar Imagen",
      loadingText: "Tu obra maestra se está generando...",
      errorTitle: "Error de Generación",
      errorDescription: "La IA no pudo generar una imagen. Esto podría deberse a un filtro de seguridad o a un problema temporal. Por favor, intenta con un prompt diferente.",
      resultTitle: "Tu Imagen Generada",
      waitingTitle: "Tu lienzo está listo.",
      waitingDescription: "¿Qué crearás hoy?",
    },
  },
};
