import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Clock, ArrowRight } from "lucide-react";
import { useLang } from "../contexts/LangContext";
import { Button } from "./ui/button";
import { apiUrl } from "../lib/api";
import { ShimmerBanner } from "./Shimmer";

const HeroBanner = () => {
  const { t } = useLang();
  const [idx, setIdx] = useState(0);
  const [heroSlides, setHeroSlides] = useState(() => {
    try {
      const cached = localStorage.getItem("bannerUrls");
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetch(apiUrl("/api/settings"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.bannerUrls?.length > 0) {
          setHeroSlides(data.data.bannerUrls);
          localStorage.setItem(
            "bannerUrls",
            JSON.stringify(data.data.bannerUrls),
          );
        }
      })
      .catch((err) => console.error("Error fetching slides:", err));
  }, []);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides]);

  if (heroSlides.length === 0) {
    return (
      <ShimmerBanner height="h-[160px] sm:h-[280px] md:h-[460px] lg:h-[520px]" />
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black min-h-[70vh] lg:min-h-[85vh]">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {heroSlides.map((url, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === idx ? "opacity-30" : "opacity-0"
            }`}
          >
            <img
              src={url}
              alt=""
              draggable={false}
              className="w-full h-full object-cover select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/60" />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 min-h-[70vh] lg:min-h-[85vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left side - Content */}
          <div className="text-white space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20">
              <Clock className="w-4 h-4 text-[#E60012]" />
              <span className="text-sm font-bold uppercase tracking-wider">
                {t({ en: "Quick Install", ar: "تركيب سريع" })}
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              {t({ en: "Your Door.", ar: "بابك." })}
              <br />
              <span className="text-[#E60012]">{t({ en: "Smart.", ar: "ذكي." })}</span>
              <br />
              <span className="text-neutral-400">
                {t({ en: "In 3 Minutes.", ar: "في 3 دقائق." })}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-300 max-w-xl leading-relaxed">
              {t({
                en: "Works seamlessly with your existing door handle and lock. No drilling, no locksmith required.",
                ar: "يعمل بسلاسة مع مقبض بابك وقفلك الحالي. بدون حفر أو فنان.",
              })}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-2xl">🇹🇷</span>
                <span className="text-sm font-bold text-white/90">
                  {t({ en: "Made in Turkey", ar: "صناعة تركية" })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400 text-sm font-medium">
                <svg className="w-5 h-5 text-[#E60012]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t({ en: "Trusted in 40+ Countries", ar: "موثوق في +40 دولة" })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link to="/smart-locks">
                <Button className="h-14 px-8 bg-[#E60012] hover:bg-[#c4000f] text-white font-bold uppercase tracking-wider text-base rounded-full shadow-xl shadow-red-900/30 transition-all hover:-translate-y-0.5 w-full sm:w-auto">
                  {t({ en: "Shop Now", ar: "تسوّق الآن" })}
                  <ArrowRight className="w-5 h-5 ms-2 rtl:rotate-180" />
                </Button>
              </Link>
              <a
                href="https://www.youtube.com/shorts/YQHzRB7QaMQ"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-14 px-8 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 font-bold uppercase tracking-wider text-base rounded-full w-full sm:w-auto transition-all hover:-translate-y-0.5"
                >
                  <Play className="w-5 h-5 me-2" />
                  {t({ en: "Watch Install Video", ar: "شاهد فيديو التركيب" })}
                </Button>
              </a>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="hidden lg:block relative">
            <div className="relative h-[500px] xl:h-[600px]">
              {/* Main product visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={heroSlides[idx]}
                  alt="DESi Smart Lock"
                  className="w-[85%] h-auto object-contain drop-shadow-2xl rounded-3xl"
                />
              </div>

              {/* Floating timer badge */}
              <div className="absolute top-8 right-8 bg-[#E60012] text-white px-5 py-3 rounded-2xl shadow-2xl animate-pulse">
                <div className="flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                      {t({ en: "Install Time", ar: "وقت التركيب" })}
                    </p>
                    <p className="text-2xl font-black">3 {t({ en: "min", ar: "دق" })}</p>
                  </div>
                </div>
              </div>

              {/* Made in Turkey badge */}
              <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-lg text-white px-5 py-3 rounded-2xl border border-white/20 shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🇹🇷</span>
                  <div>
                    <p className="text-sm font-bold">{t({ en: "Made in Turkey", ar: "صناعة تركية" })}</p>
                    <p className="text-xs text-white/70">{t({ en: "Premium Quality", ar: "جودة عالية" })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-medium uppercase tracking-wider">
            {t({ en: "Scroll to explore", ar: "اسحب للاستكشاف" })}
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === idx
                ? "w-8 bg-[#E60012]"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
