import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { handleAuthError } from "../utils/auth";

function Settings() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] =
    useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);
  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    const token = localStorage.getItem(
      "skillio-user-token"
    );

    if (!token) {
      navigate("/signin");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/user/password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            token,
          },
        }
      );

      setSuccess(
        response.data.message ||
          "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(
        "Failed to change password:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Could not change your password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("skillio-user-token");
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-skillio-bg px-6 py-12">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-skillio-muted transition-colors hover:text-skillio-accent"
          >
            <ArrowLeft size={16} />
            Back to profile
          </Link>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-skillio-accent">
            Account Settings
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-skillio-text">
            Keep your account in check.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-skillio-muted">
            Manage your password and account access from one
            place.
          </p>
        </div>

        <div className="grid gap-6">

          {/* Password section */}
          <section className="rounded-2xl border border-skillio-border bg-skillio-card p-7 shadow-sm">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-skillio-bg text-skillio-accent">
                <LockKeyhole size={20} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-skillio-text">
                  Password & Security
                </h2>

                <p className="mt-1 text-sm leading-6 text-skillio-muted">
                  Change your password whenever you need to.
                </p>
              </div>

            </div>

            <form
              onSubmit={handlePasswordChange}
              className="mt-7"
            >

              {/* Current password */}
              <div>
                <label className="text-sm font-semibold text-skillio-text">
                  Current password
                </label>

                <div className="relative mt-2">

                  <input
                    type={
                      showCurrentPassword
                        ? "text"
                        : "password"
                    }
                    value={currentPassword}
                    onChange={(event) =>
                      setCurrentPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter your current password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3.5 pr-12 text-sm text-skillio-text outline-none transition-colors focus:border-skillio-accent"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-skillio-muted hover:text-skillio-text"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* New password */}
              <div className="mt-5">
                <label className="text-sm font-semibold text-skillio-text">
                  New password
                </label>

                <div className="relative mt-2">

                  <input
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(event) =>
                      setNewPassword(
                        event.target.value
                      )
                    }
                    placeholder="Create a new password"
                    autoComplete="new-password"
                    minLength={3}
                    maxLength={12}
                    required
                    className="w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3.5 pr-12 text-sm text-skillio-text outline-none transition-colors focus:border-skillio-accent"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-skillio-muted hover:text-skillio-text"
                  >
                    {showNewPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                <p className="mt-2 text-xs text-skillio-muted">
                  Use 3–12 characters.
                </p>
              </div>

              {/* Confirm password */}
              <div className="mt-5">
                <label className="text-sm font-semibold text-skillio-text">
                  Confirm new password
                </label>

                <div className="relative mt-2">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter the new password again"
                    autoComplete="new-password"
                    minLength={3}
                    maxLength={12}
                    required
                    className="w-full rounded-xl border border-skillio-border bg-skillio-bg px-4 py-3.5 pr-12 text-sm text-skillio-text outline-none transition-colors focus:border-skillio-accent"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-skillio-muted hover:text-skillio-text"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* Messages */}
              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-semibold text-red-600">
                    {error}
                  </p>
                </div>
              )}

              {success && (
                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                  <p className="text-sm font-semibold text-green-600">
                    {success}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 rounded-xl bg-skillio-accent px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Changing password..."
                  : "Change password"}
              </button>

            </form>
          </section>

          {/* Account actions */}
          <section className="rounded-2xl border border-skillio-border bg-skillio-card p-7 shadow-sm">

            <h2 className="text-xl font-extrabold text-skillio-text">
              Account access
            </h2>

            <p className="mt-1 text-sm leading-6 text-skillio-muted">
              Finished learning for now? You can sign out here.
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
            >
              <LogOut size={17} />
              Log out
            </button>

          </section>

        </div>

      </div>
    </main>
  );
}

export default Settings;