import { useDispatch, useSelector } from "react-redux";
import { getAbouts } from "../redux/slice/aboutSlice";
import { getTeams } from "../redux/slice/teamSlice";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function About() {
  const teamCarouselRef = useRef(null);
  const dispatch = useDispatch();

  const { about } = useSelector((state) => state.about);
  const { teams } = useSelector((state) => state.team);

  // ✅ Only ACTIVE about
  const activeAbout = about?.find(a => a.status === "active");

  // ✅ Only ACTIVE teams
  const activeTeams = teams?.filter(t => t.status === "active") || [];

  useEffect(() => {
    dispatch(getAbouts());
    dispatch(getTeams());
  }, [dispatch]);

  // ✅ Init carousel only when active teams exist
  useEffect(() => {
    if (!activeTeams.length) return;

    const timer = setTimeout(() => {
      if (window.$ && window.$.fn.owlCarousel && teamCarouselRef.current) {
        window.$(teamCarouselRef.current).owlCarousel({
          loop: true,
          margin: 30,
          dots: false,
          mouseDrag: true,
          autoplay: false,
          nav: false,
          responsiveClass: true,
          responsive: {
            0: { items: 1, dots: true },
            600: { items: 2 },
            1000: { items: 4 }
          }
        });
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      if (window.$ && teamCarouselRef.current) {
        window.$(teamCarouselRef.current).trigger("destroy.owl.carousel");
      }
    };
  }, [activeTeams]);

  return (
    <>
      {/* About Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">

              <h6 className="wow" data-splitting>
                {activeAbout?.subtitle || "About Us"}
              </h6>

              <h1 className="wow" data-splitting>
                {activeAbout?.title || "Behind the Lens"}
              </h1>

              {(() => {
                const descriptionParts =
                  activeAbout?.description?.split("|") || [];

                return (
                  <>
                    <p className="mt-30 wow fadeInUp" data-wow-delay="0.3s">
                      {descriptionParts[0] || "Your first paragraph here"}
                    </p>

                    {descriptionParts[1] && (
                      <p className="wow fadeInUp" data-wow-delay="0.6s">
                        {descriptionParts[1]}
                      </p>
                    )}
                  </>
                );
              })()}

              <div className="btn-wrap wow fadeInUp text-left mt-30 mb-30" data-wow-delay="0.9s">
                <div className="btn-link">
                  <a href={`mailto:capture.in1@gmail.com`}>
                    capture.in1@gmail.com
                  </a>
                  <span className="btn-block color1 animation-bounce"></span>
                </div>
              </div>

            </div>

            <div className="col-md-5 offset-md-1">
              <div className="reveal-effect">
                <img
                  src={
                    activeAbout?.image
                      ? import.meta.env.VITE_API_BASE_URL + activeAbout.image
                      : "/placeholder.jpg"
                  }
                  className="img-fluid br-10px"
                  alt="About"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-45 text-center">
              <h6 className="wow" data-splitting>The Soul Behind the Lens</h6>
              <h1 className="wow" data-splitting>Pro-team</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="owl-carousel owl-theme" ref={teamCarouselRef}>
                {activeTeams.length > 0 ? (
                  activeTeams.map((t) => (
                    <div className="item" key={t.id}>
                      <div className="img">
                        <Link to="/team-details">
                          <img
                            src={import.meta.env.VITE_API_BASE_URL + t.image}
                            alt={t.name}
                            loading="lazy"
                          />
                        </Link>
                      </div>
                      <div className="bg"></div>
                      <div className="con">
                        <Link to="/team-details">
                          <div className="title"><span>{t.name}</span></div>
                          <div className="subtitle"><span>{t.role}</span></div>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No team members found</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default About;
