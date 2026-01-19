import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonials } from "../redux/slice/testimonialSlice";
import quoteImg from "../assets/images/quot.png";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Testimonials = () => {
  const dispatch = useDispatch();
  const { testimonials } = useSelector((state) => state.testimonial);

  useEffect(() => {
    dispatch(getTestimonials());
  }, [dispatch]);

  const activeTestimonials = testimonials?.filter(
    (item) => item.status === "active"
  );

  return (
    <section className="section-padding testimonials">
      <div className="container">

        {/* Title */}
        <div className="row justify-content-center mb-45">
          <div className="col-md-12 text-center">
            <h6 className="wow" data-splitting>What Are Clients Saying?</h6>
            <h1 className="wow" data-splitting>Testimonials</h1>
          </div>
        </div>

        {/* Masonry Grid */}
        {activeTestimonials?.length > 0 ? (
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              350: 1,
              768: 2,
              1024: 3,
            }}
          >
            <Masonry gutter="30px">
              {activeTestimonials.map((item, index) => (
                <div
                  key={item.id}
                  className="wow fadeInUp"
                  data-wow-delay={`.${index + 1}s`}
                >
                  <div className="testimonials-box">
                    <div className="item">
                      <p>{item.description}</p>

                      <span className="quote">
                        <img src={quoteImg} alt="quote" loading="lazy" />
                      </span>

                      <div className="info">
                        <div className="author-img">
                          <img
                            src={
                              import.meta.env.VITE_API_BASE_URL +
                              item.clientProfile
                            }
                            alt={item.clientName}
                            loading="lazy"
                          />
                        </div>

                        <div className="cont">
                          <h6>{item.clientName}</h6>
                          <span>{item.role || "Customer"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <h3 className="text-center">No Testimonials Found</h3>
        )}

      </div>
    </section>
  );
};

export default Testimonials;
