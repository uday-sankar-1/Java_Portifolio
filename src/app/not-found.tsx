import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-accent">404</p>
        <h1 className="mt-2 text-h2 font-semibold">Page not found</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 font-medium text-accent-fg"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
