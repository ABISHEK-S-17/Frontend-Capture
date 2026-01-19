import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolios } from "../redux/slice/portfolioSlice";
import { Link, useSearchParams } from "react-router-dom";

/* 🔥 helper: normalize category */
const normalizeCategory = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/s$/, ""); // videos → video

const Portfolio = () => {
  const dispatch = useDispatch();
  const { portfolios } = useSelector((state) => state.portfolio);

  // ✅ category stored in URL
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("category") || "all";

  useEffect(() => {
    dispatch(getPortfolios());
  }, [dispatch]);

  // ✅ normalize portfolios (ONLY ACTIVE)
  const normalizedPortfolios = portfolios
    .filter((item) => item.status === "active")
    .map((item) => ({
      ...item,
      image: item.images?.length ? item.images[0] : null,
      categoryKey: normalizeCategory(item.category),
      categoryLabel: item.category || "",
    }));

  // ✅ unique categories
  const categories = useMemo(() => {
    const map = new Map();

    normalizedPortfolios.forEach((p) => {
      if (p.categoryKey && !map.has(p.categoryKey)) {
        map.set(p.categoryKey, p.categoryLabel);
      }
    });

    return Array.from(map.entries()).map(([value, label]) => ({
      value,
      label,
    }));
  }, [normalizedPortfolios]);

  // ✅ filter portfolios
  const filteredItems =
    filter === "all"
      ? normalizedPortfolios
      : normalizedPortfolios.filter(
          (item) => item.categoryKey === filter
        );

  return (
    <section className="section-padding">
      <div className="container">

        {/* ===== Heading ===== */}
        <div className="row justify-content-center mb-45">
          <div className="col-md-12 text-center">
            <h6>Time stands still in every shot</h6>
            <h1>Portfolio</h1>
          </div>
        </div>

        {/* ===== Category Filter ===== */}
        <div className="row mb-30">
          <div className="col-md-12 text-center">
            <ul className="gallery-filter">
              <li
                className={filter === "all" ? "active" : ""}
                onClick={() => setSearchParams({})}
              >
                All
              </li>

              {categories.map((cat) => (
                <li
                  key={cat.value}
                  className={filter === cat.value ? "active" : ""}
                  onClick={() =>
                    setSearchParams({ category: cat.value })
                  }
                >
                  {cat.label.charAt(0).toUpperCase() +
                    cat.label.slice(1)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== Gallery ===== */}
        <div className="row gallery-items">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="col-lg-4 col-md-6 single-item mb-25"
              >
                <Link
                  to="/gallery"
                  state={{
                    title: item.title,
                    category: item.category,
                    images: item.images,
                    description: item.description,
                    videoLink: item.videoLink, // ✅ added
                  }}
                >
                  <div className="gallery-box">
                    <div className="gallery-img img-grayscale">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${item.image}`}
                        className="img-fluid"
                        alt={item.title}
                      />
                    </div>
                    <div className="gallery-detail">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">No Portfolio Found</p>
          )}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
