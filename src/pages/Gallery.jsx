import React, { useState } from "react";
import { X } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useLocation, useNavigate } from "react-router-dom";

/* ✅ YouTube helpers */
const getYoutubeId = (url = "") => {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
};

const getYoutubeEmbed = (url) => {
  const id = getYoutubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : "";
};

const getYoutubeThumb = (url) => {
  const id = getYoutubeId(url);
  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : null;
};

const Gallery = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { title, category, images = [], videoLink = [], description } =
    location.state || {};

  const [activeVideo, setActiveVideo] = useState(null);

  // ✅ normalize category → detect video / videos
  const isVideoCategory =
    typeof category === "string" &&
    category.trim().toLowerCase().startsWith("video");

  if (!images.length && !videoLink.length) {
    navigate("/portfolio");
    return null;
  }

  return (
    <section className="section-padding">
      <div className="container">

        {/* ===== Heading ===== */}
        <div className="row justify-content-center mb-45">
          <div className="col-md-12 text-center">
            <h6>Time stands still in every shot</h6>
            <h1>{title}</h1>
            <h1>{category}</h1>
            {description && <p>{description}</p>}
          </div>
        </div>

        {/* ===== Masonry Gallery ===== */}
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            350: 1,
            768: 2,
            992: 3,
          }}
        >
          <Masonry gutter="15px">

            {/* ===== Videos ===== */}
            {Array.isArray(videoLink) &&
              videoLink.map((link, index) => {
                const thumb = getYoutubeThumb(link);
                if (!thumb) return null;

                return (
                  <div key={`video-${index}`} className="video-gallery">
                    <div className="item">

                      {/* Thumbnail */}
                      <div
                        className="img cursor-pointer"
                        onClick={() => setActiveVideo(link)}
                      >
                        <img
                          src={
                            thumb ||
                            `${import.meta.env.VITE_API_BASE_URL}${images[0]}`
                          }
                          alt={title}
                        />
                      </div>

                      {/* Center Text */}
                      {/* <div className="text">
                        <h4>{title}</h4>
                        {description && <p>{description}</p>}
                      </div> */}

                      {/* Play Button */}
                      <div
                        className="video-icon"
                        onClick={() => setActiveVideo(link)}
                      >
                        <i className="ti-control-play"></i>
                      </div>

                    </div>
                  </div>
                );
              })}


            {/* ===== Images (HIDDEN for Video category) ===== */}
            {!isVideoCategory &&
              images.map((img, idx) => (
                <a
                  key={`image-${idx}`}
                  href={`${import.meta.env.VITE_API_BASE_URL}${img}`}
                  className="img-zoom"
                >
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${img}`}
                    alt={title}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      display: "block",
                    }}
                  />
                </a>
              ))}

          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* ===== Video Popup ===== */}
      {activeVideo && (
        <div
          className="video-popup-overlay"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="video-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={getYoutubeEmbed(activeVideo)}
              allow="autoplay"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
            />


            <button
              className="video-close"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
