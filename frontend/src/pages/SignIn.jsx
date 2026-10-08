import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

function SignIn() {
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
        "http://localhost:3000/api/v1/user/signin",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem(
          "skillio-user-token",
          response.data.token
        );

        navigate("/");
      } else {
        setError(
          response.data.message || "Incorrect credentials."
        );
      }
    } catch (error) {
      console.error("Sign in failed:", error);

      setError(
        error.response?.data?.message ||
          "Incorrect credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-skillio-bg px-6 py-16">

      <div className="mx-auto max-w-md">

        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
            Welcome back
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-skillio-text">
            Get back to learning.
          </h1>

          <p className="mt-3 text-sm leading-6 text-skillio-muted">
            Sign in and get back to building something useful.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-skillio-border bg-skillio-card p-7 shadow-sm"
        >

          <div>
            <label className="text-sm font-semibold text-skillio-text">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3 text-sm outline-none focus:border-skillio-accent"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-skillio-text">
              Password
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3 pr-12 text-sm outline-none focus:border-skillio-accent"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-skillio-muted hover:text-skillio-text"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>
          </div>

          {error && (
            <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-skillio-accent px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing you in..." : "Sign in"}
          </button>

          <p className="mt-5 text-center text-sm text-skillio-muted">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-skillio-text hover:text-skillio-accent"
            >
              Create one
            </Link>
          </p>

        </form>

      </div>
    </main>
  );
}

export default SignIn;