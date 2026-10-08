import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-skillio-border bg-skillio-card">
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Main footer */}
        <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">

          {/* Brand + quote */}
          <div className="max-w-lg">
            <Link
              to="/"
              className="text-xl font-bold tracking-tight text-skillio-text"
            >
              Skillio
            </Link>

            <p className="mt-2 text-sm leading-6 text-skillio-muted">
              Learn practical skills, build things, and figure out
              the parts you don't know yet.
            </p>

            <p className="mt-4 text-sm italic leading-6 text-skillio-text">
              “You don't need to know everything. You just need to
              figure out the next thing.”
            </p>
          </div>

          {/* Connect */}
          <div>
            <p className="mb-3 text-sm font-semibold text-skillio-text">
              Connect
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">

              <a
                href="mailto:admin@skillio.com"
                className="text-skillio-muted transition-colors hover:text-skillio-accent"
              >
                Email
              </a>

              <a
                href="https://github.com/singhaadarsh1"
                target="_blank"
                rel="noreferrer"
                className="text-skillio-muted transition-colors hover:text-skillio-accent"
              >
                GitHub ↗
              </a>

              <a
                href="https://www.linkedin.com/in/aadarsh-singh-ba061628a/?isSelfProfile=true"
                target="_blank"
                rel="noreferrer"
                className="text-skillio-muted transition-colors hover:text-skillio-accent"
              >
                LinkedIn ↗
              </a>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-7 border-t border-skillio-border pt-5">
          <p className="text-xs text-skillio-muted">
            © {new Date().getFullYear()} Skillio. Built to learn,
            built to ship.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;