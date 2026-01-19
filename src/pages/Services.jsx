import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../redux/slice/serviceSlice";

// Static Icons (UNCHANGED)
import icon1 from "../assets/images/icons/wedding.svg";
import icon2 from "../assets/images/icons/icon-5.svg";
import icon3 from "../assets/images/icons/product.svg";
import icon4 from "../assets/images/icons/icon-6.svg";
import icon5 from "../assets/images/icons/fashion.svg";
import icon6 from "../assets/images/icons/portrait.svg";
import icon7 from "../assets/images/icons/events.svg";
import icon8 from "../assets/images/icons/corporate.svg";
import icon9 from "../assets/images/icons/icon-4.svg";
import icon10 from "../assets/images/icons/ledwall.svg";
import icon11 from "../assets/images/icons/dj.svg"

const icons = [icon1, icon2, icon3, icon4, icon5, icon6 , icon7 ,icon8, icon9, icon10 , icon11  ];

function Services() {
  const testimonialsRef = useRef(null);
  const dispatch = useDispatch();

  const { services } = useSelector((state) => state.service);

  useEffect(() => {
    // ✅ Load services from API
    dispatch(getServices());

    // ✅ WOW animation
    if (window.WOW) {
      const wow = new window.WOW({ live: false });
      wow.init();
    }

    // ⭐ Owl carousel (if your template uses it)
    if (window.$ && window.$.fn.owlCarousel && testimonialsRef.current) {
      window.$(testimonialsRef.current).owlCarousel({
        loop: true,
        margin: 30,
        items: 1,
        dots: false,
        nav: false,
        autoplay: true,
        autoplayTimeout: 5000,
      });
    }
  }, [dispatch]);

  // ✅ Only ACTIVE services
  const activeServices =
    services?.filter((item) => item.status === "active") || [];

  return (
    <>
      {/* ------------------- SERVICES ------------------- */}
      <section className="services section-padding">
        <div className="container">
          <div className="row mb-45">
            <div className="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
              <h6>Services That I Provide</h6>
              <h1>Services</h1>
            </div>

            <div
              className="col-md-6 offset-md-2 mt-45 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <p>
                Discover my professional services including photography, videography, retouching, aerials, lighting, and grading — crafted to capture your moments with precision and creativity.
              </p>
            </div>
          </div>

          {/* ================= Service Boxes ================= */}
          <div className="row">
            {activeServices.length > 0 ? (
              activeServices.map((item, i) => (
                <div
                  key={item.id}
                  className="col-12 col-sm-6 col-md-4 wow fadeInLeft"
                  data-wow-delay={`${0.4 + i * 0.2}s`}
                >
                  <Link to="/services-page">
                    <div
                      className="item mb-30 wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      {/* ✅ KEEP OLD ICON UI */}
                      <img
                        src={icons[i % icons.length]}
                        alt={`Service ${i + 1}`}
                      />

                      {/* ✅ API DATA */}
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>

                      {/* ✅ SAME NUMBER UI */}
                      <div className="numb">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <h3 className="text-center" style={{ width: "100%" }}>
                No Services Found
              </h3>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
