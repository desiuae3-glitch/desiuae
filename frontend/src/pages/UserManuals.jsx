import React from "react";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";

const UserManuals = () => {
  const { t } = useLang();

  const allProducts = [
    {
      slug: "desi-utopic-rx-base",
      name: {
        en: "DESi Utopic RX",
        ar: "DESi Utopic RX",
      },
      image:
        "https://endesi.tsoftstatic.com/desi-utopic-rx-smart-lock-europrofile-smart-locks-169-67-B.png",
      driveLink:
        "https://drive.google.com/file/d/1a7wjuahAfaCrWMPRYIGXdua9bXNoTdZB/view",
    },
    {
      slug: "desi-utopic-rx-fingerprint-wifi",
      name: {
        en: "DESi Utopic RX Fingerprint Reader & Touch Keypad V3",
        ar: "قارئ بصمة DESi Utopic RX ولوحة مفاتيح V3",
      },
      image:
        "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-fingerprint-reader-and-wireless-touch-keypad-v3-accessories-344-74-O.png",
      driveLink:
        "https://drive.google.com/file/d/1MeUoVTEYbHeUi9TBu734qxYL9Q94dE2V/view",
    },
    {
      slug: "desi-utopic-rx-face-recognition",
      name: {
        en: "DESi Utopic RX Face Recognition & Touch Keypad",
        ar: "التعرف على الوجه DESi Utopic RX ولوحة مفاتيح",
      },
      image:
        "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-compatible-face-reader-and-wireless-touch-keypad-accessories-283-81-B.png",
      driveLink:
        "https://drive.google.com/file/d/1RgWIikyKR9PVaG9_7hZooTedRQP94Xzd/view",
    },
    {
      slug: "desi-utopic-rx-wifi",
      name: {
        en: "DESi Utopic Smart Bridge — WiFi Hub",
        ar: "DESi Utopic Smart Bridge — محور WiFi",
      },
      image:
        "https://endesi.tsoftstatic.com/desi-utopic-series-compatible-wifi-bridge-hub-accessories-338-45-B.png",
      driveLink:
        "https://drive.google.com/file/d/1GHIr--FCluezBLZWDfqqD2WZzfYH6Zyu/view",
    },
    {
      slug: "door-sensor-auto-lock-v3bl",
      name: {
        en: "DESi Utopic RX Door Sensor + Auto Lock V3BL",
        ar: "حساس الباب DESi Utopic RX + قفل تلقائي V3BL",
      },
      image:
        "https://endesi.tsoftstatic.com/desi-wireless-auto-locking-module-v2-compatible-with-utopic-smart-locks-accessories-339-49-O.png",
      driveLink:
        "https://drive.google.com/file/d/1Bvif4pJzhvOHpgaOS9nYK4BGsvU9ETMu/view",
    },
    {
      slug: "wireless-remote-controller-v2bl",
      name: {
        en: "DESi Utopic RX Wireless Remote Controller V2BL",
        ar: "جهاز التحكم اللاسلكي DESi Utopic RX V2BL",
      },
      image:
        "https://endesi.tsoftstatic.com/desi-utopic-rx-rxe-wireless-remote-controller-v2bl-accessories-383-93-O.jpg",
      driveLink:
        "https://drive.google.com/file/d/1a3G0gmsQXg876ti7HXAQyoIyFlCE9BmQ/view",
    },
    {
      slug: "smart-home-automation-v3bl",
      name: {
        en: "DESi Utopic RX Smart Home Automation Interface V3BL",
        ar: "واجهة المنزل الذكي DESi Utopic RX V3BL",
      },
      image:
        "https://endesi.tsoftstatic.com/desi-utopic-series-smart-home-automation-interface-v2-accessories-117-52-O.png",
      driveLink:
        "https://drive.google.com/file/d/1yd5RGsRZXeR4TQKaX69JoXXF9iCC_IAQ/view",
    },
  ];

  return (
    <>
      <SEOHead
        title="DESi Smart Locks User Manuals & Product Guides | UAE"
        description="Download user manuals and product guides for all DESi Utopic models. Complete documentation with images and specifications."
        keywords="user manual, product guide, DESi Utopic, installation guide, smart locks documentation"
        type="website"
      />
      <main>
        <section className="bg-neutral-950 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <Link
              to="/support"
              className="flex items-center gap-2 text-[#E60012] hover:text-[#b8000e] mb-6 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {t({ en: "Back to Support", ar: "العودة إلى الدعم" })}
              </span>
            </Link>
            <p className="text-[#E60012] text-xs font-bold uppercase tracking-widest">
              {t({ en: "Product Documentation", ar: "توثيق المنتجات" })}
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-black">
              {t({ en: "User Manuals & Guides", ar: "أدلة المستخدم" })}
            </h1>
            <p className="mt-3 text-neutral-300 max-w-2xl">
              {t({
                en: "Complete documentation for all DESi Utopic models. Download images and detailed guides for installation and operation.",
                ar: "توثيق كامل لجميع موديلات DESi Utopic. حمّل الصور والأدلة التفصيلية للتركيب والتشغيل.",
              })}
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts.map((product, idx) => (
              <div
                key={idx}
                className="group border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative h-64 bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name.en}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=Product+Image";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg leading-tight mb-4">
                    {t(product.name)}
                  </h3>
                  <a
                    href={product.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full h-11 px-4 bg-[#E60012] hover:bg-[#b8000e] text-white font-bold rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {t({
                      en: "View on Google Drive",
                      ar: "عرض على Google Drive",
                    })}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-black mb-4">
              {t({ en: "Need more help?", ar: "هل تحتاج إلى مساعدة إضافية؟" })}
            </h2>
            <p className="text-neutral-600 mb-6">
              {t({
                en: "Contact our support team for installation assistance or technical questions.",
                ar: "تواصل مع فريق الدعم لدينا للمساعدة في التركيب أو الأسئلة التقنية.",
              })}
            </p>
            <Link to="/contact">
              <Button className="h-12 px-8 bg-[#E60012] hover:bg-[#b8000e] text-white font-bold uppercase tracking-wider">
                {t({ en: "Contact Support", ar: "تواصل مع الدعم" })}
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserManuals;
