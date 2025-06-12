export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} Sampro Media. All rights reserved.</p>
        <p className="mt-1">Professional Media and Software Solutions</p>
      </div>
    </footer>
  );
}
