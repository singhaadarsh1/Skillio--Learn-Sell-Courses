import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-skillio-bg px-6">
      <div className="text-center">

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
          404
        </p>

        <h1 className="mt-4 text-4xl font-extrabold text-skillio-text">
          This page wandered off.
        </h1>

        <p className="mt-3 text-sm text-skillio-muted">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-7 inline-block rounded-xl bg-skillio-accent px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Back to Skillio
        </Link>

      </div>
    </main>
  );
}

export default NotFound;