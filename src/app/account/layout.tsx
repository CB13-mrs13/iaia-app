
// This file can be used to create a specific layout for the /account/* routes.
// For now, it will just render children.
// Route protection is handled by middleware or page-level checks.

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
