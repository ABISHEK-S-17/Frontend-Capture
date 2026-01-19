import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../redux/slice/bannerSlice";
import { getAbouts } from "../redux/slice/aboutSlice";
import { getCards } from "../redux/slice/cardSlice";
import { getServices } from "../redux/slice/serviceSlice";
import { getPrices } from "../redux/slice/priceSlice";
import { getTestimonials } from "../redux/slice/testimonialSlice";

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ScrollingTicker from "../components/ScrollingTicker";
import { initAnimations } from "../utils/animation";
import { IndianRupee } from "lucide-react";


import quoteImg from "../assets/images/quot.png";

function Home() {
  const sliderCarouselRef = useRef(null);
  const servicesCarouselRef = useRef(null);
  const priceCarouselRef = useRef(null);
  const testimonialsCarouselRef = useRef(null);
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.banner);
  const { about } = useSelector((state) => state.about);
  const { cards } = useSelector((state) => state.card);
  const { services } = useSelector(state => state.service);
  const { prices, loading } = useSelector((state) => state.price);
  const { testimonials } = useSelector(state => state.testimonial);


  // ✅ ONLY ACTIVE DATA
  const activeBanners = banners?.filter(b => b.status === "active") || [];
  const activeAbout = about?.find(a => a.status === "active");
  const activeCards = cards?.filter(c => c.status === "active") || [];
  const activeServices = services?.filter(s => s.status === "active") || [];
  const activePrices = prices?.filter(p => p.status === "active") || [];
  const activeTestimonials = testimonials?.filter(t => t.status === "active") || [];
    

  useEffect(() => {
    dispatch(getAbouts());
    dispatch(getBanners());
    dispatch(getCards());
    dispatch(getServices());
    dispatch(getPrices());
    dispatch(getTestimonials());
  }, []);

  // ======================== FIXED ONLY THIS PART ========================= //
  useEffect(() => {
    if (!activeBanners.length) return;
    // prevent init before data

    initAnimations();
    // Initialize Slider Carousel
    const initSlider = () => {
      if (window.$ && window.$.fn.owlCarousel && sliderCarouselRef.current) {
        const owl = window.$(sliderCarouselRef.current);
        owl.owlCarousel({
          loop: true,
          margin: 0,
          mouseDrag: true,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          dots: true,
          nav: false,
          animateOut: "fadeOut",
          animateIn: "fadeIn",
          responsiveClass: true,
          responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 },
          },
        });
      }
    };

    // Initialize Services Carousel
    const initServices = () => {
      if (window.$ && window.$.fn.owlCarousel && servicesCarouselRef.current) {
        const owl = window.$(servicesCarouselRef.current);
        owl.owlCarousel({
          loop: true,
          margin: 30,
          mouseDrag: true,
          autoplay: false,
          dots: false,
          nav: false,
          navText: [
            "<span class='lnr ti-angle-left'></span>",
            "<span class='lnr ti-angle-right'></span>",
          ],
          responsiveClass: true,
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 },
          },
        });
      }
    };

    // Initialize Price Carousel
    const initPrice = () => {
      if (window.$ && window.$.fn.owlCarousel && priceCarouselRef.current) {
        const owl = window.$(priceCarouselRef.current);

        owl.owlCarousel({
          loop: true,
          margin: 15,
          mouseDrag: true,
          autoplay: false,
          dots: false,
          nav: false,
          center: true,
          startPosition: 1,
          responsive: {
            0: { items: 1, center: true },
            600: { items: 2, center: true, startPosition: 1 },
            1000: { items: 3, center: true, startPosition: 1 },
          },
        });

        setTimeout(() => owl.trigger("to.owl.carousel", [1, 300]), 300);
      }
    };

    // Initialize Testimonials Carousel
    const initTestimonials = () => {
      if (window.$ && window.$.fn.owlCarousel && testimonialsCarouselRef.current) {
        const owl = window.$(testimonialsCarouselRef.current);
        owl.owlCarousel({
          loop: true,
          margin: 30,
          mouseDrag: true,
          autoplay: false,
          dots: false,
          nav: false,
          navText: [
            "<span class='lnr ti-angle-left'></span>",
            "<span class='lnr ti-angle-right'></span>",
          ],
          responsiveClass: true,
          responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 },
          },
        });
      }
    };

    // Process 2 interactive images
    if (window.$) {
      const process2Element = window.$(".interactive.process2");
      if (process2Element.length) {
        const items = process2Element.find(".inner");
        if (items.length) {
          items.on({
            mouseenter: function () {
              const index = window.$(this).data("index");
              const targetImg = process2Element.find(`.process2-image.img-${index}`);
              if (window.$(this).hasClass("activate")) return;
              items.removeClass("activate");
              window.$(this).addClass("activate");
              process2Element.find(".process2-image").removeClass("show");
              targetImg.addClass("show");
            },
            mouseleave: function () { },
          });
        }
      }
    }

    // Wait for DOM ready
    const timer = setTimeout(() => {
      initSlider();
      initServices();
      initPrice();
      initTestimonials();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (window.$ && sliderCarouselRef.current) {
        const owl = window.$(sliderCarouselRef.current);
        if (owl.data("owl.carousel")) owl.trigger("destroy.owl.carousel");
      }
      if (window.$ && servicesCarouselRef.current) {
        const owl = window.$(servicesCarouselRef.current);
        if (owl.data("owl.carousel")) owl.trigger("destroy.owl.carousel");
      }
      if (window.$ && priceCarouselRef.current) {
        const owl = window.$(priceCarouselRef.current);
        if (owl.data("owl.carousel")) owl.trigger("destroy.owl.carousel");
      }
      if (window.$ && testimonialsCarouselRef.current) {
        const owl = window.$(testimonialsCarouselRef.current);
        if (owl.data("owl.carousel")) owl.trigger("destroy.owl.carousel");
      }

      if (window.$) {
        const process2Element = window.$(".interactive.process2");
        if (process2Element.length) {
          const items = process2Element.find(".inner");
          if (items.length) items.off("mouseenter mouseleave");
        }
      }
    };
  }, [activeBanners, activeServices, activePrices, activeTestimonials]);


  // ========== FIXED HERE ==========

  return (
    <>
      {/* Slider */}
      <header className="header slider-fade">
        <div className="owl-carousel owl-theme" ref={sliderCarouselRef}>

          {activeBanners.length > 0 ? activeBanners.map((item) => (
            <div
              key={item.id}

              className="item bg-img"
              data-overlay-dark="2"
              data-background={import.meta.env.VITE_API_BASE_URL + item.image}
              style={{ backgroundImage: `url(${import.meta.env.VITE_API_BASE_URL + item.image})` }}
            >
              <div className="v-middle caption">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-4 col-md-6 col-sm-10 banner-text-box">
                      <h1>{item.title}</h1>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) :
            <div className="item"><h2>No Banners Found</h2></div>
          }

        </div>
      </header>

      {/* About Section (Dynamic) */}
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
                const descriptionParts = activeAbout?.description?.split("|") || [];
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
                  <a href={`mailto:"capture.in1@gmail.com"`}>
                    {"capture.in1@gmail.com"}
                  </a>
                  <span className="btn-block color1 animation-bounce"></span>
                </div>
              </div>

            </div>

            <div className="col-md-5 offset-md-1">
              <div className="reveal-effect">
                <img
                  src={
                    about?.length > 0 && activeAbout?.image
                      ? import.meta.env.VITE_API_BASE_URL + activeAbout.image
                      : "/placeholder.jpg"  // fallback optional
                  }

                  className="img-fluid br-10px"
                  alt="About"
                />
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Process (Dynamic from Card API) */}
      <section className="interactive process2">
        <div className="process2-content">
          <div className="process2-content-inner">

            {activeCards.length > 0 ? activeCards.map((item, index) => (
              <div className="item" key={item.id}>
                <div className={`inner ${index === 0 ? "activate" : ""}`} data-index={index}>
                  <div className="cont">
                    <div className="text">
                      <h2><Link to="/services">{item.title}</Link></h2>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <h3 style={{ color: "white" }}>No Process Cards Found</h3>
            )}

          </div>

          {/* Images dynamic */}
          <div className="process2-list-image">
            {activeCards.length > 0 && activeCards.map((item, index) => (
              <div
                key={item.id}
                className={`process2-image img-${index} ${index === 0 ? "show" : ""}`}
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_API_BASE_URL + item.image})`
                }}
              ></div>
            ))}
          </div>
        </div>
      </section>


      {/* Process Section 2 */}
      <section className="process section-padding">
        <div className="container">
          <div className="row"><div className="col-md-12 mb-45 text-center">
            <h6 className="wow" data-splitting>Your Session, Step by Step</h6>
            <h1 className="wow" data-splitting>Process</h1>
          </div></div>

          <div className="row"><div className="col-12">
            <div className="process-area">

              <div className="process-item wow fadeInLeft" data-wow-delay=".2s">
                <div className="process-step"><span>01</span></div>
                <div className="process-content">
                  <h4 className="title">Consult & Plan</h4>
                  <p>We start by understanding your vision and goals...</p>
                </div>
              </div>

              <div className="process-item wow fadeInLeft" data-wow-delay=".4s">
                <div className="process-step"><span>02</span></div>
                <div className="process-content">
                  <h4 className="title">Shoot Day</h4>
                  <p>Our team captures every moment with precision...</p>
                </div>
              </div>

              <div className="process-item wow fadeInLeft" data-wow-delay=".6s">
                <div className="process-step"><span>03</span></div>
                <div className="process-content">
                  <h4 className="title">Edit & Deliver</h4>
                  <p>Post-production is handled with care...</p>
                </div>
              </div>

            </div>
          </div></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services2 section-padding">
        <div className="container">
          <div className="row justify-content-center mb-45">
            <div className="col-md-12 text-center">
              <h6 className="wow" data-splitting>Moments fade, frames remain</h6>
              <h1 className="wow" data-splitting>Services</h1>
            </div>
          </div>
        </div>

        <div className="full-width">
          <div className="row">
            <div className="col-md-12">

              {/* 🔽 Replace static here with dynamic (Added above) */}
              <div className="owl-carousel owl-theme" ref={servicesCarouselRef}>
                {activeServices.length > 0 ? activeServices.map((item) => (
                  <div className="item" key={item.id}>
                    <Link to="/services">
                      <div className="img-block">
                        <div className="wrapper-img">
                          <img
                            src={import.meta.env.VITE_API_BASE_URL + item.image}
                            className="img-fluid"
                            alt={item.title}
                          />
                        </div>
                        <div className="title-block">
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                )) : (
                  <h3 style={{ color: "white" }} className="text-center">No Services Found</h3>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

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

              {activePrices.length > 0 ? activePrices.map((item, index) => (
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
                        <Link to="/contact"><a>
                     <h5 style={{ color: "#fff"  , textAlign: "left" }}> <IndianRupee size={18} strokeWidth={2} />
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


      {/* Testimonials */}
      <section id="testimonials" className="testimonials">
        <div
          className="background bg-img bg-fixed section-padding"
          style={{
            backgroundImage:
              activeTestimonials.length > 0 && activeTestimonials[0]?.bgImage
                ? `url(${import.meta.env.VITE_API_BASE_URL + testimonials[0].bgImage})`
                : "/placeholder.jpg",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="row align-items-center">

              <div className="col-md-5 mb-30">
                <h4 className="wow" data-splitting>Let's capture the perfect shots together.</h4>
                <div className="btn-wrap mt-30 text-left wow fadeInUp" data-wow-delay=".6s">
                  <div className="btn-link">
                    <a href="mailto:capture.in1@gmail.com">capture.in1@gmail.com</a>
                    <span className="btn-block color3 animation-bounce"></span>
                  </div>
                </div>
              </div>

              <div className="col-md-5 offset-md-2">
                <div className="testimonials-box">
                  <h5>What Are Clients Saying?</h5>

                  <div className="owl-carousel owl-theme" ref={testimonialsCarouselRef}>
                    {activeTestimonials.length > 0 ? activeTestimonials.map((item) => (
                      <div className="item" key={item.id}>
                        <p>{item.description}</p>

                        <span className="quote"><img src={quoteImg} /></span>

                        <div className="info">
                          <div className="author-img">
                            <img
                              src={import.meta.env.VITE_API_BASE_URL + item.clientProfile}
                              alt={item.clientName}
                            />
                          </div>

                          <div className="cont">
                            <h6>{item.clientName}</h6>
                            <span>{item.role || "Customer"}</span>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <h3 style={{ color: "white", textAlign: "center" }}>No Testimonials Found</h3>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      <ScrollingTicker />
    </>
  );
}

export default Home;
