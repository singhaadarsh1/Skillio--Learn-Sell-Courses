import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import CourseCard from "../components/CourseCard";

const categories = [
  "All Courses",
  "Web Development",
  "JavaScript",
  "Artificial Intelligence",
  "DevOps",
  "Cloud",
  "Data Science",
  "Computer Science",
];

function Courses() {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All Courses");

  const [sortOption, setSortOption] =
    useState("popular");

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/course/preview"
        );

        setCourses(response.data.courses);
        console.log("BACKEND COURSES:", response.data.courses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError("Could not load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Search filter
    if (searchQuery.trim()) {
      const search = searchQuery.toLowerCase();

      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(search) ||
          course.category?.toLowerCase().includes(search)
      );
    }

    // Category filter
    if (selectedCategory !== "All Courses") {
      result = result.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Sorting
    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    courses,
    searchQuery,
    selectedCategory,
    sortOption,
  ]);

  // Loading state
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-skillio-bg">
        <p className="text-sm font-semibold text-skillio-muted">
          Loading the good stuff...
        </p>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-skillio-bg">
        <p className="text-sm font-semibold text-red-500">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-skillio-bg">

      {/* Catalogue header */}
      <section className="bg-skillio-text text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            <div className="max-w-3xl">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
                The Skillio catalogue
              </p>

              <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
                Find something worth learning.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
                Development, AI, cloud, DevOps and everything in between.
                Pick a skill and get to work.
              </p>

            </div>

            <div className="hidden text-right md:block">

              <p className="text-3xl font-extrabold">
                {filteredCourses.length}
              </p>

              <p className="text-sm text-white/55">
                courses showing
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* Main catalogue */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="flex flex-col gap-10 lg:flex-row">

          {/* Category sidebar */}
          <aside className="w-full shrink-0 lg:w-60">

            <div className="sticky top-6">

              <p className="mb-4 text-sm font-bold uppercase tracking-wider text-skillio-muted">
                Browse by topic
              </p>

              <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                    className={`rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-all ${
                      selectedCategory === category
                        ? "bg-skillio-accent text-white"
                        : "text-skillio-text hover:bg-skillio-card hover:text-skillio-accent"
                    }`}
                  >
                    {category}
                  </button>
                ))}

              </div>
            </div>
          </aside>

          {/* Course content */}
          <div className="flex-1">

            {/* Toolbar */}
            <div className="mb-7 flex flex-col gap-4 border-b border-skillio-border pb-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                {searchQuery && (
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-skillio-accent">
                    Search results for "{searchQuery}"
                  </p>
                )}

                <p className="text-sm text-skillio-muted">
                  Showing
                  <span className="mx-1 font-bold text-skillio-text">
                    {filteredCourses.length}
                  </span>
                  courses
                </p>

              </div>

              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(event.target.value)
                }
                className="rounded-lg border border-skillio-border bg-skillio-card px-4 py-2.5 text-sm font-medium text-skillio-text outline-none"
              >
                <option value="popular">
                  Most popular
                </option>

                <option value="price-low">
                  Price: low to high
                </option>

                <option value="price-high">
                  Price: high to low
                </option>
              </select>

            </div>

            {/* Course grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course._id || course.title}
                    course={course}
                  />
                ))}

              </div>
            ) : (
              <div className="rounded-2xl border border-skillio-border bg-skillio-card p-10 text-center">

                <h2 className="text-xl font-bold text-skillio-text">
                  No courses found.
                </h2>

                <p className="mt-2 text-sm text-skillio-muted">
                  Try a different search or category.
                </p>

              </div>
            )}

          </div>
        </div>

      </section>
    </main>
  );
}

export default Courses;