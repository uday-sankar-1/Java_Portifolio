export function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-x flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {name}. Built with Next.js, Tailwind CSS and Motion.
        </p>
        <p className="font-mono">Bengaluru, India</p>
      </div>
    </footer>
  );
}
