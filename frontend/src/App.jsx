import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { LangProvider } from "./contexts/LangContext";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import UserManuals from "./pages/UserManuals";
import AppDownload from "./pages/AppDownload";
import Cart from "./pages/Cart";
import PrivacySecurity from "./pages/PrivacySecurity";
import ReturnsWarranty from "./pages/ReturnsWarranty";
import AdminApp from "./AdminApp";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <LangProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/admin/*" element={<AdminApp />} />
              <Route path="/*" element={<PublicApp />} />
            </Routes>
            <Toaster />
            <Analytics />
          </BrowserRouter>
        </CartProvider>
      </LangProvider>
    </HelmetProvider>
  );
}

const PublicApp = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route
          path="/smart-locks"
          element={<Catalog category="smart-locks" />}
        />
        <Route
          path="/alarm-security"
          element={<Catalog category="alarm-security" />}
        />
        <Route
          path="/accessories"
          element={<Catalog category="accessories" />}
        />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/app-download" element={<AppDownload />} />
        <Route path="/user-manuals" element={<UserManuals />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/privacy-security" element={<PrivacySecurity />} />
        <Route path="/returns-warranty" element={<ReturnsWarranty />} />
      </Routes>
    </div>
    <Footer />
  </div>
);

export default App;
