import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../redux/slice/contactSlice"; 
import { Link } from "react-router-dom";

const Contact = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "", // backend expects description field
  });

  const [success, setSuccess] = useState(false);

  // Input Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createContact(formData))
      .unwrap()
      .then(() => {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "", description: "" });
      })
      .catch((err) => {
        console.error("Submit failed:", err);
      });
  };

  return (
    <div>
      {/* Contact Section */}
      <section className="contact section-padding">
        <div className="container">
          
          <div className="row mb-45">
            <div className="col-md-12">
              <h6>Let’s Connect and Create</h6>
              <h1>Contact</h1>
            </div>
          </div>

          <div className="row">

            {/* Left - Info */}
            <div className="col-md-6 mb-45">
              <div className="item">
                <div className="wrap-block">
                  <span className="icon et-phone"></span>
                  <div className="text-block">
                    <h5>Phone & E-Mail</h5>
                    <p style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                      <span>+91 86677 52450</span>
                      <span>capture.in1@gmail.com</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="wrap-block">
                  <span className="icon et-map-pin"></span>
                  <div className="text-block">
                    <h5>Address</h5>
                    <p>2nd Floor, KPP Complex Palayapalayam,</p>
                    <p> Erode - Perundurai Rd, Erode, TamilNadu 638011</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="col-md-6">
              <h5>Get in touch!</h5>

              {success && (
                <div className="alert alert-success">Message sent successfully!</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row mb-3" style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={{ flex: 1 }}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone *"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ flex: 1 }}
                  />
                </div>

                <div className="form-group mb-3">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject *"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <textarea
                    name="description" 
                    rows="4"
                    placeholder="How can we help you? Feel free to get in touch! *"
                    required
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit Styled Button */}
                <div
                  className="btn-wrap text-left mt-30 mb-30"
                  onClick={handleSubmit}
                  style={{ cursor: "pointer" }}
                >
                  <div className="btn-link">
                    <Link>Get in touch</Link>
                    <span className="btn-block color1 animation-bounce"></span>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Google Map */}
     <div className="full-width">
  <div className="google-map">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.773778635504!2d77.6977489750208!3d11.331067691990837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f4497a741f5%3A0x6341e61450be41b0!2sCapture%20Photography!5e0!3m2!1sen!2sin!4v1733730000000"
      width="100%"
      height="500"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Map - Chennai"
    ></iframe>
  </div>
</div>

    </div>
  );
};

export default Contact;
