import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CourseDetails() {
  const { title } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const [error, setError] = useState("");
  const [purchaseMessage, setPurchaseMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/course/preview?search=${encodeURIComponent(
            title,
          )}&limit=20`,
        );

        const foundCourse = response.data.courses.find(
          (item) => item.title === title,
        );

        if (!foundCourse) {
          setError("Course not found.");
          return;
        }

        setCourse(foundCourse);
      } catch (error) {
        console.error("Failed to fetch course:", error);
        setError("Could not load this course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [title]);
  useEffect(() => {
    if (!course) {
      return;
    }

    const token = localStorage.getItem("skillio-user-token");

    if (!token) {
      setIsPurchased(false);
      return;
    }

    const checkPurchase = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/purchases",
          {
            headers: {
              token,
            },
          },
        );

        const purchasedCourses = response.data.courseData || [];

        const alreadyPurchased = purchasedCourses.some(
          (item) => item._id === course._id,
        );

        setIsPurchased(alreadyPurchased);
      } catch (error) {
        // 404 means the user has no purchases yet.
        if (error.response?.status === 404) {
          setIsPurchased(false);
          return;
        }

        console.error("Failed to check course ownership:", error);
      }
    };

    checkPurchase();
  }, [course]);

  const handlePurchase = async () => {
    if (isPurchased) {
      return;
    }
    const token = localStorage.getItem("skillio-user-token");

    // User is not signed in
    if (!token) {
      navigate("/signin");
      return;
    }

    setError("");
    setPurchaseMessage("");
    setPurchasing(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/course/purchase",
        {
          courseId: course._id,
        },
        {
          headers: {
            token,
          },
        },
      );

      setPurchaseMessage(
        response.data.message || "You have successfully bought the course.",
      );
      setIsPurchased(true);
    } catch (error) {
      console.error("Purchase failed:", error);

      setError(
        error.response?.data?.message || "Could not purchase this course.",
      );
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-skillio-bg">
        <p className="text-sm font-semibold text-skillio-muted">
          Loading course...
        </p>
      </main>
    );
  }

  if (error && !course) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-20">
        <h1 className="text-3xl font-extrabold text-skillio-text">{error}</h1>

        <Link
          to="/courses"
          className="mt-6 inline-block text-sm font-bold text-skillio-accent"
        >
          ← Back to courses
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-skillio-bg">
      {/* Course hero */}
      <section className="bg-skillio-text text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
                {course.category}
              </p>

              <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight md:text-5xl">
                {course.title}
              </h1>

              <p className="mt-5 max-w-2xl leading-7 text-white/65">
                {course.description}
              </p>

              <p className="mt-5 text-sm text-white/55">By Skillio</p>
            </div>

            {course.imageUrl && (
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="h-64 w-full object-cover md:h-72"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Course details */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-extrabold text-skillio-text">
              What you'll learn
            </h2>

            <p className="mt-4 max-w-2xl leading-8 text-skillio-muted">
              {course.description}
            </p>

            <div className="mt-8 rounded-2xl border border-skillio-border bg-skillio-card p-6">
              <ul className="space-y-4 text-sm text-skillio-text">
                <li>✓ Practical concepts and examples</li>
                <li>✓ Hands-on learning</li>
                <li>✓ Project-focused approach</li>
                <li>✓ Beginner-friendly explanations</li>
              </ul>
            </div>
          </div>

          {/* Purchase card */}
          <div className="h-fit rounded-2xl border border-skillio-border bg-skillio-card p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-skillio-text">
              ₹{course.price}
            </div>

            <p className="mt-2 text-sm text-skillio-muted">One-time purchase</p>

            {purchaseMessage && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <p className="text-sm font-semibold text-green-600">
                  {purchaseMessage}
                </p>
              </div>
            )}

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-semibold text-red-600">{error}</p>
              </div>
            )}

            <button
              onClick={handlePurchase}
              disabled={purchasing || isPurchased}
            >
              {isPurchased
                ? "✓ Already Purchased"
                : purchasing
                  ? "Processing..."
                  : "Buy Course"}
            </button>

            <Link
              to="/my-learning"
              className="mt-4 block text-center text-sm font-semibold text-skillio-muted hover:text-skillio-accent"
            >
              Go to My Learning →
            </Link>

            <Link
              to="/courses"
              className="mt-4 block text-center text-sm font-semibold text-skillio-muted hover:text-skillio-accent"
            >
              ← Back to courses
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CourseDetails;
