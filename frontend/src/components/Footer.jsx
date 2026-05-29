import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe as Globe2, Award, Clock } from "lucide-react";
import { useLang } from "../contexts/LangContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  const { t, lang } = useLang();

  const cols = [
    {
      title: { en: "Shop", ar: "تسوّق" },
      links: [
        {
          to: "/smart-locks",
          label: { en: "Smart Locks", ar: "الأقفال الذكية" },
        },
        { to: "/accessories", label: { en: "Accessories", ar: "الملحقات" } },
      ],
    },
    {
      title: { en: "Support", ar: "الدعم" },
      links: [
        {
          to: "/support",
          label: { en: "Installation Guide", ar: "دليل التركيب" },
        },
        { to: "/faq", label: { en: "FAQ", ar: "الأسئلة الشائعة" } },
        {
          to: "/contact",
          label: { en: "Compatibility Check", ar: "فحص التوافق" },
        },
        {
          to: "/privacy-security",
          label: { en: "Privacy & Security", ar: "الخصوصية والأمان" },
        },
        {
          to: "/returns-warranty",
          label: { en: "Returns & Warranty", ar: "الإرجاع والضمان" },
        },
      ],
    },
    {
      title: { en: "Company", ar: "الشركة" },
      links: [
        { to: "/about", label: { en: "About DESi", ar: "عن ديسي" } },
        { to: "/contact", label: { en: "Contact", ar: "اتصل بنا" } },
        { to: "/contact", label: { en: "Become a Reseller", ar: "كن موزعاً" } },
      ],
    },
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 selection:bg-[#E60012] selection:text-white">
      {/* Newsletter */}
      <div className="border-b border-neutral-900/50 bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[#E60012] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block">
              {t({ en: "Newsletter", ar: "النشرة البريدية" })}
            </span>
            <p className="text-neutral-500 font-medium">
              {t({
                en: "Subscribe for UAE-exclusive offers, install tips & new releases.",
                ar: "اشترك لتحصل على عروض حصرية للإمارات ونصائح التركيب.",
              })}
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                t({
                  en: "Thanks! Check your inbox.",
                  ar: "شكراً! تحقق من بريدك.",
                }),
              );
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input
              type="email"
              required
              placeholder={t({
                en: "Your email address",
                ar: "بريدك الإلكتروني",
              })}
              className="flex-1 h-14 bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-[#E60012] rounded-xl"
            />
            <Button
              type="submit"
              className="h-14 px-8 bg-[#E60012] hover:bg-[#c4000f] text-white font-bold uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-red-900/20"
            >
              {t({ en: "Subscribe", ar: "اشترك" })}
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12">
        <div className="col-span-2 md:col-span-2">
          <Link
            to="/"
            className="text-[#E60012] font-black text-4xl tracking-tight"
          >
            DESi{" "}
            <span className="text-neutral-600 text-xs font-bold tracking-[0.2em] uppercase align-top ml-1">
              UAE
            </span>
          </Link>
          <p className="mt-6 text-[15px] leading-relaxed text-neutral-500 max-w-sm">
            {t({
              en: "Turn your door smart in 3 minutes. Works with your existing handle and lock. No drilling needed. Made in Turkey, trusted in 40+ countries.",
              ar: "حوّل بابك لذكي في 3 دقائق. يعمل مع مقبضك وقفلك الحالي. بدون حفر. صناعة تركية، موثوقة في +40 دولة.",
            })}
          </p>

          {/* Social proof stats */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Clock className="w-4 h-4 text-[#E60012]" />
              <span className="text-xs font-bold text-white/90">{t({ en: "3-Min Install", ar: "تركيب 3 دقائق" })}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Globe2 className="w-4 h-4 text-[#E60012]" />
              <span className="text-xs font-bold text-white/90">{t({ en: "40+ Countries", ar: "+40 دولة" })}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Award className="w-4 h-4 text-[#E60012]" />
              <span className="text-xs font-bold text-white/90">{t({ en: "Made in Turkey", ar: "صناعة تركية" })}</span>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-sm font-medium">
            <div className="flex items-start gap-3 text-neutral-400 hover:text-white transition-colors group cursor-default">
              <MapPin className="w-4 h-4 mt-0.5 text-[#E60012] group-hover:scale-110 transition-transform" />
              <span>
                {t({
                  en: "Dubai, UAE",
                  ar: "دبي، الإمارات",
                })}
              </span>
              <span className="mx-2 text-neutral-700">|</span>
              <span className="text-xl">🇹🇷</span>
              <span className="text-neutral-500">{t({ en: "Made in Turkey", ar: "صناعة تركية" })}</span>
            </div>
            <a
              href="tel:+971526187729"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-[#E60012]" />
              +971526187729
            </a>
            <a
              href="mailto:info@desilocks.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-[#E60012]" />
              info@desilocks.com
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title.en}>
            <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-4">
              {t(c.title)}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.label.en}>
                  <Link
                    to={l.to}
                    className="hover:text-white transition-colors"
                  >
                    {t(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
