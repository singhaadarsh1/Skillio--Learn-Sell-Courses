import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Learning() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [completedLessons, setCompletedLessons] = useState([]);

  const [selectedLesson, setSelectedLesson] = useState(0);

  const [loading, setLoading] = useState(true);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLearningData = async () => {
      const token = localStorage.getItem("skillio-user-token");

      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/course/${courseId}`,
          {
            headers: {
              token,
            },
          }
        );

        setCourse(response.data.course);
        setLessons(response.data.lessons || []);
        setVideoId(response.data.videoId || "");
        setCompletedLessons(response.data.progress || []);

        // Open the first incomplete lesson
        const firstIncompleteLesson = (
          response.data.lessons || []
        ).findIndex(
          (_, index) =>
            !(response.data.progress || []).includes(index)
        );

        if (firstIncompleteLesson !== -1) {
          setSelectedLesson(firstIncompleteLesson);
        }
      } catch (error) {
        console.error(
          "Failed to load learning course:",
          error
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("skillio-user-token");
          navigate("/signin");
          return;
        }

        if (error.response?.status === 403) {
          setError(
            "You need to purchase this course before learning it."
          );
          return;
        }

        if (error.response?.status === 404) {
          setError("Course not found.");
          return;
        }

        setError("Could not load this course.");
      } finally {
        setLoading(false);
      }
    };

    fetchLearningData();
  }, [courseId, navigate]);

  const markLessonComplete = async () => {
    const token = localStorage.getItem("skillio-user-token");

    if (!token) {
      navigate("/signin");
      return;
    }

    if (completedLessons.includes(selectedLesson)) {
      return;
    }

    setMarkingComplete(true);
    setError("");

    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/user/course/${courseId}/progress`,
        {
          lessonIndex: selectedLesson,
        },
        {
          headers: {
            token,
          },
        }
      );

      setCompletedLessons(
        response.data.completedLessons || []
      );
    } catch (error) {
      console.error(
        "Failed to update progress:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("skillio-user-token");
        navigate("/signin");
        return;
      }

      setError(
        error.response?.data?.message ||
          "Could not update progress."
      );
    } finally {
      setMarkingComplete(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-skillio-bg">
        <p className="text-sm font-semibold text-skillio-muted">
          Loading your course...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-skillio-bg px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
            Learning
          </p>

          <h1 className="mt-4 text-3xl font-extrabold text-skillio-text">
            Can't open this course.
          </h1>

          <p className="mt-3 text-sm text-skillio-muted">
            {error}
          </p>

          <Link
            to="/my-learning"
            className="mt-7 inline-block rounded-xl bg-skillio-accent px-6 py-3 text-sm font-bold text-white"
          >
            Back to My Learning
          </Link>
        </div>
      </main>
    );
  }

  if (!course || lessons.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-skillio-bg">
        <p className="text-sm font-semibold text-skillio-muted">
          No learning content available.
        </p>
      </main>
    );
  }

  const currentLesson = lessons[selectedLesson];

  const progressPercentage = Math.round(
    (completedLessons.length / lessons.length) * 100
  );

  const lessonCompleted =
    completedLessons.includes(selectedLesson);

  return (
    <main className="min-h-screen bg-skillio-bg px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/my-learning"
          className="text-sm font-bold text-skillio-accent hover:underline"
        >
          ← My Learning
        </Link>

        {/* Course header */}
        <div className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
            {course.category}
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-skillio-text md:text-5xl">
            {course.title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-skillio-muted">
            {course.description}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-8 rounded-2xl border border-skillio-border bg-skillio-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-skillio-text">
              Course progress
            </p>

            <p className="text-sm font-extrabold text-skillio-accent">
              {progressPercentage}%
            </p>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-skillio-bg">
            <div
              className="h-full rounded-full bg-skillio-accent transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>

        {/* Learning area */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* Lessons */}
          <aside className="h-fit rounded-2xl border border-skillio-border bg-skillio-card p-4">
            <h2 className="px-2 pb-3 text-sm font-bold uppercase tracking-wider text-skillio-muted">
              Course content
            </h2>

            <div className="space-y-1">
              {lessons.map((lesson, index) => {
                const completed =
                  completedLessons.includes(index);

                return (
                  <button
                    key={lesson.title}
                    onClick={() =>
                      setSelectedLesson(index)
                    }
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                      selectedLesson === index
                        ? "bg-skillio-accent text-white"
                        : "text-skillio-text hover:bg-skillio-bg"
                    }`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs">
                      {completed ? "✓" : index + 1}
                    </span>

                    <span>{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Main lesson */}
          <section className="rounded-2xl border border-skillio-border bg-skillio-card p-5 md:p-8">

            {/* Video */}
            <div className="overflow-hidden rounded-2xl bg-black">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                  title={course.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Lesson information */}
            <div className="mt-8">
              <p className="text-sm font-bold text-skillio-accent">
                Lesson {selectedLesson + 1} of{" "}
                {lessons.length}
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-skillio-text">
                {currentLesson.title}
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-skillio-muted">
                {currentLesson.content}
              </p>
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-skillio-border pt-6">

              <button
                onClick={() =>
                  setSelectedLesson(
                    Math.max(selectedLesson - 1, 0)
                  )
                }
                disabled={selectedLesson === 0}
                className="rounded-xl border border-skillio-border px-5 py-3 text-sm font-bold text-skillio-text disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              <button
                onClick={markLessonComplete}
                disabled={
                  markingComplete || lessonCompleted
                }
                className="rounded-xl bg-skillio-accent px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {lessonCompleted
                  ? "✓ Completed"
                  : markingComplete
                    ? "Saving..."
                    : "Mark as completed"}
              </button>

              <button
                onClick={() =>
                  setSelectedLesson(
                    Math.min(
                      selectedLesson + 1,
                      lessons.length - 1
                    )
                  )
                }
                disabled={
                  selectedLesson === lessons.length - 1
                }
                className="rounded-xl border border-skillio-border px-5 py-3 text-sm font-bold text-skillio-text disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>

            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Learning;