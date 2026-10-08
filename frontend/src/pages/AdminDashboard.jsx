import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { handleAuthError } from "../utils/auth";

const categories = [
  "Web Development",
  "JavaScript",
  "Artificial Intelligence",
  "DevOps",
  "Cloud",
  "Data Science",
  "Computer Science",
];

function AdminDashboard() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Editing state
  const [editingCourseId, setEditingCourseId] = useState(null);

  const isEditing = Boolean(editingCourseId);

  // --------------------------------------------------
  // Fetch courses created by this admin
  // --------------------------------------------------

  const fetchAdminCourses = async () => {
    try {
      const token = localStorage.getItem(
        "skillio-admin-token"
      );

      if (!token) {
        setError("Admin login required.");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/v1/admin/course/bulk",
        {
          headers: {
            token,
          },
        }
      );

      setCourses(response.data.courses);
    } catch (error) {
      console.error(
        "Failed to fetch admin courses:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Could not load your courses."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminCourses();
  }, []);

  // --------------------------------------------------
  // Reset form
  // --------------------------------------------------

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Web Development");
    setPrice("");
    setImageUrl("");
    setEditingCourseId(null);
  };

  // --------------------------------------------------
  // Create / Update course
  // --------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setActionLoading(true);

    try {
      const token = localStorage.getItem(
        "skillio-admin-token"
      );

      if (!token) {
        setError("Admin login required.");
        return;
      }

      const courseData = {
        title,
        description,
        category,
        imageUrl,
        price: Number(price),
      };

      // UPDATE
      if (isEditing) {
        await axios.put(
          "http://localhost:3000/api/v1/admin/course",
          {
            courseId: editingCourseId,
            ...courseData,
          },
          {
            headers: {
              token,
            },
          }
        );

        setSuccess("Course updated successfully.");
      }

      // CREATE
      else {
        await axios.post(
          "http://localhost:3000/api/v1/admin/course",
          courseData,
          {
            headers: {
              token,
            },
          }
        );

        setSuccess("Course created successfully.");
      }

      resetForm();

      await fetchAdminCourses();
    } catch (error) {
      console.error(
        "Course action failed:",
        error
      );

      setError(
        error.response?.data?.message ||
          (isEditing
            ? "Could not update course."
            : "Could not create course.")
      );
    } finally {
      setActionLoading(false);
    }
  };

  // --------------------------------------------------
  // Start editing
  // --------------------------------------------------

  const handleEdit = (course) => {
    setTitle(course.title || "");
    setDescription(course.description || "");
    setCategory(
      course.category || "Web Development"
    );
    setPrice(course.price || "");
    setImageUrl(course.imageUrl || "");

    setEditingCourseId(course._id);

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --------------------------------------------------
  // Delete course
  // --------------------------------------------------

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");
    setActionLoading(true);

    try {
      const token = localStorage.getItem(
        "skillio-admin-token"
      );

      if (!token) {
        setError("Admin login required.");
        return;
      }

      await axios.delete(
        "http://localhost:3000/api/v1/admin/course",
        {
          data: {
            courseId,
          },
          headers: {
            token,
          },
        }
      );

      setSuccess("Course deleted successfully.");

      // If deleted course was being edited
      if (editingCourseId === courseId) {
        resetForm();
      }

      await fetchAdminCourses();
    } catch (error) {
      console.error(
        "Failed to delete course:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Could not delete course."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // --------------------------------------------------
  // Sign out
  // --------------------------------------------------

  const handleSignOut = () => {
    localStorage.removeItem(
      "skillio-admin-token"
    );

    window.location.href = "/admin/signin";
  };

  // --------------------------------------------------
  // Loading screen
  // --------------------------------------------------

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-skillio-bg">
        <p className="text-sm font-semibold text-skillio-muted">
          Loading your courses...
        </p>
      </main>
    );
  }

  // --------------------------------------------------
  // Authentication error
  // --------------------------------------------------

  if (
    error &&
    !courses.length &&
    !localStorage.getItem("skillio-admin-token")
  ) {
    return (
      <main className="min-h-screen bg-skillio-bg px-6 py-16">
        <div className="mx-auto max-w-4xl">

          <h1 className="text-2xl font-extrabold text-skillio-text">
            Admin Dashboard
          </h1>

          <p className="mt-4 text-sm text-red-500">
            {error}
          </p>

          <Link
            to="/admin/signin"
            className="mt-5 inline-block text-sm font-bold text-skillio-accent hover:underline"
          >
            Go to admin sign in →
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-skillio-bg px-6 py-12">

      <div className="mx-auto max-w-6xl">

        {/* -------------------------------------------------- */}
        {/* Header */}
        {/* -------------------------------------------------- */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
              Skillio Admin
            </p>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-skillio-text">
              Manage your courses.
            </h1>

            <p className="mt-3 text-sm leading-6 text-skillio-muted">
              Create, edit, and remove courses from one place.
            </p>

          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-fit rounded-xl border border-skillio-border bg-skillio-card px-4 py-2.5 text-sm font-semibold text-skillio-text transition-colors hover:border-skillio-accent hover:text-skillio-accent"
          >
            Sign out
          </button>

        </div>

        {/* -------------------------------------------------- */}
        {/* Messages */}
        {/* -------------------------------------------------- */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* Create / Edit Form */}
        {/* -------------------------------------------------- */}

        <section className="mb-12">

          <div className="mb-6">

            <h2 className="text-2xl font-extrabold text-skillio-text">
              {isEditing
                ? "Edit course"
                : "Create a course"}
            </h2>

            <p className="mt-1 text-sm text-skillio-muted">
              {isEditing
                ? "Make the changes and save them."
                : "Add something worth learning."}
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-skillio-border bg-skillio-card p-6 shadow-sm"
          >

            <div className="grid gap-5 md:grid-cols-2">

              {/* Title */}
              <div className="md:col-span-2">

                <label className="text-sm font-semibold text-skillio-text">
                  Course title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="e.g. React & Modern Frontend Development"
                  minLength={3}
                  required
                  className="mt-2 w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3 text-sm text-skillio-text outline-none focus:border-skillio-accent"
                />

              </div>

              {/* Description */}
              <div className="md:col-span-2">

                <label className="text-sm font-semibold text-skillio-text">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Tell learners what they will actually learn."
                  minLength={10}
                  rows={5}
                  required
                  className="mt-2 w-full resize-none rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3 text-sm leading-6 text-skillio-text outline-none focus:border-skillio-accent"
                />

              </div>

              {/* Category */}
              <div>

                <label className="text-sm font-semibold text-skillio-text">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3 text-sm font-medium text-skillio-text outline-none focus:border-skillio-accent"
                >
                  {categories.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* Price */}
              <div>

                <label className="text-sm font-semibold text-skillio-text">
                  Price
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  placeholder="699"
                  min="1"
                  required
                  className="mt-2 w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3 text-sm text-skillio-text outline-none focus:border-skillio-accent"
                />

              </div>

              {/* Image */}
              <div className="md:col-span-2">

                <label className="text-sm font-semibold text-skillio-text">
                  Image path
                </label>

                <input
                  type="text"
                  value={imageUrl}
                  onChange={(event) =>
                    setImageUrl(event.target.value)
                  }
                  placeholder="/courses/react.jpg"
                  minLength={1}
                  required
                  className="mt-2 w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3 text-sm text-skillio-text outline-none focus:border-skillio-accent"
                />

                <p className="mt-2 text-xs text-skillio-muted">
                  Example: /courses/react.jpg
                </p>

              </div>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">

              <button
                type="submit"
                disabled={actionLoading}
                className="rounded-xl bg-skillio-accent px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {actionLoading
                  ? isEditing
                    ? "Saving changes..."
                    : "Creating course..."
                  : isEditing
                  ? "Save changes"
                  : "Create course"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={actionLoading}
                  className="rounded-xl border border-skillio-border bg-skillio-bg px-6 py-3.5 text-sm font-semibold text-skillio-text transition-colors hover:border-skillio-accent hover:text-skillio-accent"
                >
                  Cancel edit
                </button>
              )}

            </div>

          </form>
        </section>

        {/* -------------------------------------------------- */}
        {/* Existing Courses */}
        {/* -------------------------------------------------- */}

        <section>

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-extrabold text-skillio-text">
                Your courses
              </h2>

              <p className="mt-1 text-sm text-skillio-muted">
                Courses created by this admin account.
              </p>

            </div>

            <span className="text-sm font-semibold text-skillio-muted">
              {courses.length} course
              {courses.length !== 1 ? "s" : ""}
            </span>

          </div>

          {courses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {courses.map((course) => (
                <article
                  key={course._id}
                  className="overflow-hidden rounded-2xl border border-skillio-border bg-skillio-card"
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
                      No image
                    </div>
                  )}

                  {/* Course details */}
                  <div className="p-5">

                    <span className="rounded-full bg-skillio-bg px-3 py-1 text-xs font-semibold text-skillio-accent">
                      {course.category}
                    </span>

                    <h3 className="mt-4 text-lg font-bold leading-snug text-skillio-text">
                      {course.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-skillio-muted">
                      {course.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-lg font-extrabold text-skillio-text">
                        ₹{course.price}
                      </span>

                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(course)
                        }
                        disabled={actionLoading}
                        className="flex-1 rounded-lg border border-skillio-border px-4 py-2.5 text-sm font-semibold text-skillio-text transition-colors hover:border-skillio-accent hover:text-skillio-accent disabled:opacity-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(course._id)
                        }
                        disabled={actionLoading}
                        className="flex-1 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>
          ) : (
            <div className="rounded-2xl border border-skillio-border bg-skillio-card p-10 text-center">

              <h3 className="text-xl font-bold text-skillio-text">
                No courses yet.
              </h3>

              <p className="mt-2 text-sm text-skillio-muted">
                Your course shelf is looking a little empty.
              </p>

            </div>
          )}

        </section>

      </div>
    </main>
  );
}

export default AdminDashboard;