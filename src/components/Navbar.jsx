import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoLight from "../assets/images/favicon-light.png";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${isScrolled ? "nav-scroll" : ""}`}
    >
      <div className="container">
        <div className="logo-wrapper">
          <Link className="logo" to="/" onClick={closeMenu}>
            <img
              src={logoLight}
              className="logo-img"
              alt="Capture"
              loading="lazy"
            />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbar"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="ti-menu"></i>
          </span>
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbar"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>

            
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/about") ? "active" : ""}`}
                to="/about"
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/services") ? "active" : ""}`}
                to="/services"
                onClick={closeMenu}
              >
                Services
              </Link>
            </li>
            
           <li className="nav-item">
            <Link
              to="/portfolio"
              className={`nav-link ${location.pathname === "/portfolio" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Portfolio
            </Link>
          </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${isActive("/price") ||
                    isActive("/team") ||
                    isActive("/faq") ||
                    isActive("/testimonials")
                    ? "active"
                    : ""
                  }`}
                href="#"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  const dropdown = e.currentTarget.nextElementSibling;
                  dropdown?.classList.toggle("show");
                }}
              >
                Pages <i className="ti-angle-down"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/price"
                    className={`dropdown-item ${location.pathname === "/price" ? "active" : ""
                      }`}
                    onClick={closeMenu}
                  >
                    <span>Pricing</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className={`dropdown-item ${location.pathname === "/team" ? "active" : ""
                      }`}
                    onClick={closeMenu}
                  >
                    <span>Team</span>
                  </Link>
                </li>
                
                <li>
                  <Link
                    to="/testimonials"
                    className={`dropdown-item ${location.pathname === "/testimonials" ? "active" : ""
                      }`}
                    onClick={closeMenu}
                  >
                    <span>Testimonials</span>
                  </Link>
                </li>
                
             
              </ul>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/blog") ? "active" : ""}`}
                to="/blog"
                onClick={closeMenu}
              >
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                to="/contact"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
