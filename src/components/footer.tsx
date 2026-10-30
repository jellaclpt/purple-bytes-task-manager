export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 text-center text-sm text-muted-foreground">
      &copy; {currentYear} Purple Bytes. All rights reserved.
    </footer>
  );
}
