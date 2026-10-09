import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CourseCard from "./CourseCard";

function CourseSection({ selectedCategory }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/course/preview?limit=20"
        );

        // Ensure that courses is always an array
        const fetchedCourses = response.data?.courses;

        setCourses(
          Array.isArray(fetchedCourses)
            ? fetchedCourses
            : []
        );
      } catch (error) {
        console.error(
          "Failed to fetch homepage courses:",
          error
        );

        setError("Could not load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Show all courses and filter by category when selected
  const filteredCourses = useMemo(() => {
    const availableCourses = Array.isArray(courses)
      ? courses
      : [];

    if (selectedCategory === "All Courses") {
      return availableCourses;
    }

    return availableCourses.filter(
      (course) => course.category === selectedCategory
    );
  }, [courses, selectedCategory]);

  // Loading state
  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] bg-[#ECE8E0] px-6 py-10 md:px-10 md:py-12">
          <p className="text-sm font-semibold text-skillio-muted">
            Loading the good stuff...
          </p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] bg-[#ECE8E0] px-6 py-10 md:px-10 md:py-12">
          <p className="text-sm font-semibold text-red-500">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="rounded-[2rem] bg-[#ECE8E0] px-6 py-10 md:px-10 md:py-12">

        {/* Section heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
              Browse the good stuff
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-skillio-text md:text-4xl">
              Courses worth your time.
            </h2>

            <p className="mt-3 text-base leading-7 text-skillio-muted">
              Pick a skill, get your hands dirty, and build something
              you can actually show people.
            </p>
          </div>

          <Link
            to="/courses"
            className="w-fit text-sm font-bold text-skillio-text transition-colors hover:text-skillio-accent"
          >
            View all courses →
          </Link>
        </div>

        {/* Course grid */}
        {filteredCourses.length > 0 ? (
          <>
            <p className="mt-8 text-sm text-skillio-muted">
              Showing {filteredCourses.length}{" "}
              {filteredCourses.length === 1
                ? "course"
                : "courses"}
            </p>

            <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10 rounded-2xl border border-skillio-border bg-skillio-card p-10 text-center">
            <h3 className="text-xl font-bold text-skillio-text">
              No courses in this category yet.
            </h3>

            <p className="mt-2 text-sm text-skillio-muted">
              Try another topic or browse the full catalogue.
            </p>

            <Link
              to="/courses"
              className="mt-5 inline-block text-sm font-bold text-skillio-accent hover:text-skillio-text"
            >
              Browse all courses →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseSection;