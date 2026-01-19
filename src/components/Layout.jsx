import { useEffect } from "react";
import Preloader from "./Preloader";
import ProgressScroll from "./ProgressScroll";
import Cursor from "./Cursor";
import SocialIcons from "./SocialIcons";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";  // <-- add Outlet
import { initAnimations } from "../utils/animation";

function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      initAnimations();
    }, 100);
  }, [location]);

  return (
    <>
      <Preloader />
      <ProgressScroll />
      <Cursor />
      <SocialIcons />
      <Navbar />

      {/* 👇 Children/pages will render here */}
      <Outlet />

      <Footer />
    </>
  );
}

export default Layout;
