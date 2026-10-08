import {
  Search,
  User,
  Clock3,
  X,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Settings,
  BookOpen,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import axios from "axios";

import courses from "../data/courses";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchBoxRef = useRef(null);
  const profileRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchPanel, setShowSearchPanel] =
    useState(false);

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const [user, setUser] = useState(null);

  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const storedHistory = localStorage.getItem(
        "skillio-search-history"
      );

      return storedHistory
        ? JSON.parse(storedHistory)
        : [];
    } catch {
      return [];
    }
  });

  /*
    Fetch the logged-in user's details.
    The JWT is stored in localStorage.
  */
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem(
        "skillio-user-token"
      );

      if (!token) {
        setUser(null);
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
          "Failed to fetch user:",
          error
        );

        setUser(null);
      }
    };

    fetchUser();
  }, [location.pathname]);

  /*
    Save search history whenever it changes.
  */
  useEffect(() => {
    localStorage.setItem(
      "skillio-search-history",
      JSON.stringify(searchHistory)
    );
  }, [searchHistory]);

  /*
    Close search and profile dropdowns
    when clicking outside.
  */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowSearchPanel(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /*
    Close profile menu when route changes.
  */
  useEffect(() => {
    setShowProfileMenu(false);
  }, [location.pathname]);

  /*
    Search suggestions.
    These are currently based on the local course data.
  */
  const suggestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return courses
      .filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchTerm]);

  /*
    Add a search term to history.
  */
  const addToHistory = (search) => {
    const cleanSearch = search.trim();

    if (!cleanSearch) {
      return;
    }

    setSearchHistory((previousHistory) => {
      const updatedHistory = [
        cleanSearch,
        ...previousHistory.filter(
          (item) =>
            item.toLowerCase() !==
            cleanSearch.toLowerCase()
        ),
      ];

      return updatedHistory.slice(0, 5);
    });
  };

  /*
    Perform search.
  */
  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) {
      navigate("/courses");
      setShowSearchPanel(false);
      return;
    }

    addToHistory(trimmedSearch);

    navigate(
      `/courses?search=${encodeURIComponent(
        trimmedSearch
      )}`
    );

    setShowSearchPanel(false);
  };

  /*
    Suggestion click.
  */
  const handleSuggestionClick = (course) => {
    addToHistory(course.title);

    navigate(
      `/courses?search=${encodeURIComponent(
        course.title
      )}`
    );

    setSearchTerm(course.title);
    setShowSearchPanel(false);
  };

  /*
    Previous search click.
  */
  const handleHistoryClick = (search) => {
    setSearchTerm(search);

    navigate(
      `/courses?search=${encodeURIComponent(search)}`
    );

    setShowSearchPanel(false);
  };

  /*
    Clear search history.
  */
  const clearHistory = () => {
    setSearchHistory([]);
  };

  /*
    Log out the current user.
  */
  const handleLogout = () => {
    localStorage.removeItem("skillio-user-token");

    setUser(null);
    setShowProfileMenu(false);

    navigate("/");
  };

  const isUserLoggedIn = Boolean(user);

  return (
    <nav className="border-b border-skillio-border bg-skillio-card">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-skillio-text"
        >
          Skillio
        </Link>

        {/* Search */}
        <div
          ref={searchBoxRef}
          className="relative hidden w-96 md:block"
        >
          <form onSubmit={handleSearch}>
            <div className="flex items-center gap-3 rounded-xl border border-skillio-border bg-skillio-bg px-4 py-2.5">

              <Search
                size={18}
                className="shrink-0 text-skillio-muted"
              />

              <input
                type="text"
                value={searchTerm}
                onFocus={() =>
                  setShowSearchPanel(true)
                }
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search courses..."
                className="w-full bg-transparent text-sm text-skillio-text outline-none placeholder:text-skillio-muted"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setShowSearchPanel(true);
                  }}
                  className="text-skillio-muted hover:text-skillio-text"
                >
                  <X size={16} />
                </button>
              )}

            </div>
          </form>

          {/* Search dropdown */}
          {showSearchPanel && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-skillio-border bg-white shadow-xl">

              {/* Suggestions */}
              {searchTerm.trim() &&
                suggestions.length > 0 && (
                  <div className="p-2">

                    <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-skillio-muted">
                      Courses
                    </p>

                    {suggestions.map((course) => (
                      <button
                        key={course.title}
                        onClick={() =>
                          handleSuggestionClick(course)
                        }
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition-colors hover:bg-skillio-bg"
                      >

                        <div>
                          <p className="text-sm font-semibold text-skillio-text">
                            {course.title}
                          </p>

                          <p className="mt-1 text-xs text-skillio-muted">
                            {course.category}
                          </p>
                        </div>

                        <span className="text-skillio-accent">
                          →
                        </span>

                      </button>
                    ))}

                  </div>
                )}

              {/* No results */}
              {searchTerm.trim() &&
                suggestions.length === 0 && (
                  <div className="p-5 text-center">

                    <p className="text-sm font-semibold text-skillio-text">
                      No courses found.
                    </p>

                    <p className="mt-1 text-xs text-skillio-muted">
                      Try another search.
                    </p>

                  </div>
                )}

              {/* Search history */}
              {!searchTerm.trim() &&
                searchHistory.length > 0 && (
                  <div className="p-2">

                    <div className="flex items-center justify-between px-3 py-2">

                      <p className="text-xs font-bold uppercase tracking-wider text-skillio-muted">
                        Recent searches
                      </p>

                      <button
                        onClick={clearHistory}
                        className="text-xs font-semibold text-skillio-accent hover:underline"
                      >
                        Clear
                      </button>

                    </div>

                    {searchHistory.map((search) => (
                      <button
                        key={search}
                        onClick={() =>
                          handleHistoryClick(search)
                        }
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-skillio-bg"
                      >

                        <Clock3
                          size={16}
                          className="text-skillio-muted"
                        />

                        <span className="text-sm text-skillio-text">
                          {search}
                        </span>

                      </button>
                    ))}

                  </div>
                )}

            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/courses"
            className="text-sm font-medium text-skillio-text transition-colors hover:text-skillio-accent"
          >
            Courses
          </Link>

          <Link
            to="/my-learning"
            className="text-sm font-medium text-skillio-text transition-colors hover:text-skillio-accent"
          >
            My Learning
          </Link>

          {/* User section */}
          {isUserLoggedIn ? (
            <div
              ref={profileRef}
              className="relative"
            >

              {/* Account button */}
              <button
                type="button"
                onClick={() =>
                  setShowProfileMenu(
                    (previous) => !previous
                  )
                }
                className="flex items-center gap-2 rounded-xl border border-skillio-border bg-skillio-card px-4 py-2 text-sm font-semibold text-skillio-text transition-all hover:border-skillio-accent hover:text-skillio-accent"
              >

                <User size={17} />

                <span>
                  {user?.firstName || "Account"}
                </span>

                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    showProfileMenu
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {/* Account dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-skillio-border bg-white shadow-xl">

                  {/* User info */}
                  <div className="border-b border-skillio-border px-4 py-4">

                    <p className="text-sm font-bold text-skillio-text">
                      {user.firstName} {user.lastName}
                    </p>

                    <p className="mt-1 truncate text-xs text-skillio-muted">
                      {user.email}
                    </p>

                  </div>

                  {/* Menu */}
                  <div className="p-2">

                    <Link
                      to="/profile"
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-skillio-text transition-colors hover:bg-skillio-bg hover:text-skillio-accent"
                    >
                      <User size={17} />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/my-learning"
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-skillio-text transition-colors hover:bg-skillio-bg hover:text-skillio-accent"
                    >
                      <BookOpen size={17} />
                      <span>My Learning</span>
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-skillio-text transition-colors hover:bg-skillio-bg hover:text-skillio-accent"
                    >
                      <Settings size={17} />
                      <span>Account Settings</span>
                    </Link>

                    <div className="my-2 border-t border-skillio-border" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      <span>Log out</span>
                    </button>

                  </div>

                </div>
              )}

            </div>
          ) : (
            /* Sign In */
            <Link
              to="/signin"
              className="flex items-center gap-2 rounded-xl border border-skillio-border bg-skillio-card px-4 py-2 text-sm font-semibold text-skillio-text transition-all hover:border-skillio-accent hover:text-skillio-accent"
            >
              <User size={17} />
              Sign In
            </Link>
          )}

          {/* Admin Portal */}
          <Link
            to="/admin/signin"
            className="flex items-center gap-2 rounded-xl bg-skillio-text px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-skillio-accent"
          >
            <ShieldCheck size={17} />
            Admin Portal
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;