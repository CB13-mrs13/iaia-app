
export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by Your Name/Company. &copy; {new Date().getFullYear()} IAIA. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {/* Add social links or other footer links here if needed */}
        </div>
      </div>
    </footer>
  );
}
