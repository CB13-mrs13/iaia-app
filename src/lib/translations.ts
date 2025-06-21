
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
    backToTop: string;
  };
  filters: {
    title: string;
    allToolsButton: string;
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
    avatar: string;
    changeAvatar: string;
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
    storageUnauthorizedToastDesc: string;
    passwordUpdatedToastTitle: string;
    passwordUpdatedToastDesc: string;
    accountDeletedToastTitle: string;
    accountDeletedToastDesc: string;
    deleteFailedToastTitle: string;
    deleteFailedToastDesc: string;
  };
  userNav: {
    home: string;
    accountSettings: string;
    signOut: string;
    user: string;
    // Toasts
    signOutSuccessToastTitle: string;
    signOutSuccessToastDesc: string;
    signOutErrorToastTitle: string;
    signOutErrorToastDesc: string;
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
      backToTop: "Back to Top",
    },
    filters: {
      title: "Filter by Category",
      allToolsButton: "All Tools",
    },
    account: {
      title: "Account Settings",
      subtitle: "Manage your account details and preferences.",
      profileTitle: "Profile Information",
      profileSubtitle: "Update your personal information and avatar.",
      passwordTitle: "Password Settings",
      passwordSubtitle: "Change your account password.",
      dangerZoneTitle: "Danger Zone",
      dangerZoneSubtitle: "Actions in this zone are irreversible.",
      avatar: "Avatar",
      changeAvatar: "Change Avatar",
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
      storageUnauthorizedToastDesc: "You are not authorized to upload this file. Check your Firebase Storage security rules.",
      passwordUpdatedToastTitle: "Password Updated",
      passwordUpdatedToastDesc: "Your password has been successfully changed.",
      accountDeletedToastTitle: "Account Deleted",
      accountDeletedToastDesc: "Your account has been permanently deleted.",
      deleteFailedToastTitle: "Deletion Failed",
      deleteFailedToastDesc: "Could not delete your account. Please try again.",
    },
    userNav: {
      home: "Home",
      accountSettings: "Account Settings",
      signOut: "Sign Out",
      user: "User",
      signOutSuccessToastTitle: "Signed Out",
      signOutSuccessToastDesc: "You have been successfully signed out.",
      signOutErrorToastTitle: "Sign Out Error",
      signOutErrorToastDesc: "Failed to sign out. Please try again.",
    },
  },
  fr: {
    searchForm: {
      title: "Découverte d'outils par IA",
      description: "Décrivez ce que vous voulez accomplir, et notre IA vous suggérera le meilleur outil !",
      promptPlaceholder: "ex : 'Je dois créer une présentation professionnelle avec des graphiques animés' ou 'Aidez-moi à écrire un article de blog sur le changement climatique'",
      button: "Obtenir une suggestion",
    },
    home: {
      discoverTitle: "Découvrez les meilleurs outils d'IA",
      discoverSubtitle: "Parcourez notre liste d'outils d'IA ou utilisez les filtres pour trouver exactement ce dont vous avez besoin.",
      searchPlaceholder: "Rechercher des outils par nom, description ou mot-clé...",
      noToolsFound: "Aucun outil ne correspond à vos critères.",
      tryAdjustingFilters: "Essayez de modifier vos filtres ou votre terme de recherche.",
      backToTop: "Retour en haut",
    },
    filters: {
      title: "Filtrer par catégorie",
      allToolsButton: "Tous les outils",
    },
    account: {
      title: "Paramètres du compte",
      subtitle: "Gérez les détails et préférences de votre compte.",
      profileTitle: "Informations de profil",
      profileSubtitle: "Mettez à jour vos informations personnelles et votre avatar.",
      passwordTitle: "Paramètres du mot de passe",
      passwordSubtitle: "Changez le mot de passe de votre compte.",
      dangerZoneTitle: "Zone de danger",
      dangerZoneSubtitle: "Les actions dans cette zone sont irréversibles.",
      avatar: "Avatar",
      changeAvatar: "Changer d'Avatar",
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
      storageUnauthorizedToastDesc: "Vous n'êtes pas autorisé à téléverser ce fichier. Vérifiez les règles de sécurité de Firebase Storage.",
      passwordUpdatedToastTitle: "Mot de passe mis à jour",
      passwordUpdatedToastDesc: "Votre mot de passe a été changé avec succès.",
      accountDeletedToastTitle: "Compte supprimé",
      accountDeletedToastDesc: "Votre compte a été supprimé définitivement.",
      deleteFailedToastTitle: "Échec de la suppression",
      deleteFailedToastDesc: "Impossible de supprimer votre compte. Veuillez réessayer.",
    },
    userNav: {
      home: "Accueil",
      accountSettings: "Paramètres du compte",
      signOut: "Se déconnecter",
      user: "Utilisateur",
      signOutSuccessToastTitle: "Déconnecté",
      signOutSuccessToastDesc: "Vous avez été déconnecté avec succès.",
      signOutErrorToastTitle: "Erreur de déconnexion",
      signOutErrorToastDesc: "Échec de la déconnexion. Veuillez réessayer.",
    },
  },
  es: {
    searchForm: {
      title: "Buscador de Herramientas con IA",
      description: "¡Describe lo que quieres lograr y nuestra IA te sugerirá la mejor herramienta para el trabajo!",
      promptPlaceholder: "ej: 'Necesito crear una presentación profesional con gráficos animados' o 'Ayúdame a escribir una entrada de blog sobre el cambio climático'",
      button: "Obtener Sugerencia",
    },
    home: {
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
    account: {
      title: "Configuración de la cuenta",
      subtitle: "Gestiona los detalles y preferencias de tu cuenta.",
      profileTitle: "Información del perfil",
      profileSubtitle: "Actualiza tu información personal y tu avatar.",
      passwordTitle: "Configuración de la contraseña",
      passwordSubtitle: "Cambia la contraseña de tu cuenta.",
      dangerZoneTitle: "Zona de peligro",
      dangerZoneSubtitle: "Las acciones en esta zona son irreversibles.",
      avatar: "Avatar",
      changeAvatar: "Cambiar avatar",
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
      storageUnauthorizedToastDesc: "No tienes autorización para subir este archivo. Revisa tus reglas de seguridad de Firebase Storage.",
      passwordUpdatedToastTitle: "Contraseña actualizada",
      passwordUpdatedToastDesc: "Tu contraseña ha sido cambiada exitosamente.",
      accountDeletedToastTitle: "Cuenta eliminada",
      accountDeletedToastDesc: "Tu cuenta ha sido eliminada permanentemente.",
      deleteFailedToastTitle: "Error al eliminar",
      deleteFailedToastDesc: "No se pudo eliminar tu cuenta. Por favor, inténtalo de nuevo.",
    },
    userNav: {
      home: "Inicio",
      accountSettings: "Configuración de la cuenta",
      signOut: "Cerrar sesión",
      user: "Usuario",
      signOutSuccessToastTitle: "Sesión cerrada",
      signOutSuccessToastDesc: "Has cerrado sesión correctamente.",
      signOutErrorToastTitle: "Error al cerrar sesión",
      signOutErrorToastDesc: "No se pudo cerrar la sesión. Por favor, inténtalo de nuevo.",
    },
  },
};
