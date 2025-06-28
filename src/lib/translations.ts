
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
    toolboxTitle: string;
    toolboxText: string;
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
    modelAccessToastDesc: string;
  };
  legal: {
    privacyPolicy: string;
    termsOfService: string;
    userManual: string;
    privacyTitle: string;
    privacySubtitle: string;
    termsTitle: string;
    termsSubtitle: string;
    lastUpdated: string;
    disclaimer: string;
    disclaimerText: string;
    introductionTitle: string;
    privacyIntro: string;
    termsIntro: string;
    dataTitle: string;
    dataText: string;
    useOfServiceTitle: string;
    useOfServiceText: string;
  },
  cookieConsent: {
    message: string;
    accept: string;
  },
  userManualPage: {
    title: string;
    subtitle: string;
    introTitle: string;
    introText: string;
    discoverTitle: string;
    discoverText1: string;
    discoverText2: string;
    aiSearchTitle: string;
    aiSearchText1: string;
    aiSearchText2: string;
    favoritesTitle: string;
    favoritesText1: string;
    favoritesText2: string;
    accountTitle: string;
    accountText1: string;
    tipTitle: string;
    tipText: string;
  }
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
      toolboxTitle: "Toolbox... in preparation",
      toolboxText: "Tips and tricks to help you on your AI learning journey.",
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
      modelAccessToastDesc: "The required AI model is not accessible. Please see details below.",
    },
    legal: {
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      userManual: "User Manual",
      privacyTitle: "Privacy Policy",
      privacySubtitle: "How we handle your data.",
      termsTitle: "Terms of Service",
      termsSubtitle: "The rules for using our application.",
      lastUpdated: "Last updated: October 26, 2023",
      disclaimer: "Disclaimer",
      disclaimerText: "This is a template and not legal advice. Please consult with a legal professional to ensure compliance with all applicable laws and regulations.",
      introductionTitle: "Introduction",
      privacyIntro: "Welcome to IAIA. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our application.",
      termsIntro: "Welcome to IAIA. These Terms of Service govern your use of our application. By using IAIA, you agree to these terms.",
      dataTitle: "Information We Collect",
      dataText: "We collect information you provide directly to us, such as when you create an account (email, display name). We also use third-party services like Firebase Authentication and Google AI (Genkit), which may collect information as per their own privacy policies.",
      useOfServiceTitle: "Use of the Service",
      useOfServiceText: "You agree not to misuse the service or help anyone else to do so. You are responsible for your conduct and your content. The content generated by AI is for informational purposes and we are not responsible for its accuracy.",
    },
    cookieConsent: {
      message: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      accept: "Accept",
    },
    userManualPage: {
      title: "User Manual",
      subtitle: "How to get the most out of your IAIA experience.",
      introTitle: "Welcome to IAIA!",
      introText: "This guide will walk you through the main features of the application to help you discover and manage the best AI tools for your needs.",
      discoverTitle: "1. Discovering Tools",
      discoverText1: "The main 'Discover' page is your gateway to our entire catalog of AI tools. You can:",
      discoverText2: "<ul><li><b>Browse</b> the full list of curated tools.</li><li><b>Filter</b> by category (e.g., 'Photo', 'Coding') to narrow down your search.</li><li><b>Use the search bar</b> to find tools by name, keyword, or description.</li></ul>",
      aiSearchTitle: "2. AI-Powered Search",
      aiSearchText1: "Don't know which tool you need? Let our AI help! In the 'AI-Powered Tool Finder' section, simply describe your task or goal in plain language.",
      aiSearchText2: "For example, you could write: <i>'I need to make a video from a blog post'</i>. The AI will analyze your request and suggest the most suitable tool, along with its reasoning.",
      favoritesTitle: "3. Managing Your Favorites",
      favoritesText1: "To keep track of tools you find interesting, you can add them to your favorites. You must be logged in to use this feature.",
      favoritesText2: "Simply click the <b>star icon (☆)</b> on any tool card or tool page. To view all your saved tools, navigate to 'My Favorites' from the user menu in the top-right corner.",
      accountTitle: "4. Managing Your Account",
      accountText1: "In the 'Account Settings' page, you can easily update your display name and change your password to keep your account secure.",
      tipTitle: "Pro Tip",
      tipText: "This application supports multiple languages! You can switch between English, French, and Spanish at any time using the globe icon in the navigation bar."
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
      toolboxTitle: "Boîte à outils... en préparation",
      toolboxText: "trucs et astuces pour vous aider dans votre apprentissage sur les IA",
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
      modelAccessToastDesc: "Le modèle d'IA requis n'est pas accessible. Veuillez consulter les détails ci-dessous.",
    },
    legal: {
      privacyPolicy: "Politique de confidentialité",
      termsOfService: "Conditions d'utilisation",
      userManual: "Manuel d'utilisation",
      privacyTitle: "Politique de confidentialité",
      privacySubtitle: "Comment nous traitons vos données.",
      termsTitle: "Conditions d'utilisation",
      termsSubtitle: "Les règles d'utilisation de notre application.",
      lastUpdated: "Dernière mise à jour : 26 octobre 2023",
      disclaimer: "Avertissement",
      disclaimerText: "Ceci est un modèle et non un conseil juridique. Veuillez consulter un professionnel du droit pour garantir la conformité avec toutes les lois et réglementations applicables.",
      introductionTitle: "Introduction",
      privacyIntro: "Bienvenue sur IAIA. Nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et partageons les informations vous concernant lorsque vous utilisez notre application.",
      termsIntro: "Bienvenue sur IAIA. Ces conditions d'utilisation régissent votre utilisation de notre application. En utilisant IAIA, vous acceptez ces conditions.",
      dataTitle: "Informations que nous collectons",
      dataText: "Nous collectons les informations que vous nous fournissez directement, comme lorsque vous créez un compte (email, nom d'affichage). Nous utilisons également des services tiers comme Firebase Authentication et Google AI (Genkit), qui peuvent collecter des informations conformément à leurs propres politiques de confidentialité.",
      useOfServiceTitle: "Utilisation du Service",
      useOfServiceText: "Vous acceptez de ne pas abuser du service ni d'aider quiconque à le faire. Vous êtes responsable de votre conduite et de votre contenu. Le contenu généré par l'IA est à titre informatif et nous ne sommes pas responsables de son exactitude.",
    },
    cookieConsent: {
      message: "Nous utilisons des cookies pour améliorer votre expérience. En continuant à visiter ce site, vous acceptez notre utilisation des cookies.",
      accept: "Accepter",
    },
    userManualPage: {
      title: "Manuel d'utilisation",
      subtitle: "Comment tirer le meilleur parti de votre expérience IAIA.",
      introTitle: "Bienvenue sur IAIA !",
      introText: "Ce guide vous présentera les principales fonctionnalités de l'application pour vous aider à découvrir et à gérer les meilleurs outils d'IA pour vos besoins.",
      discoverTitle: "1. Découvrir les outils",
      discoverText1: "La page principale 'Découvrir' est votre porte d'entrée vers notre catalogue complet d'outils d'IA. Vous pouvez :",
      discoverText2: "<ul><li><b>Parcourir</b> la liste complète des outils sélectionnés.</li><li><b>Filtrer</b> par catégorie (par ex., 'Photo', 'Codage') pour affiner votre recherche.</li><li><b>Utiliser la barre de recherche</b> pour trouver des outils par nom, mot-clé ou description.</li></ul>",
      aiSearchTitle: "2. Recherche par IA",
      aiSearchText1: "Vous ne savez pas quel outil il vous faut ? Laissez notre IA vous aider ! Dans la section 'Découverte d'outils par IA', décrivez simplement votre tâche ou votre objectif en langage clair.",
      aiSearchText2: "Par exemple, vous pourriez écrire : <i>'Je dois faire une vidéo à partir d'un article de blog'</i>. L'IA analysera votre demande et vous suggérera l'outil le plus approprié, ainsi que son raisonnement.",
      favoritesTitle: "3. Gérer vos favoris",
      favoritesText1: "Pour garder une trace des outils que vous trouvez intéressants, vous pouvez les ajouter à vos favoris. Vous devez être connecté pour utiliser cette fonctionnalité.",
      favoritesText2: "Cliquez simplement sur l'icône <b>étoile (☆)</b> sur n'importe quelle carte d'outil ou page d'outil. Pour voir tous vos outils enregistrés, accédez à 'Mes Favoris' depuis le menu utilisateur en haut à droite.",
      accountTitle: "4. Gérer votre compte",
      accountText1: "Sur la page 'Paramètres du compte', vous pouvez facilement mettre à jour votre nom d'affichage et changer votre mot de passe pour sécuriser votre compte.",
      tipTitle: "Astuce de pro",
      tipText: "Cette application prend en charge plusieurs langues ! Vous pouvez basculer entre l'anglais, le français et l'espagnol à tout moment en utilisant l'icône du globe dans la barre de navigation."
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
      toolboxTitle: "Caja de Herramientas... en preparación",
      toolboxText: "Consejos y trucos para ayudarte en tu viaje de aprendizaje de IA.",
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
      modelAccessToastDesc: "El modelo de IA requerido no es accesible. Por favor, vea los detalles a continuación.",
    },
     legal: {
      privacyPolicy: "Política de privacidad",
      termsOfService: "Términos de servicio",
      userManual: "Manual de Usuario",
      privacyTitle: "Política de privacidad",
      privacySubtitle: "Cómo manejamos tus datos.",
      termsTitle: "Términos de servicio",
      termsSubtitle: "Las reglas para usar nuestra aplicación.",
      lastUpdated: "Última actualización: 26 de octubre de 2023",
      disclaimer: "Aviso legal",
      disclaimerText: "Esto es una plantilla y no un consejo legal. Por favor, consulte con un profesional legal para asegurar el cumplimiento con todas las leyes y regulaciones aplicables.",
      introductionTitle: "Introducción",
      privacyIntro: "Bienvenido a IAIA. Estamos comprometidos a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y compartimos información sobre ti cuando usas nuestra aplicación.",
      termsIntro: "Bienvenido a IAIA. Estos Términos de Servicio rigen tu uso de nuestra aplicación. Al usar IAIA, aceptas estos términos.",
      dataTitle: "Información que recopilamos",
      dataText: "Recopilamos la información que nos proporcionas directamente, como cuando creas una cuenta (correo electrónico, nombre de usuario). También usamos servicios de terceros como Firebase Authentication y Google AI (Genkit), que pueden recopilar información según sus propias políticas de privacidad.",
      useOfServiceTitle: "Uso del Servicio",
      useOfServiceText: "Aceptas no hacer un mal uso del servicio ni ayudar a nadie más a hacerlo. Eres responsable de tu conducta y tu contenido. El contenido generado por la IA es para fines informativos y no somos responsables de su exactitud.",
    },
    cookieConsent: {
      message: "Usamos cookies para mejorar tu experiencia. Al continuar visitando este sitio, aceptas nuestro uso de cookies.",
      accept: "Aceptar",
    },
    userManualPage: {
      title: "Manual de Usuario",
      subtitle: "Cómo aprovechar al máximo tu experiencia en IAIA.",
      introTitle: "¡Bienvenido a IAIA!",
      introText: "Esta guía te mostrará las características principales de la aplicación para ayudarte a descubrir y gestionar las mejores herramientas de IA para tus necesidades.",
      discoverTitle: "1. Descubrir Herramientas",
      discoverText1: "La página principal 'Descubrir' es tu puerta de entrada a nuestro catálogo completo de herramientas de IA. Puedes:",
      discoverText2: "<ul><li><b>Explorar</b> la lista completa de herramientas seleccionadas.</li><li><b>Filtrar</b> por categoría (p. ej., 'Foto', 'Codificación') para acotar tu búsqueda.</li><li><b>Usar la barra de búsqueda</b> para encontrar herramientas por nombre, palabra clave o descripción.</li></ul>",
      aiSearchTitle: "2. Búsqueda con IA",
      aiSearchText1: "¿No sabes qué herramienta necesitas? ¡Deja que nuestra IA te ayude! En la sección 'Buscador de Herramientas con IA', simplemente describe tu tarea u objetivo en lenguaje sencillo.",
      aiSearchText2: "Por ejemplo, podrías escribir: <i>'Necesito hacer un video a partir de una publicación de blog'</i>. La IA analizará tu solicitud y te sugerirá la herramienta más adecuada, junto con su razonamiento.",
      favoritesTitle: "3. Gestionar tus Favoritos",
      favoritesText1: "Para hacer un seguimiento de las herramientas que te parecen interesantes, puedes agregarlas a tus favoritos. Debes iniciar sesión para usar esta función.",
      favoritesText2: "Simplemente haz clic en el icono de la <b>estrella (☆)</b> en cualquier tarjeta de herramienta o página de herramienta. Para ver todas tus herramientas guardadas, ve a 'Mis Favoritos' desde el menú de usuario en la esquina superior derecha.",
      accountTitle: "4. Gestionar tu Cuenta",
      accountText1: "En la página 'Configuración de la cuenta', puedes actualizar fácilmente tu nombre de usuario y cambiar tu contraseña para mantener tu cuenta segura.",
      tipTitle: "Consejo profesional",
      tipText: "¡Esta aplicación es compatible con varios idiomas! Puedes cambiar entre inglés, francés y español en cualquier momento usando el icono del globo en la barra de navegación."
    },
  },
};

    
