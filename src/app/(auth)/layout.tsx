
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.32))] items-center justify-center py-12 animate-fadeIn">
      {children}
    </div>
  );
}
