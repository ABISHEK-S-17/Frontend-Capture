import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found section-padding">
      <div className="container">

        {/* Title */}
        <div className="row mb-20">
          <div className="col-md-12 text-center">
            <h2>404</h2>
            <h1 className="wow" data-splitting>
              Page Not Found
            </h1>
            <p className="wow" data-splitting>
              The page you are looking for was moved, removed, renamed or never existed.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="row">
          <div className="col-md-12 justify-align-center">
            <div
              className="btn-wrap wow fadeInUp text-center"
              data-wow-delay=".3s"
            >
              <div className="btn-link">
                <Link to="/">Turn Homepage</Link>
                <span className="btn-block color1 animation-bounce"></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NotFound;
