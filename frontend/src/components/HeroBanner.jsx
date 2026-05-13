import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiUrl } from "../lib/api";
import { ShimmerBanner } from "./Shimmer";

const HeroBanner = () => {
  const [idx, setIdx] = useState(0);
  const [heroSlides, setHeroSlides] = useState(() => {
    // Load from localStorage on mount
    try {
      const cached = localStorage.getItem("bannerUrls");
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  // Fetch banner images and update cache
  useEffect(() => {
    fetch(apiUrl("/api/settings"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.bannerUrls?.length > 0) {
          setHeroSlides(data.data.bannerUrls);
          // Cache to localStorage
          localStorage.setItem(
            "bannerUrls",
            JSON.stringify(data.data.bannerUrls),
          );
        }
      })
      .catch((err) => console.error("Error fetching slides:", err));
  }, []);

  // Auto slide
  useEffect(() => {
    if (heroSlides.length === 0) return;

    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroSlides]);

  // Loading state with shimmer
  if (heroSlides.length === 0) {
    return (
      <ShimmerBanner height="h-[160px] sm:h-[280px] md:h-[460px] lg:h-[520px]" />
    );
  }

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-black

          h-[160px]
          sm:h-[240px]
          md:h-[480px]
          lg:h-[520px]
          xl:h-[560px]

          min-h-[180px]
          max-h-[70vh]
      "
    >
      {/* Slides */}
      {heroSlides.map((url, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === idx ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
          }`}
        >
          {/* Banner Image */}
          <img
            src={url}
            alt={`Banner ${i + 1}`}
            draggable={false}
            className="
              absolute inset-0
              w-full h-full

              object-contain
              sm:object-cover

              object-center
              select-none
            "
          />

          {/* Optional overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={() =>
          setIdx((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
        }
        aria-label="Previous Slide"
        className="
          absolute
          left-2 md:left-4
          top-1/2
          -translate-y-1/2
          z-20

          w-8 h-8
          md:w-10 md:h-10
          lg:w-11 lg:h-11

          rounded-full
          bg-black/20
          hover:bg-black/50

          backdrop-blur
          flex items-center justify-center

          text-white
          transition-all duration-200
        "
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => setIdx((prev) => (prev + 1) % heroSlides.length)}
        aria-label="Next Slide"
        className="
          absolute
          right-2 md:right-4
          top-1/2
          -translate-y-1/2
          z-20

          w-8 h-8
          md:w-10 md:h-10
          lg:w-11 lg:h-11

          rounded-full
          bg-black/20
          hover:bg-black/50

          backdrop-blur
          flex items-center justify-center

          text-white
          transition-all duration-200
        "
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Pagination Dots */}
      <div
        className="
          absolute
          bottom-3 md:bottom-6
          left-1/2
          -translate-x-1/2
          z-20

          flex items-center
          gap-1.5 md:gap-2
        "
      >
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx
                ? "w-8 md:w-10 bg-[#E60012]"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
