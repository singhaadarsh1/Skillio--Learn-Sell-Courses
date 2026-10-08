import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  BookOpen,
  Settings,
  LogOut,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { handleAuthError } from "../utils/auth";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem(
        "skillio-user-token"
      );

      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/me",
          {
            headers: {
              token,
            },
          }
        );

        setUser(response.data.user);
      } catch (error) {
        console.error(
          "Failed to fetch profile:",
          error
        );

        if (error.response?.status === 403) {
          localStorage.removeItem("skillio-user-token");
          navigate("/signin");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Could not load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("skillio-user-token");
    navigate("/");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-skillio-bg">
        <p className="text-sm font-semibold text-skillio-muted">
          Loading your profile...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-skillio-bg px-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-skillio-text">
            Something went wrong.
          </h1>

          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>

          <Link
            to="/"
            className="mt-6 inline-block text-sm font-bold text-skillio-accent hover:underline"
          >
            ← Back to Skillio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-skillio-bg px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
            Your account
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-skillio-text md:text-5xl">
            Good to have you here.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-skillio-muted">
            Manage your profile, keep track of your learning,
            and handle your account from one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">

          {/* Profile information */}
          <section className="rounded-2xl border border-skillio-border bg-skillio-card p-7 shadow-sm">

            <div className="flex items-center gap-4 border-b border-skillio-border pb-6">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-skillio-text text-white">
                <User size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-skillio-text">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="mt-1 text-sm text-skillio-muted">
                  Skillio learner
                </p>
              </div>

            </div>

            <div className="mt-7 space-y-5">

              {/* Name */}
              <div className="flex items-start gap-4">

                <div className="mt-0.5 text-skillio-muted">
                  <User size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-skillio-muted">
                    Full name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-skillio-text">
                    {user.firstName} {user.lastName}
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex items-start gap-4">

                <div className="mt-0.5 text-skillio-muted">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-skillio-muted">
                    Email
                  </p>

                  <p className="mt-1 text-sm font-semibold text-skillio-text">
                    {user.email}
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* Account actions */}
          <section className="rounded-2xl border border-skillio-border bg-skillio-card p-5 shadow-sm">

            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-skillio-muted">
              Account
            </p>

            <div className="space-y-1">

              <Link
                to="/my-learning"
                className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-semibold text-skillio-text transition-colors hover:bg-skillio-bg hover:text-skillio-accent"
              >
                <BookOpen size={18} />
                <span className="flex-1">
                  My Learning
                </span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-semibold text-skillio-text transition-colors hover:bg-skillio-bg hover:text-skillio-accent"
              >
                <Settings size={18} />
                <span className="flex-1">
                  Account Settings
                </span>
                <ArrowRight size={16} />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
              >
                <LogOut size={18} />
                <span className="flex-1">
                  Log out
                </span>
              </button>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

export default Profile;