import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPrices } from "../redux/slice/priceSlice";
import { IndianRupee } from "lucide-react";


const Price = () => {
  const priceCarouselRef = useRef(null);
  const dispatch = useDispatch();

  const { prices, loading } = useSelector((state) => state.price);


  useEffect(() => {
    dispatch(getPrices());
  }, [dispatch]);

  // Initialize OWL only AFTER prices are loaded
  useEffect(() => {
    if (!prices?.some(item => item.status === "active")) return;


    const initCarousel = () => {
      if (window.$ && window.$.fn.owlCarousel && priceCarouselRef.current) {
        const owl = window.$(priceCarouselRef.current);

        owl.owlCarousel({
          loop: true,
          margin: 15,
          mouseDrag: true,
          autoplay: false,
          dots: false,
          nav: false,
          autoplayHoverPause: true,
          responsiveClass: true,
          responsive: {
            0: { items: 1, dots: true },
            600: { items: 2, dots: true },
            1000: { items: 3 }
          }
        });
      }
    };

    const timer = setTimeout(initCarousel, 150);

    return () => {
      clearTimeout(timer);
      if (window.$ && priceCarouselRef.current) {
        window.$(priceCarouselRef.current).trigger("destroy.owl.carousel");
      }
    };
  }, [prices]); // ← IMPORTANT

  return (
    <>
      {/* Pricing */}
      <section className="price section-padding">
        <div className="container">

          <div className="row justify-content-center mb-45">
            <div className="col-md-12 text-center">
              <h6 className="wow" data-splitting>Choose the package that fits your story</h6>
              <h1 className="wow" data-splitting>Price plan</h1>
            </div>
          </div>

          <div className="row"><div className="col-md-12">

            <div className="owl-carousel owl-theme" ref={priceCarouselRef}>

              {prices?.filter(item => item.status === "active").length > 0
                ? prices
                  .filter(item => item.status === "active")
                  .map((item, index) => (

                    <div className={`item ${index === 1 ? "active" : ""}`} key={item.id}>

                      <h6>Get a quote</h6>
                      <h3>{item.title}</h3>

                      <div className="cont">
                        <ul className="dot-list">
                          {Array.from({ length: 15 }, (_, i) => item[`description${i + 1}`])
                            .filter(Boolean)
                            .map((desc, i) => (
                              <li key={i}>{desc}</li>
                            ))}
                        </ul>
                        <div className="btn-wrap text-left mt-15">
                          <div className="btn-link">
                            <Link to="/contact"> <a>
                        <h5 style={{ color: "#fff" ,textAlign :"left" }}> <IndianRupee size={18} strokeWidth={2} />
                          {Number(item.planPrice).toLocaleString("en-IN")}</h5>
                      </a></Link>
                          </div>
                        </div>
                      </div>
                      <div className="numb">{item.title?.split(" ")[0]}</div>

                    </div>
                  )) : (
                  <h2 style={{ color: "#fff" }}>No Pricing Data Found</h2>
                )}

            </div>

          </div></div>

        </div>
      </section>
    </>
  );
};

export default Price;
