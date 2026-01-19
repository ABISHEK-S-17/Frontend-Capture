import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../redux/slice/blogSlice";

// Static Sidebar Post Images
import img2 from "../assets/images/slider/08.jpg";
import img3 from "../assets/images/slider/02.jpg";
import img4 from "../assets/images/slider/01.jpg";

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector(state => state.blog);

  // Convert date to Month + Day format
  const formatDate = (dateString) => {
    if (!dateString) return { month: "JAN", day: "01" };

    const date = new Date(dateString);
    return {
      month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      day: String(date.getDate()).padStart(2, "0"),
    };
  };

  const recentPosts = [
    { img: img2, title: "The Art of Style" },
    { img: img3, title: "Through the Creative Lens" },
    { img: img4, title: "Wandering with a Camera" },
  ];

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <section className="blog section-padding">
      <div className="container">

        {/* Title */}
        <div className="row mb-45">
          <div className="col-md-12">
            <h6>Recent Articles</h6>
            <h1>Blogs</h1>
          </div>
        </div>

        <div className="row">

          {/* ================= LEFT BLOG LIST ================= */}
          <div className="col-md-8">
            <div className="row">

              {loading && <h3>Loading...</h3>}

              {blogs?.filter(post => post.status === "active").length > 0
                ? blogs
                  .filter(post => post.status === "active")
                  .map((post) => {

                    const { month, day } = formatDate(post.createdAt);

                    return (
                      <div className="col-md-12 mb-60" key={post.id}>
                        <div className="item">

                          {/* Blog Image + Date Badge */}
                          <div className="post-img br-5px position-relative">
                            <img
                              src={import.meta.env.VITE_API_BASE_URL + post.image}
                              alt={post.title}
                              className="img-fluid w-100"
                            />
                            <div className="date"
                              style={{
                                position: "absolute", bottom: "15px", left: "15px",
                                background: "#000", padding: "8px 14px", borderRadius: "40px",
                                color: "#fff", textAlign: "center", fontWeight: "600", lineHeight: "1.2"
                              }}>

                              <span style={{ fontSize: "12px", display: "block" }}>{month}</span>  {/* Month normal */}
                              <i style={{ fontSize: "28px", fontWeight: "900", fontStyle: "normal" }}>{day}</i>

                            </div>


                          </div>

                          {/* Content */}
                          <div className="post-cont mt-25">

                            {/* Blog & Category */}
                            <div className="blog-post-categorydate-wrapper" style={{ color: "#fff", display: "flex", alignItems: "center", gap: "5px" }}>
                              <a style={{ color: "#fff", fontWeight: "700" }}>Blog</a>  {/* Bold White */}
                              <div className="blog-post-categorydate-divider"></div>

                              <a style={{
                                color: "#bbb",        // same tone as description
                                fontWeight: "400",    // normal weight
                                fontSize: "12px",     // similar to description text
                                lineHeight: "26px",   // matching p text spacing
                                display: "inline-block"
                              }}>
                                {post.categories || "Uncategorized"}
                              </a>


                            </div>

                            <h4 style={{ marginTop: "10px", fontWeight: "700", color: "#fff" }}>
                              <a style={{ color: "#fff" }}>{post.title}</a>
                            </h4>


                            {/* Description */}
                            <p style={{ marginTop: "10px" }}>{post.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                  !loading && <h3>No Blogs Found</h3>
                )}

              {/* Pagination (static until backend pagination added) */}
              <div className="col-md-12">
                <ul className="pagination-wrap align-center mb-30 mt-30">
                  <li><a><i className="ti-angle-left" /></a></li>
                  <li><a>1</a></li>
                  <li><a className="active">2</a></li>
                  <li><a>3</a></li>
                  <li><a><i className="ti-angle-right" /></a></li>
                </ul>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="col-md-4">
            <div className="row blog-sidebar">

              <div className="col-md-12">
                <div className="widget search">
                  <form>
                    <input type="text" placeholder="Type here ..." />
                    <button type="submit"><i className="ti-search"></i></button>
                  </form>
                </div>
              </div>

              {/* Recent Posts Static */}
              <div className="col-md-12">
                <div className="widget">
                  <div className="widget-title"><h5>Recent Posts</h5></div>
                  <ul className="recent">
                    {recentPosts.map((p, i) => (
                      <li key={i}>
                        <div className="thum br-5px"><img src={p.img} alt="" /></div>
                        <a>{p.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Archives */}
              <div className="col-md-12">
                <div className="widget">
                  <div className="widget-title"><h5>Archives</h5></div>
                  <ul>
                    <li><a>December 2025</a></li>
                    <li><a>November 2025</a></li>
                    <li><a>October 2025</a></li>
                  </ul>
                </div>
              </div>

              {/* Static categories box */}
              <div className="col-md-12">
                <div className="widget">
                  <div className="widget-title"><h5>Categories</h5></div>
                  <ul>
                    <li><a><i className="ti-angle-right"></i> Wedding</a></li>
                    <li><a><i className="ti-angle-right"></i> Portraits</a></li>
                    <li><a><i className="ti-angle-right"></i> Travel</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-md-12">
                <div className="widget">
                  <div className="widget-title"><h5>Tags</h5></div>
                  <ul className="tags">
                    {["Nature", "Portraits", "Wedding", "Art", "Photography", "Fashion"].map((tag, i) => (
                      <li key={i}><a>{tag}</a></li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Blog;
