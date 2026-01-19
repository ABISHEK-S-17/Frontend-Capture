import { Link } from "react-router-dom";
import logoLight from "../assets/images/favicon-light.png";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-12">
            <Link to="/" >
              <img src={logoLight} alt="Capture" className="footer-logo" />
            </Link>
          </div>
          <div className="col-lg-3 col-md-12">
            <h5>Get in touch</h5>
            <p>
              capture.in1@gmail.com
              <br />
              +91 86677 52450
            </p>
          </div>
          <div className="col-lg-3 col-md-12">
            <h5>Locations</h5>
            <p>
              Erode — TamilNadu <br />
              Coimbatore — TamilNadu <br />
              Chennai — TamilNadu <br />
              Bangalore — Karnataka <br />
              Malaysia
            </p>

          </div>
          <div className="col-lg-3 col-md-12">
            <ul className="footer-social-link">
              <li>
                <a
                  href="https://www.instagram.com/_capture__photography/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@_capturephotography"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/capturephotography.0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/90388679/admin/dashboard/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/CapturePhotoz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
              </li>
              <li><a
                href="https://wa.me/918667752450?text=Hello%2C%20I%E2%80%99m%20interested%20in%20your%20Capture%20Photography%20services.%20Please%20share%20details."
                target="_blank"
                rel="noopener noreferrer"

              >
                <i className="fa-brands fa-whatsapp"></i>

              </a></li>
            </ul>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10 text-center">
            <p className="mb-0 copyright">
              © 2026 Capture is designed by{" "}
              <a
                href="https://nutz.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abishek
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
