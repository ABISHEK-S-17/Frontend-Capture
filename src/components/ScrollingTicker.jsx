import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogos } from "../redux/slice/logoSlice";
import asteriskIcon from "../assets/images/asterisk-icon.svg";

function ScrollingTicker() {
  const dispatch = useDispatch();
  const { logos, loading } = useSelector((state) => state.logo);

  useEffect(() => {
    dispatch(getLogos());
  }, [dispatch]);

  // 🛡️ Safety guard
  if (!Array.isArray(logos) || loading) return null;

  return (
    <div className="scrolling scrolling-ticker">
      <div className="wrapper">

        {/* First loop */}
        <div className="content">
          {logos.map((logo) => (
            <span
              key={logo.id}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {/* Asterisk */}
              <img
                src={asteriskIcon}
                alt="asterisk"
                loading="lazy"
                style={{ width: 18, height: 18 }}
              />

              {/* Logo */}
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${logo.image}`}
                alt={logo.title || "logo"}
                loading="lazy"
                style={{ height: 50, width: "auto" }}
              />
            </span>
          ))}
        </div>

        {/* Duplicate loop for infinite scroll */}
        <div className="content">
          {logos.map((logo) => (
            <span
              key={`duplicate-${logo.id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <img
                src={asteriskIcon}
                alt="asterisk"
                loading="lazy"
                style={{ width: 18, height: 18 }}
              />

              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${logo.image}`}
                alt={logo.title || "logo"}
                loading="lazy"
                style={{ height: 50, width: "auto" }}
              />
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ScrollingTicker;
