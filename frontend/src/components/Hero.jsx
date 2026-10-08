import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-20">
      <div className="max-w-4xl">

        <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
          Learn. Build. Grow.
        </p>

        <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-skillio-text md:text-7xl">
          Learn skills.
          <br />
          Build something
          <span className="text-skillio-accent"> real.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-skillio-muted">
          Practical courses for curious people who would rather
          build things than just collect certificates.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">

          <Link
            to="/courses"
            className="rounded-xl bg-skillio-accent px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore Courses
          </Link>

          <Link
            to="/my-learning"
            className="rounded-xl border border-skillio-border bg-skillio-card px-6 py-3.5 text-sm font-bold text-skillio-text transition-all hover:border-skillio-accent hover:text-skillio-accent"
          >
            Start Learning
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Hero;