import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { handleAuthError } from "../utils/auth";

function MyLearning() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [progressData, setProgressData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      const token = localStorage.getItem("skillio-user-token");

      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/purchases",
          {
            headers: {
              token,
            },
          }
        );

        setCourses(response.data.courseData || []);
        setProgressData(response.data.progressData || []);
      } catch (error) {
        if (
          handleAuthError(
            error,
            "skillio-user-token"
          )
        ) {
          navigate("/signin");
          return;
        }

        console.error(
          "Failed to fetch purchases:",
          error
        );

        // User has no purchased courses
        if (error.response?.status === 404) {
          setCourses([]);
          setProgressData([]);
        } else {
          setError(
            error.response?.data?.message ||
              "Could not load your learning."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [navigate]);

  // Loading
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-skillio-bg">
        <p className="text-sm font-semibold text-skillio-muted">
          Loading your learning...
        </p>
      </main>
    );
  }

  // User not signed in
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-skillio-bg px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
            My Learning
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-skillio-text">
            Your learning space is waiting.
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-skillio-muted">
            Sign in to see the courses you've purchased and
            pick up where you left off.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/signin"
              className="rounded-xl bg-skillio-accent px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Sign in
            </Link>

            <Link
              to="/courses"
              className="rounded-xl border border-skillio-border bg-skillio-card px-6 py-3.5 text-sm font-bold text-skillio-text transition-colors hover:border-skillio-accent hover:text-skillio-accent"
            >
              Browse courses
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // API error
  if (error) {
    return (
      <main className="min-h-screen bg-skillio-bg px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold text-skillio-text">
            Something went wrong.
          </h1>

          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>

          <Link
            to="/courses"
            className="mt-6 inline-block text-sm font-bold text-skillio-accent hover:underline"
          >
            Browse courses →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-skillio-bg px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
            My Learning
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-skillio-text md:text-5xl">
            Keep going.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-skillio-muted">
            Your purchased courses, all in one place. No
            certificate collecting required.
          </p>
        </div>

        {/* No purchases */}
        {courses.length === 0 ? (
          <div className="rounded-2xl border border-skillio-border bg-skillio-card p-10 text-center">
            <h2 className="text-2xl font-extrabold text-skillio-text">
              Nothing here yet.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-skillio-muted">
              You haven't purchased any courses yet. Find
              something interesting and get started.
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-block rounded-xl bg-skillio-accent px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explore courses
            </Link>
          </div>
        ) : (
          <>
            {/* Course count */}
            <div className="mb-6">
              <p className="text-sm text-skillio-muted">
                You own{" "}
                <span className="font-bold text-skillio-text">
                  {courses.length}
                </span>{" "}
                course
                {courses.length !== 1 ? "s" : ""}.
              </p>
            </div>

            {/* Purchased courses */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {courses.map((course) => {
                const progress = progressData.find(
                  (item) =>
                    String(item.courseId) ===
                    String(course._id)
                );

                const completedCount =
                  progress?.completedLessons?.length || 0;

                const totalLessons = 4;

                const progressPercentage =
                  Math.round(
                    (completedCount / totalLessons) * 100
                  );

                return (
                  <article
                    key={course._id}
                    className="overflow-hidden rounded-2xl border border-skillio-border bg-skillio-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image */}
                    {course.imageUrl ? (
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="h-44 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-44 items-center justify-center bg-skillio-text text-sm font-semibold text-white/60">
                        Skillio course
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5">

                      <span className="rounded-full bg-skillio-bg px-3 py-1 text-xs font-semibold text-skillio-accent">
                        {course.category}
                      </span>

                      <h2 className="mt-4 text-lg font-bold leading-snug text-skillio-text">
                        {course.title}
                      </h2>

                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-skillio-muted">
                        {course.description}
                      </p>

                      {/* Progress */}
                      <div className="mt-5">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-skillio-muted">
                            Progress
                          </span>

                          <span className="text-skillio-accent">
                            {progressPercentage}%
                          </span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-skillio-bg">
                          <div
                            className="h-full rounded-full bg-skillio-accent transition-all duration-500"
                            style={{
                              width: `${progressPercentage}%`,
                            }}
                          />
                        </div>

                        <p className="mt-2 text-xs text-skillio-muted">
                          {completedCount} of{" "}
                          {totalLessons} lessons completed
                        </p>
                      </div>

                      {/* Learning page */}
                      <Link
                        to={`/learn/${course._id}`}
                        className="mt-5 inline-block text-sm font-bold text-skillio-accent hover:text-skillio-text"
                      >
                        Continue learning →
                      </Link>

                    </div>
                  </article>
                );
              })}

            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default MyLearning;