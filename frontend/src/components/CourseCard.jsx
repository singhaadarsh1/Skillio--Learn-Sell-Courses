import { Link } from "react-router-dom";

function CourseCard({ course }) {
  const getIcon = () => {
    switch (course.category) {
      case "JavaScript":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F7DF1E] text-xl font-extrabold text-black shadow-lg">
            JS
          </div>
        );

      case "Web Development":
        return (
          <div className="flex rounded-lg bg-black/60 px-3 py-2 text-lg font-extrabold tracking-tight backdrop-blur-sm">
            <span className="text-[#47A248]">M</span>
            <span className="text-white">E</span>
            <span className="text-[#61DAFB]">R</span>
            <span className="text-[#68A063]">N</span>
          </div>
        );

      case "Artificial Intelligence":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-700/70 text-3xl font-semibold text-cyan-300 shadow-lg backdrop-blur-sm">
            ∇
          </div>
        );

      case "DevOps":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2496ED]/80 text-2xl font-bold text-white shadow-lg">
            ◫
          </div>
        );

      case "Cloud":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF9900]/90 text-2xl text-white shadow-lg">
            ☁
          </div>
        );

      case "Data Science":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#3776AB]/90 text-xl font-extrabold text-white shadow-lg">
            Py
          </div>
        );

      case "Computer Science":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600/90 text-sm font-bold text-white shadow-lg">
            O(n)
          </div>
        );

      default:
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black/60 text-xl font-bold text-white shadow-lg">
            SK
          </div>
        );
    }
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-skillio-border bg-skillio-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Course visual */}
      <div className="relative h-44 overflow-hidden bg-skillio-text">

        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-white/60">
            Skillio course
          </div>
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Category */}
        <div className="absolute bottom-5 left-5">
          <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {course.category}
          </span>
        </div>

        {/* Course icon */}
        <div className="absolute bottom-4 right-5">
          {getIcon()}
        </div>
      </div>

      {/* Course information */}
      <div className="p-5">

        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-skillio-text">
          {course.title}
        </h3>

        <p className="mt-2 text-sm text-skillio-muted">
          Skillio
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-extrabold text-skillio-text">
            ₹{course.price}
          </span>

          <Link
            to={`/course/${encodeURIComponent(course.title)}`}
            className="text-sm font-semibold text-skillio-accent transition-colors hover:text-skillio-text"
          >
            View course →
          </Link>
        </div>

      </div>
    </article>
  );
}

export default CourseCard;