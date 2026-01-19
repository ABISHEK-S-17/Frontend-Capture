import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./slice/bannerSlice";
import aboutReducer from "./slice/aboutSlice";
import cardReducer from "./slice/cardSlice";
import serviceReducer from "./slice/serviceSlice";
import priceReducer from "./slice/priceSlice";
import testimonialReducer from "./slice/testimonialSlice";
import teamReducer from "./slice/teamSlice";
import portfolioReducer from "./slice/portfolioSlice";
import blogReducer from "./slice/blogSlice";
import contactReducer from "./slice/contactSlice";
import logoReducer from "./slice/logoSlice";


export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    about : aboutReducer,
    card : cardReducer,
    service : serviceReducer,
    price : priceReducer,
    testimonial :testimonialReducer,
    team : teamReducer,
    portfolio : portfolioReducer,
    blog : blogReducer,
    contact : contactReducer,
    logo : logoReducer,
  },
});
