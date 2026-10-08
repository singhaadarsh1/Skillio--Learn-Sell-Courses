import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";

function AdminSignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/signin",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem(
          "skillio-admin-token",
          response.data.token
        );

        navigate("/admin");
      } else {
        setError(
          response.data.message || "Incorrect credentials"
        );
      }
    } catch (error) {
      console.error("Admin sign in failed:", error);

      setError(
        error.response?.data?.message ||
          "Incorrect credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-skillio-bg px-6 py-12 md:px-10">

      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl overflow-hidden rounded-3xl border border-skillio-border bg-skillio-card shadow-sm lg:grid-cols-2">

        {/* Left side */}
        <section className="flex flex-col justify-between bg-skillio-text p-8 text-white md:p-12">

          <div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-skillio-accent text-white">
                <ShieldCheck size={21} />
              </div>

              <div>
                <p className="text-sm font-extrabold tracking-tight">
                  Skillio
                </p>

                <p className="text-xs text-white/50">
                  Admin
                </p>
              </div>
            </div>

            <div className="mt-20 max-w-md">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
                Course Studio
              </p>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                Build the catalogue.
                <br />
                Keep it useful.
              </h1>

              <p className="mt-6 max-w-sm text-base leading-7 text-white/60">
                Create courses, update your catalogue, and keep
                everything on Skillio in one place.
              </p>

            </div>

          </div>

          <div className="mt-12 border-t border-white/10 pt-5">
            <p className="text-xs text-white/40">
              Admin access · Course management · Skillio
            </p>
          </div>

        </section>

        {/* Right side */}
        <section className="flex items-center p-8 md:p-12">

          <div className="w-full max-w-md mx-auto">

            {/* Header */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-skillio-border bg-skillio-bg px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-skillio-muted">
                <ShieldCheck size={14} />
                Admin access
              </div>

              <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-skillio-text">
                Welcome back.
              </h2>

              <p className="mt-3 text-sm leading-6 text-skillio-muted">
                Sign in to manage courses, edit content, and
                keep the Skillio catalogue fresh.
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8"
            >

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-skillio-text">
                  Admin email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="admin@skillio.com"
                  autoComplete="username"
                  required
                  className="mt-2 w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3.5 text-sm text-skillio-text outline-none transition-colors focus:border-skillio-accent"
                />
              </div>

              {/* Password */}
              <div className="mt-5">

                <label className="text-sm font-semibold text-skillio-text">
                  Password
                </label>

                <div className="relative mt-2">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3.5 pr-12 text-sm text-skillio-text outline-none transition-colors focus:border-skillio-accent"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-skillio-muted transition-colors hover:bg-skillio-card hover:text-skillio-text"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-semibold text-red-600">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-skillio-accent px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing you in..."
                  : "Sign in to dashboard"}
              </button>

            </form>

            {/* Back */}
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-skillio-muted transition-colors hover:text-skillio-accent"
            >
              <ArrowLeft size={16} />
              Back to Skillio
            </Link>

            <div className="mt-6 border-t border-skillio-border pt-5">
              <p className="text-xs leading-5 text-skillio-muted">
                Learner? Use the regular{" "}
                <Link
                  to="/signin"
                  className="font-semibold text-skillio-text hover:text-skillio-accent"
                >
                  user sign in
                </Link>
                .
              </p>
            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

export default AdminSignIn;