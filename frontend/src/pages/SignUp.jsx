import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

function SignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      if (response.data.message === "signed up successfully") {
        setSuccess("Account created successfully.");

        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } else {
        setError(
          response.data.message || "Unable to create account."
        );
      }
    } catch (error) {
      console.error("Sign up failed:", error);

      setError(
        error.response?.data?.message ||
          "Unable to create account."
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
            Join Skillio
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-skillio-text">
            Start learning.
          </h1>

          <p className="mt-3 text-sm leading-6 text-skillio-muted">
            Create your account and start building skills that
            actually come in handy.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-skillio-border bg-skillio-card p-7 shadow-sm"
        >
          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="text-sm font-semibold text-skillio-text">
                First name
              </label>

              <input
                type="text"
                value={firstName}
                onChange={(event) =>
                  setFirstName(event.target.value)
                }
                placeholder="Aadarsh"
                minLength={3}
                maxLength={20}
                required
                className="mt-2 w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3 text-sm outline-none focus:border-skillio-accent"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-skillio-text">
                Last name
              </label>

              <input
                type="text"
                value={lastName}
                onChange={(event) =>
                  setLastName(event.target.value)
                }
                placeholder="Singh"
                minLength={3}
                maxLength={20}
                required
                className="mt-2 w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3 text-sm outline-none focus:border-skillio-accent"
              />
            </div>

          </div>

          <div className="mt-5">
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
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={3}
                maxLength={12}
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

          {success && (
            <p className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-skillio-accent px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="mt-5 text-center text-sm text-skillio-muted">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-skillio-text hover:text-skillio-accent"
            >
              Sign in
            </Link>
          </p>
        </form>

      </div>
    </main>
  );
}

export default SignUp;