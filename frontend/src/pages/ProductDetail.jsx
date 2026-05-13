import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Check,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useLang } from "../contexts/LangContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "../components/ui/button";
import SEOHead from "../components/SEOHead";
import { structuredData } from "../lib/seo";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useToast } from "../hooks/use-toast";
import { apiUrl } from "../lib/api";
import { Shimmer } from "../components/Shimmer";

const ProductDetail = () => {
  const { slug } = useParams();
  const { t, formatAED } = useLang();
  const { add } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [color, setColor] = useState("Black");
  const [qty, setQty] = useState(1);
  const [whatsappNumber, setWhatsappNumber] = useState("971526187729");
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch(apiUrl(`/api/products/slug/${slug}`))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });

    fetch(apiUrl("/api/settings"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          if (data.data.whatsappNumber) {
            const cleanNumber = data.data.whatsappNumber.replace(/\D/g, "");
            setWhatsappNumber(cleanNumber);
          }
          if (data.data.faqs) {
            setFaqs(data.data.faqs);
          }
        }
      })
      .catch((err) => console.error("Error fetching settings:", err));
  }, [slug]);

  const gallery = useMemo(
    () =>
      product?.gallery && product.gallery.length
        ? product.gallery
        : [product?.image],
    [product],
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image skeleton */}
            <Shimmer className="h-96 md:h-[500px] rounded-lg" />
            
            {/* Details skeleton */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Shimmer className="h-4 w-3/4" />
                <Shimmer className="h-6 w-1/2" />
              </div>
              
              <div className="space-y-2">
                <Shimmer className="h-4 w-full" />
                <Shimmer className="h-4 w-full" />
                <Shimmer className="h-4 w-2/3" />
              </div>

              <div className="space-y-3">
                <Shimmer className="h-10 w-full" />
                <Shimmer className="h-10 w-full" />
              </div>

              <div className="space-y-3 pt-4">
                <Shimmer className="h-4 w-1/4" />
                <Shimmer className="h-20 w-full" />
              </div>
            </div>
          </div>

          {/* Tabs skeleton */}
          <div className="mt-12 space-y-4">
            <div className="flex gap-4">
              <Shimmer className="h-10 w-24" />
              <Shimmer className="h-10 w-24" />
            </div>
            <Shimmer className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }
  if (!product) return <Navigate to="/smart-locks" replace />;

  const onAdd = () => {
    for (let i = 0; i < qty; i++) add(product);
    toast({
      title: t({ en: "Added to cart", ar: "تمت الإضافة" }),
      description: t(product.name),
    });
  };

  const onBuyNow = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in buying:\n\n${t(product.name)}\nQuantity: ${qty}\nPrice: AED ${product.priceAED}\n\nPlease help me complete this purchase.`,
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  // ── Hero banner computed vars ──────────────────────────────
  const INSTALL_GIF =
    "https://shop.desi.com.tr/Data/EditorFiles/rxgifmontajna.gif";
  const heroImg =
    product.slug === "desi-quic-v002"
      ? "https://endesi.tsoftstatic.com/Data/EditorFiles/v002.png"
      : product.category === "smart-locks"
        ? INSTALL_GIF
        : product.image;
  const heroName = t(product.name).replace(/^DESi\s+/i, "");
  const heroSeriesLabel =
    {
      "smart-locks": "Utopic Series",
      accessories: "Utopic Accessories",
      "alarm-security": "Alarm & Security",
    }[product.category] || "DESi Series";
  const heroNameParts = heroName.split(/(RX|QuiC)/g);

  const features = [
    { en: "AI face recognition (anti-spoofing)", ar: "تعرّف الوجه الذكي" },
    {
      en: "iOS / Android app + Siri shortcuts",
      ar: "تطبيق iOS/أندرويد + اختصارات Siri",
    },
    {
      en: "Universal mounting — fits euro-profile",
      ar: "تركيب شامل — يلائم الأسطوانة الأوروبية",
    },
    {
      en: "No drilling, no cylinder change",
      ar: "بدون حفر، بدون تغيير الأسطوانة",
    },
    { en: "37 users with time-based access", ar: "37 مستخدماً بتحكم زمني" },
    {
      en: "Type-C rechargeable, 6-month battery",
      ar: "بطارية تدوم 6 أشهر (Type-C)",
    },
    {
      en: "Auto-lock 15–360s & silent mode",
      ar: "قفل تلقائي 15–360 ثانية ووضع صامت",
    },
    { en: "Activity logs with timestamp", ar: "سجلّ النشاط مع التوقيت" },
  ];

  return (
    <>
      {product && (
        <SEOHead
          title={`${t(product.name)} | DESi Smart Locks UAE`}
          description={
            t(product.description) ||
            `Buy ${t(product.name)} from DESi Smart Locks UAE. AES-256 encryption, face recognition technology.`
          }
          keywords={`${t(product.name)}, smart lock, biometric, security, UAE`}
          image={product.images?.[0] || "/product-default.jpg"}
          type="product"
          structuredDataContent={structuredData.product({
            name: t(product.name),
            description: t(product.description),
            image: product.images?.[0],
            slug: product.slug,
            sku: product.sku,
            price: product.priceAED,
            inStock: product.stock > 0,
          })}
        />
      )}
      <main className="bg-neutral-50/30 selection:bg-[#E60012] selection:text-white">
        {/* Breadcrumbs */}
        <div className="bg-white/80 backdrop-blur-md border-b border-neutral-200/60 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-xs font-medium text-neutral-500">
            <Link to="/" className="hover:text-[#E60012] transition-colors">
              {t({ en: "Home", ar: "الرئيسية" })}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 opacity-50" />
            <Link
              to="/smart-locks"
              className="hover:text-[#E60012] transition-colors"
            >
              {t({ en: "Smart Locks", ar: "الأقفال" })}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 opacity-50" />
            <span className="text-neutral-900 font-bold truncate">
              {t(product.name)}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square rounded-3xl flex items-center justify-center p-1 overflow-hidden group bg-white">
                <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-neutral-200 via-transparent to-transparent pointer-events-none"></div>
                <img
                  src={gallery[active]}
                  alt={t(product.name)}
                  className="relative z-10 w-full h-full object-contain block group-hover:scale-105"
                />
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {gallery.slice(0, 5).map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`aspect-square rounded-2xl border-2 p-3 transition-all duration-300 bg-white ${i === active ? "border-[#E60012] shadow-md scale-[1.02]" : "border-transparent shadow-sm hover:border-neutral-200 hover:shadow-md"}`}
                    >
                      <img
                        src={g}
                        alt={`view ${i + 1}`}
                        className="w-full h-full object-contain drop-shadow-sm block"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {product.isNew && (
                <span className="inline-block self-start bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 shadow-sm">
                  NEW / جديد
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tight text-neutral-900">
                {t(product.name)}
              </h2>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-4xl font-black text-neutral-900 tracking-tighter">
                  {formatAED(product.priceAED)}
                </span>
                <span className="text-lg text-neutral-400 line-through font-medium">
                  {formatAED(Math.round(product.priceAED * 1.18))}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wide border border-emerald-100">
                  {t({ en: "Save 15%", ar: "وفّر 15%" })}
                </span>
              </div>

              <div className="w-full h-px bg-neutral-200/60 my-6"></div>

              {/* Color */}
              <div>
                <p className="text-sm font-bold uppercase tracking-wider mb-3 text-neutral-900">
                  {t({ en: "Color", ar: "اللون" })}:{" "}
                  <span className="text-neutral-500 font-medium normal-case ml-1">
                    {color}
                  </span>
                </p>
                <div className="flex items-center gap-3">
                  {[{ name: "Black", hex: "#171717" }].map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 relative ${color === c.name ? "border-[#E60012] shadow-md scale-110" : "border-transparent shadow-sm hover:scale-105"}`}
                      aria-label={c.name}
                    >
                      <span
                        className="absolute inset-1 rounded-full"
                        style={{ backgroundColor: c.hex }}
                      ></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-6 space-y-3">
                {/* Qty + Add to Cart row */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-white rounded-lg h-10 border border-neutral-200 shadow-sm shrink-0">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-9 h-full hover:bg-neutral-50 rounded-l-lg transition-colors flex items-center justify-center"
                    >
                      <Minus className="w-3.5 h-3.5 text-neutral-500" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm text-neutral-900">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-9 h-full hover:bg-neutral-50 rounded-r-lg transition-colors flex items-center justify-center"
                    >
                      <Plus className="w-3.5 h-3.5 text-neutral-500" />
                    </button>
                  </div>
                  <Button
                    onClick={onAdd}
                    className="flex-1 h-10 bg-[#E60012] hover:bg-[#c4000f] text-white font-bold text-sm rounded-lg shadow-sm shadow-red-900/10 transition-all hover:-translate-y-0.5 tracking-wide"
                  >
                    <ShoppingCart className="w-4 h-4 me-2" />
                    {t({ en: "Add to Cart", ar: "أضف إلى السلة" })}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-lg border-neutral-200 hover:border-[#E60012] hover:text-[#E60012] hover:bg-red-50 transition-colors shadow-sm shrink-0"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                {/* Buy Now full width */}
                <Button
                  onClick={onBuyNow}
                  variant="outline"
                  className="w-full h-10 border-[#E60012] text-[#E60012] hover:bg-[#E60012] hover:text-white font-bold text-sm rounded-lg transition-all hover:-translate-y-0.5 tracking-wide"
                >
                  {t({
                    en: "Buy Now via WhatsApp",
                    ar: "اشترِ الآن عبر واتساب",
                  })}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── HERO BANNER ──────────────────────────────────── */}
        <div className="px-4 md:px-8">
          <div className="bg-[#0e0e0e] rounded-2xl overflow-hidden min-h-[280px] md:min-h-[220px] md:h-[430px]">
            <div className="grid grid-cols-1 md:grid-cols-[55%_45%] h-full gap-4 md:gap-0">
              {/* Left */}
              <div className="flex flex-col justify-center px-6 md:px-14 py-8 md:py-10 h-full">
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <span className="w-8 h-px bg-[#00a693] shrink-0"></span>
                  <span className="text-[#00a693] text-[10px] font-bold uppercase tracking-[0.25em]">
                    {heroSeriesLabel}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-none tracking-tight mb-4 md:mb-5">
                  {heroNameParts.map((part, i) =>
                    /^(RX|QuiC)$/.test(part) ? (
                      <span key={i} className="text-[#00a693]">
                        {part}
                      </span>
                    ) : (
                      <React.Fragment key={i}>{part}</React.Fragment>
                    ),
                  )}
                </h2>
                {product.description && t(product.description) && (
                  <p className="text-neutral-400 text-[13px] leading-relaxed mb-6 max-w-sm">
                    {t(product.description)}
                  </p>
                )}
                {product.bullets?.en?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.bullets.en.map((b, bi) => (
                      <span
                        key={bi}
                        className="text-[12px] px-3 py-1.5 border border-[#00a693]/60 text-[#00a693] font-medium rounded"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* Right: installation gif / hero image */}
              <div className="relative overflow-hidden w-full h-[200px] md:h-auto flex items-center justify-center">
                <img
                  src={heroImg}
                  alt={t(product.name)}
                  className="w-full h-full object-contain block"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── QUICK FEATURES BAR ──────────────────────────── */}
        {product.quickFeatures?.length > 0 && (
          <div className="px-4 md:px-8 mt-4">
            <div className="bg-[#141414] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <div
                  className="flex divide-x divide-white/10 min-w-max md:min-w-0 md:grid"
                  style={{
                    gridTemplateColumns: `repeat(${product.quickFeatures.length}, 1fr)`,
                  }}
                >
                  {product.quickFeatures.map((feat, fi) => (
                    <div
                      key={fi}
                      className="flex flex-col items-center text-center px-6 py-8 md:py-10 min-w-[140px] md:min-w-0"
                    >
                      <span className="text-4xl mb-4 leading-none">
                        {feat.icon}
                      </span>
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white mb-2">
                        {t(feat.label)}
                      </p>
                      {feat.sub && (
                        <p className="text-xs text-neutral-500 leading-relaxed max-w-45">
                          {t(feat.sub)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4">
          {/* ── ANNOUNCEMENT BAR ────────────────────────────── */}
          {product.announcementBar && (
            <div className="mt-8 bg-[#E60012] text-white py-3 px-5 rounded-xl text-sm font-medium text-center leading-relaxed">
              🔴 {t(product.announcementBar)}
            </div>
          )}

          {/* ── RICH CONTENT SECTIONS ───────────────────────── */}
          {product.contentSections?.length > 0 ? (
            <div className="mt-16">
              {product.contentSections.map((section, idx) => {
                if (
                  section.type === "banner" ||
                  section.type === "dark-banner"
                ) {
                  return (
                    <div key={idx} className="border-t border-neutral-100 py-6">
                      <img
                        src={section.image}
                        alt=""
                        className="w-full h-auto rounded-2xl block"
                        loading="lazy"
                      />
                    </div>
                  );
                }

                if (section.type === "text-banner") {
                  return (
                    <div
                      key={idx}
                      className="border-t border-neutral-100 py-16"
                    >
                      <div className="max-w-3xl mb-10">
                        {section.tag && (
                          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a693] mb-3">
                            — {t(section.tag)}
                          </p>
                        )}
                        {section.heading && (
                          <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight text-neutral-900 mb-5">
                            {t(section.heading)}
                          </h2>
                        )}
                        {section.text && (
                          <p className="text-neutral-600 leading-relaxed">
                            {t(section.text)}
                          </p>
                        )}
                        {section.note && (
                          <p className="text-xs italic text-neutral-400 mt-3">
                            {t(section.note)}
                          </p>
                        )}
                      </div>
                      {section.image && (
                        <img
                          src={section.image}
                          alt={t(section.heading) || ""}
                          className="w-full h-auto rounded-2xl block"
                          loading="lazy"
                        />
                      )}
                    </div>
                  );
                }

                // text-image or image-text
                const textBlock = (
                  <div className="flex flex-col justify-center">
                    {section.tag && (
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a693] mb-3">
                        — {t(section.tag)}
                      </p>
                    )}
                    {section.heading && (
                      <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight text-neutral-900 mb-5">
                        {t(section.heading)}
                      </h2>
                    )}
                    {section.text && (
                      <p className="text-neutral-600 leading-relaxed">
                        {t(section.text)}
                      </p>
                    )}
                    {section.bullets?.length > 0 && (
                      <ul className="mt-4 space-y-2.5">
                        {section.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-neutral-600"
                          >
                            <Check className="w-4 h-4 text-[#00a693] shrink-0 mt-0.5" />
                            <span>{t(b)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.note && (
                      <p className="text-xs italic text-neutral-400 mt-4">
                        {t(section.note)}
                      </p>
                    )}
                  </div>
                );

                const sectionImageSrc =
                  product.slug === "desi-quic-v002" &&
                  (t(section.heading) || "").toLowerCase().includes("peephole")
                    ? "/product/IMG_6179.gif"
                    : section.image;

                const imageBlock = (
                  <div className="flex items-center justify-center w-full">
                    <img
                      src={sectionImageSrc}
                      alt={t(section.heading) || ""}
                      className="w-full h-auto rounded-2xl block md:max-w-lg"
                      loading="lazy"
                    />
                  </div>
                );

                return (
                  <div key={idx} className="border-t border-neutral-100 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
                      {section.type === "text-image" ? (
                        <>
                          {textBlock}
                          {imageBlock}
                        </>
                      ) : (
                        <>
                          {imageBlock}
                          {textBlock}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── FALLBACK TABS (no contentSections) ─────────── */
            <div className="mt-20 bg-white rounded-3xl border border-neutral-200/60 shadow-sm p-4 md:p-8">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="bg-neutral-100/80 p-1.5 rounded-2xl w-full md:w-auto inline-flex overflow-x-auto overflow-y-hidden">
                  <TabsTrigger
                    value="features"
                    className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-[#E60012] data-[state=active]:shadow-sm transition-all"
                  >
                    {t({ en: "Features", ar: "المميزات" })}
                  </TabsTrigger>
                  <TabsTrigger
                    value="specs"
                    className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-[#E60012] data-[state=active]:shadow-sm transition-all"
                  >
                    {t({ en: "Specifications", ar: "المواصفات" })}
                  </TabsTrigger>
                  <TabsTrigger
                    value="box"
                    className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-[#E60012] data-[state=active]:shadow-sm transition-all"
                  >
                    {t({ en: "In the box", ar: "محتويات العلبة" })}
                  </TabsTrigger>
                  <TabsTrigger
                    value="faq"
                    className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:text-[#E60012] data-[state=active]:shadow-sm transition-all"
                  >
                    FAQ
                  </TabsTrigger>
                </TabsList>
                <div className="mt-8 px-2">
                  <TabsContent
                    value="features"
                    className="py-2 focus-visible:outline-none"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      {features.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 p-5 bg-neutral-50/80 rounded-2xl border border-neutral-100 hover:border-[#E60012]/20 hover:bg-red-50/30 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-neutral-200/50">
                            <Check className="w-4 h-4 text-[#E60012]" />
                          </div>
                          <span className="font-medium text-neutral-700 leading-relaxed">
                            {t(f)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="specs"
                    className="py-2 focus-visible:outline-none"
                  >
                    <div className="overflow-hidden rounded-2xl border border-neutral-200/60">
                      <table className="w-full text-sm">
                        <tbody>
                          {[
                            {
                              key: "compatibility",
                              label: { en: "Compatibility", ar: "التوافق" },
                            },
                            {
                              key: "cylinderType",
                              label: {
                                en: "Cylinder type",
                                ar: "نوع الأسطوانة",
                              },
                            },
                            {
                              key: "battery",
                              label: { en: "Battery", ar: "البطارية" },
                            },
                            {
                              key: "batteryLife",
                              label: { en: "Battery life", ar: "عمر البطارية" },
                            },
                            {
                              key: "connectivity",
                              label: { en: "Connectivity", ar: "الاتصال" },
                            },
                            {
                              key: "encryption",
                              label: { en: "Encryption", ar: "التشفير" },
                            },
                            {
                              key: "voiceControl",
                              label: {
                                en: "Voice control",
                                ar: "التحكم الصوتي",
                              },
                            },
                            {
                              key: "operatingTemperature",
                              label: {
                                en: "Operating temperature",
                                ar: "درجة حرارة التشغيل",
                              },
                            },
                          ]
                            .filter(
                              (item) => product.specifications?.[item.key],
                            )
                            .map((item, i) => (
                              <tr
                                key={i}
                                className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors"
                              >
                                <td className="py-4 px-6 font-bold text-neutral-900 w-1/3 bg-neutral-50/30">
                                  {t(item.label)}
                                </td>
                                <td className="py-4 px-6 text-neutral-600 font-medium">
                                  {product.specifications[item.key]}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="box"
                    className="py-2 focus-visible:outline-none"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {(product.inTheBox?.length > 0
                        ? product.inTheBox.map((item) => ({
                            en: item,
                            ar: item,
                          }))
                        : [
                            { en: "Utopic RX Smart Lock", ar: "القفل الذكي" },
                            { en: "Type-C USB Cable", ar: "كابل USB Type-C" },
                            { en: "2 × Allen Wrenches", ar: "مفتاح ألن ×2" },
                            {
                              en: "Door Surface Adhesive",
                              ar: "لاصق سطح الباب",
                            },
                            {
                              en: "Plastic Adapter for Key",
                              ar: "محوّل بلاستيكي للمفتاح",
                            },
                            {
                              en: "Plastic Adapter for Thumbturn",
                              ar: "محوّل للمقبض",
                            },
                          ]
                      ).map((item, i) => (
                        <div
                          key={i}
                          className="p-6 bg-neutral-50/80 rounded-2xl border border-neutral-100 text-center hover:shadow-md transition-shadow"
                        >
                          <div className="w-14 h-14 mx-auto rounded-full bg-linear-to-br from-red-50 to-[#E60012]/10 flex items-center justify-center mb-4 border border-[#E60012]/10">
                            <Check className="w-6 h-6 text-[#E60012]" />
                          </div>
                          <p className="text-[15px] font-bold text-neutral-800 leading-snug">
                            {t(item)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="faq"
                    className="py-2 focus-visible:outline-none"
                  >
                    <div className="bg-neutral-50/50 rounded-2xl border border-neutral-200/60 p-2 md:p-6">
                      <Accordion type="single" collapsible className="w-full">
                        {faqs.map((f, i) => (
                          <AccordionItem
                            key={i}
                            value={`q${i}`}
                            className="border-neutral-200/60 px-4 md:px-0"
                          >
                            <AccordionTrigger className="text-start font-bold text-base py-5 hover:text-[#E60012] transition-colors">
                              {t(f.q)}
                            </AccordionTrigger>
                            <AccordionContent className="text-neutral-600 font-medium leading-relaxed pb-6 text-base">
                              {t(f.a)}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}

          {/* ── SPEC GROUPS GRID ─────────────────────────────── */}
          {product.specGroups?.length > 0 && (
            <div className="border-t border-neutral-100 py-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a693] mb-3">
                — {t({ en: "TECHNICAL DETAILS", ar: "التفاصيل التقنية" })}
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-neutral-900 mb-10">
                {t(product.name)} {t({ en: "FEATURES", ar: "المميزات" })}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {product.specGroups.map((group, i) => (
                  <div
                    key={i}
                    className="border border-neutral-200/60 rounded-2xl p-6"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#00a693] mb-4">
                      — {t(group.title)}
                    </p>
                    <ul className="space-y-2">
                      {group.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-neutral-700"
                        >
                          <span className="text-[#00a693] mt-0.5 shrink-0">
                            •
                          </span>
                          <span>{t(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── BOX CONTENTS ─────────────────────────────────── */}
          {(product.boxContents?.length > 0 || product.inTheBox?.length > 0) &&
            product.contentSections?.length > 0 && (
              <div className="border-t border-neutral-100 py-16">
                <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900 mb-8">
                  {t({ en: "BOX CONTENTS", ar: "محتويات العلبة" })}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {(product.boxContents?.length > 0
                    ? product.boxContents
                    : product.inTheBox.map((item) => ({
                        icon: "📦",
                        name: { en: item, ar: item },
                      }))
                  ).map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center gap-2.5 p-4 bg-neutral-50/80 border border-neutral-200/60 rounded-2xl hover:shadow-sm transition-shadow"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <p className="text-xs font-medium text-neutral-700 leading-snug">
                        {t(item.name)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* ── FAQ ──────────────────────────────────────────── */}
          {faqs.length > 0 && (
            <div className="border-t border-neutral-100 py-16">
              <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900 mb-8">
                {t({ en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" })}
              </h2>
              <div className="bg-neutral-50/50 rounded-2xl border border-neutral-200/60 p-2 md:p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((f, i) => (
                    <AccordionItem
                      key={i}
                      value={`q${i}`}
                      className="border-neutral-200/60 px-4 md:px-0"
                    >
                      <AccordionTrigger className="text-start font-bold text-base py-5 hover:text-[#E60012] transition-colors">
                        {t(f.q)}
                      </AccordionTrigger>
                      <AccordionContent className="text-neutral-600 font-medium leading-relaxed pb-6 text-base">
                        {t(f.a)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
