import React from "react";
import SEOHead from "../components/SEOHead";
import { useLang } from "../contexts/LangContext";

const ReturnsWarranty = () => {
  const { t } = useLang();

  return (
    <>
      <SEOHead
        title={t({
          en: "Returns & Warranty – DESi UAE",
          ar: "الإرجاع والضمان – ديسي الإمارات",
        })}
        description={t({
          en: "Returns & Warranty policy for DESi Türkiye smart locks. Governed by UAE Federal Law No. 15 of 2020.",
          ar: "سياسة الإرجاع والضمان لأقفال ديسي الذكية.",
        })}
      />

      <main className="max-w-3xl mx-auto px-4 py-16 text-neutral-800">
        {/* Header */}
        <p className="text-[#E60012] font-bold text-sm mb-1">DESi Türkiye</p>
        <h1 className="text-4xl font-bold mb-1">
          {t({ en: "Returns & Warranty", ar: "الإرجاع والضمان" })}
        </h1>
        <p className="text-neutral-500 text-sm mb-1">
          {t({ en: "Effective: [insert date]", ar: "ساري: [أدخل التاريخ]" })}{" "}
          &nbsp;·&nbsp; utopicrx.com &nbsp;·&nbsp; v1.9
        </p>
        <hr className="border-[#E60012] mb-6" />
        <p className="text-neutral-600 leading-relaxed mb-10">
          {t({
            en: "This policy sets out the terms under which DESi Türkiye accepts product returns and processes refunds. It is governed by UAE Federal Law No. 15 of 2020 on Consumer Protection and its Executive Regulations. Nothing in this policy limits any statutory rights you have as a consumer in the UAE.",
            ar: "تحدد هذه السياسة الشروط التي تقبل بموجبها ديسي تركيا إرجاع المنتجات ومعالجة المبالغ المستردة. تخضع للقانون الاتحادي الإماراتي رقم 15 لسنة 2020.",
          })}
        </p>

        {/* Section 01 */}
        <section className="mb-10">
          <p className="text-[#E60012] font-bold text-xs uppercase tracking-widest mb-1">
            SECTION 01
          </p>
          <h2 className="text-xl font-bold mb-4">
            {t({ en: "Policy at a glance", ar: "نظرة عامة على السياسة" })}
          </h2>
          <div className="overflow-x-auto rounded-lg border border-neutral-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-800 text-white">
                  <th className="text-left px-4 py-3 font-semibold">
                    {t({ en: "Scenario", ar: "الحالة" })}
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    {t({ en: "Window", ar: "المدة" })}
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    {t({ en: "Cost to You", ar: "التكلفة" })}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {[
                  {
                    scenario: {
                      en: "Damaged or defective on arrival",
                      ar: "تالف أو معيب عند الاستلام",
                    },
                    window: { en: "7 days", ar: "7 أيام" },
                    cost: {
                      en: "Free refund or replacement",
                      ar: "استرداد مجاني أو استبدال",
                    },
                  },
                  {
                    scenario: {
                      en: "Manufacturing defect after 7 days",
                      ar: "عيب تصنيع بعد 7 أيام",
                    },
                    window: {
                      en: "Within 2-year warranty",
                      ar: "ضمن ضمان سنتين",
                    },
                    cost: {
                      en: "Free repair or replacement",
                      ar: "إصلاح أو استبدال مجاني",
                    },
                  },
                  {
                    scenario: {
                      en: "Change of mind — unused, unopened, unpaired",
                      ar: "تغيير الرأي — غير مستخدم وغير مفتوح",
                    },
                    window: { en: "7 days", ar: "7 أيام" },
                    cost: {
                      en: "AED 100 restocking fee deducted",
                      ar: "خصم 100 درهم رسوم إعادة التخزين",
                    },
                  },
                  {
                    scenario: {
                      en: "Product installed, paired, or biometrics enrolled",
                      ar: "المنتج مثبت أو مقترن أو مسجّل بيومتريًا",
                    },
                    window: { en: "Not eligible", ar: "غير مؤهل" },
                    cost: { en: "Warranty cover only", ar: "تغطية الضمان فقط" },
                  },
                  {
                    scenario: {
                      en: "Project / B2B purchase order",
                      ar: "مشروع / أمر شراء B2B",
                    },
                    window: { en: "Per PO terms", ar: "وفق شروط أمر الشراء" },
                    cost: {
                      en: "As per signed agreement",
                      ar: "وفق الاتفاقية الموقّعة",
                    },
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}
                  >
                    <td className="px-4 py-3">{t(row.scenario)}</td>
                    <td className="px-4 py-3">{t(row.window)}</td>
                    <td className="px-4 py-3">{t(row.cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <p className="text-[#E60012] font-bold text-xs uppercase tracking-widest mb-1">
            SECTION 02
          </p>
          <h2 className="text-xl font-bold mb-3">
            {t({
              en: "Damaged or defective products",
              ar: "المنتجات التالفة أو المعيبة",
            })}
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            {t({
              en: "If your product arrives damaged, defective, or develops a manufacturing fault within 7 days of delivery, DESi Türkiye will arrange free collection from your address and offer you the choice of a full refund or a free replacement. There are no charges to you in this scenario.",
              ar: "إذا وصل منتجك تالفًا أو معيبًا، أو ظهر عيب تصنيع خلال 7 أيام من التسليم، ستقوم ديسي تركيا بترتيب الاستلام المجاني وتقديم استرداد كامل أو استبدال مجاني.",
            })}
          </p>
          <h3 className="font-semibold mb-2">
            {t({ en: "How to raise a claim", ar: "كيفية تقديم مطالبة" })}
          </h3>
          <ul className="space-y-2 text-neutral-600 text-sm leading-relaxed">
            <li className="flex gap-2">
              <span className="text-neutral-400 mt-1">·</span>
              {t({
                en: (
                  <>
                    Email{" "}
                    <a
                      href="mailto:support@utopicrx.com"
                      className="text-[#E60012] hover:underline"
                    >
                      support@utopicrx.com
                    </a>{" "}
                    within 7 days of delivery.
                  </>
                ),
                ar: (
                  <>
                    أرسل بريدًا إلكترونيًا إلى{" "}
                    <a
                      href="mailto:support@utopicrx.com"
                      className="text-[#E60012] hover:underline"
                    >
                      support@utopicrx.com
                    </a>{" "}
                    خلال 7 أيام من التسليم.
                  </>
                ),
              })}
            </li>
            <li className="flex gap-2">
              <span className="text-neutral-400 mt-1">·</span>
              {t({
                en: "Include your order number, photos and a short video of the defect, and a brief description of the issue.",
                ar: "أرفق رقم طلبك وصورًا ومقطع فيديو قصير للعيب ووصفًا موجزًا للمشكلة.",
              })}
            </li>
            <li className="flex gap-2">
              <span className="text-neutral-400 mt-1">·</span>
              {t({
                en: "We will issue an RMA number within 1 business day and arrange free courier collection.",
                ar: "سنصدر رقم RMA خلال يوم عمل واحد ونرتب لاستلام مجاني بواسطة شركة شحن.",
              })}
            </li>
          </ul>
          <p className="text-neutral-600 text-sm mt-3">
            {t({
              en: "After day 7, manufacturing defects are covered under our 2-year manufacturer's warranty — see Section 06.",
              ar: "بعد اليوم السابع، تُغطى عيوب التصنيع ضمن ضمان المُصنِّع لمدة سنتين — انظر القسم 06.",
            })}
          </p>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <p className="text-[#E60012] font-bold text-xs uppercase tracking-widest mb-1">
            SECTION 03
          </p>
          <h2 className="text-xl font-bold mb-3">
            {t({
              en: "Change of mind / no longer wanted",
              ar: "تغيير الرأي / لم تعد ترغب فيه",
            })}
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            {t({
              en: "If you no longer want the product, you may return it within 7 calendar days of delivery, subject to the conditions and charges below. This is a discretionary service offered by DESi Türkiye in addition to your statutory rights as a consumer.",
              ar: "إذا لم تعد ترغب في المنتج، يمكنك إعادته خلال 7 أيام تقويمية من التسليم وفقًا للشروط والرسوم أدناه.",
            })}
          </p>

          <h3 className="font-semibold mb-2">
            {t({ en: "Eligibility conditions", ar: "شروط الأهلية" })}
          </h3>
          <p className="text-neutral-600 text-sm mb-2">
            {t({
              en: "To qualify for a change-of-mind return, the product must be:",
              ar: "للتأهل لإرجاع بسبب تغيير الرأي، يجب أن يكون المنتج:",
            })}
          </p>
          <ul className="space-y-1.5 text-neutral-600 text-sm mb-5">
            {[
              {
                en: "Not installed on a door, drawer, or any fixture.",
                ar: "غير مثبت على باب أو درج أو أي تركيبة.",
              },
              {
                en: "Not paired to the DESi app or any user account.",
                ar: "غير مقترن بتطبيق ديسي أو أي حساب مستخدم.",
              },
              {
                en: "Free of enrolled fingerprints, PIN codes, RFID cards, or face data.",
                ar: "خاليًا من البصمات أو رموز PIN أو بطاقات RFID أو بيانات الوجه المسجلة.",
              },
              {
                en: "In its original packaging with all accessories, manuals, screws, batteries, protective films, and seals intact.",
                ar: "في عبوته الأصلية مع جميع الملحقات والأدلة والمسامير والبطاريات والأغشية الواقية والأختام سليمة.",
              },
              {
                en: "Free from scratches, drilling marks, adhesive residue, or any other sign of fitting or attempted fitting.",
                ar: "خاليًا من الخدوش أو آثار الحفر أو بقايا المواد اللاصقة أو أي علامة تركيب.",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-neutral-400 mt-0.5">·</span>
                <span>{t(item)}</span>
              </li>
            ))}
          </ul>
          <p className="text-neutral-600 text-sm mb-5">
            {t({
              en: "If any of these conditions are not met on inspection, the product is not eligible for return. DESi Türkiye reserves the right to refuse a return and to send the product back to the customer at the customer's cost.",
              ar: "إذا لم تُستوفَ أي من هذه الشروط عند الفحص، لن يكون المنتج مؤهلاً للإرجاع.",
            })}
          </p>

          <h3 className="font-semibold mb-2">
            {t({
              en: "Charges deducted from your refund",
              ar: "الرسوم المخصومة من المبلغ المسترد",
            })}
          </h3>
          <ul className="space-y-1.5 text-neutral-600 text-sm mb-3">
            <li className="flex gap-2">
              <span className="text-neutral-400 mt-0.5">·</span>
              {t({
                en: "Restocking fee — AED 100. Inspection, factory reset, repackaging, restocking.",
                ar: "رسوم إعادة التخزين — 100 درهم. الفحص وإعادة الضبط وإعادة التعبئة.",
              })}
            </li>
          </ul>
          <p className="text-neutral-600 text-sm">
            {t({
              en: "Any outbound delivery charge paid at the time of purchase is non-refundable.",
              ar: "أي رسوم توصيل صادرة مدفوعة وقت الشراء غير قابلة للاسترداد.",
            })}
          </p>
        </section>

        {/* Section 04 */}
        <section className="mb-10">
          <p className="text-[#E60012] font-bold text-xs uppercase tracking-widest mb-1">
            SECTION 04
          </p>
          <h2 className="text-xl font-bold mb-3">
            {t({
              en: "Non-returnable items",
              ar: "العناصر غير القابلة للإرجاع",
            })}
          </h2>
          <p className="text-neutral-600 text-sm mb-3">
            {t({
              en: "The following items cannot be returned for change of mind under any circumstance:",
              ar: "لا يمكن إرجاع العناصر التالية بسبب تغيير الرأي تحت أي ظرف:",
            })}
          </p>
          <ul className="space-y-1.5 text-neutral-600 text-sm">
            {[
              {
                en: "Products installed on a door, drawer, or fixture.",
                ar: "المنتجات المثبتة على باب أو درج أو تركيبة.",
              },
              {
                en: "Products paired to the DESi app or any user account.",
                ar: "المنتجات المقترنة بتطبيق ديسي أو أي حساب مستخدم.",
              },
              {
                en: "Custom-configured, engraved, or special-order units.",
                ar: "الوحدات المُهيَّأة مخصصًا أو المنقوشة أو الطلبات الخاصة.",
              },
              {
                en: "Products with missing accessories, manuals, or original packaging.",
                ar: "المنتجات التي تفتقر إلى الملحقات أو الأدلة أو العبوة الأصلية.",
              },
              {
                en: "Products damaged by improper installation, misuse, water ingress, or unauthorised modification.",
                ar: "المنتجات التالفة بسبب التركيب غير السليم أو سوء الاستخدام أو دخول الماء أو التعديل غير المصرح به.",
              },
              {
                en: "Project, trade, or B2B purchase orders, governed by the terms of the issued PO.",
                ar: "طلبات الشراء للمشاريع أو التجارة أو B2B، التي تخضع لشروط أمر الشراء الصادر.",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-neutral-400 mt-0.5">·</span>
                <span>{t(item)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 05 */}
        <section className="mb-10">
          <p className="text-[#E60012] font-bold text-xs uppercase tracking-widest mb-1">
            SECTION 05
          </p>
          <h2 className="text-xl font-bold mb-4">
            {t({ en: "Return process", ar: "عملية الإرجاع" })}
          </h2>
          <div className="overflow-x-auto rounded-lg border border-neutral-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-800 text-white">
                  <th className="text-left px-4 py-3 font-semibold w-12">
                    {t({ en: "Step", ar: "الخطوة" })}
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    {t({ en: "Action", ar: "الإجراء" })}
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    {t({ en: "Timeline", ar: "الجدول الزمني" })}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {[
                  {
                    step: 1,
                    action: {
                      en: "Email support@utopicrx.com with order number, reason, and photos/video.",
                      ar: "أرسل بريدًا إلكترونيًا إلى support@utopicrx.com مع رقم الطلب والسبب والصور/الفيديو.",
                    },
                    timeline: {
                      en: "Within 7 days of delivery",
                      ar: "خلال 7 أيام من التسليم",
                    },
                  },
                  {
                    step: 2,
                    action: {
                      en: "Receive your RMA number and courier details.",
                      ar: "استلم رقم RMA وتفاصيل شركة الشحن.",
                    },
                    timeline: {
                      en: "Within 1 business day",
                      ar: "خلال يوم عمل واحد",
                    },
                  },
                  {
                    step: 3,
                    action: {
                      en: "Pack the product in original packaging, ready for collection.",
                      ar: "عبّئ المنتج في العبوة الأصلية، جاهزًا للاستلام.",
                    },
                    timeline: {
                      en: "Same or next day",
                      ar: "نفس اليوم أو اليوم التالي",
                    },
                  },
                  {
                    step: 4,
                    action: {
                      en: "Hand the parcel to the courier. Keep the receipt.",
                      ar: "سلّم الطرد إلى شركة الشحن. احتفظ بالإيصال.",
                    },
                    timeline: { en: "On collection", ar: "عند الاستلام" },
                  },
                  {
                    step: 5,
                    action: {
                      en: "Our team inspects the return and confirms eligibility.",
                      ar: "يفحص فريقنا الإرجاع ويؤكد الأهلية.",
                    },
                    timeline: {
                      en: "Within 3 business days",
                      ar: "خلال 3 أيام عمل",
                    },
                  },
                  {
                    step: 6,
                    action: {
                      en: "Approved refund issued to original payment method.",
                      ar: "يُصدر المبلغ المسترد المعتمد إلى طريقة الدفع الأصلية.",
                    },
                    timeline: {
                      en: "Within 14 working days",
                      ar: "خلال 14 يوم عمل",
                    },
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}
                  >
                    <td className="px-4 py-3 font-semibold text-neutral-500">
                      {row.step}
                    </td>
                    <td className="px-4 py-3">{t(row.action)}</td>
                    <td className="px-4 py-3 text-neutral-500">
                      {t(row.timeline)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 06 */}
        <section className="mb-10">
          <p className="text-[#E60012] font-bold text-xs uppercase tracking-widest mb-1">
            SECTION 06
          </p>
          <h2 className="text-xl font-bold mb-3">
            {t({ en: "Warranty coverage", ar: "تغطية الضمان" })}
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            {t({
              en: "All DESi smart locks and accessories sold by DESi Türkiye are covered by a 2-year manufacturer's warranty from the date of delivery, unless otherwise stated on the product page. The warranty covers manufacturing defects and component failures of the lock body and electronics under normal residential use.",
              ar: "تتمتع جميع الأقفال الذكية والملحقات التي تبيعها ديسي تركيا بضمان المُصنِّع لمدة سنتين من تاريخ التسليم.",
            })}
          </p>

          <h3 className="font-semibold mb-2">
            {t({
              en: "Warranty period by component",
              ar: "مدة الضمان حسب المكوّن",
            })}
          </h3>
          <ul className="space-y-1.5 text-neutral-600 text-sm mb-5">
            {[
              {
                en: "Mechanical lock body and cylinder — 24 months from delivery.",
                ar: "جسم القفل الميكانيكي والأسطوانة — 24 شهرًا من التسليم.",
              },
              {
                en: "Electronic control board — 24 months from delivery.",
                ar: "لوحة التحكم الإلكترونية — 24 شهرًا من التسليم.",
              },
              {
                en: "Fingerprint sensor, keypad, face / palm reader hardware — 24 months from delivery.",
                ar: "مستشعر البصمة ولوحة المفاتيح وقارئ الوجه/الراحة — 24 شهرًا من التسليم.",
              },
              {
                en: "Built-in rechargeable battery (main lock unit) — 24 months from delivery, against manufacturing defect or capacity loss exceeding 30% of rated capacity.",
                ar: "البطارية القابلة لإعادة الشحن المدمجة — 24 شهرًا من التسليم، ضد عيب التصنيع أو فقدان السعة بأكثر من 30%.",
              },
              {
                en: "Alkaline batteries supplied with wireless readers — not warranted. The batteries in the box are first-use only; the customer is responsible for replacement when flat.",
                ar: "البطاريات القلوية المرفقة مع القراء اللاسلكية — غير مضمونة. البطاريات في الصندوق للاستخدام الأول فقط.",
              },
              {
                en: "App, cloud connectivity, OTA firmware updates — provided as available; no fixed warranty period.",
                ar: "التطبيق والاتصال السحابي وتحديثات البرامج الثابتة OTA — مقدَّمة حسب التوفر؛ بدون فترة ضمان ثابتة.",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-neutral-400 mt-0.5">·</span>
                <span>{t(item)}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mb-2">
            {t({ en: "The warranty does not cover", ar: "لا يغطي الضمان" })}
          </h3>
          <ul className="space-y-1.5 text-neutral-600 text-sm mb-3">
            {[
              {
                en: "Damage caused by improper installation, misuse, or unauthorised repair.",
                ar: "الأضرار الناجمة عن التركيب غير السليم أو سوء الاستخدام أو الإصلاح غير المصرح به.",
              },
              {
                en: "Water ingress beyond the rated IP class of the product.",
                ar: "دخول الماء بما يتجاوز فئة IP المُقيَّمة للمنتج.",
              },
              {
                en: "Damage from lightning, power surges, or extreme environmental conditions.",
                ar: "الأضرار الناجمة عن الصواعق أو ارتفاع الجهد أو الظروف البيئية القاسية.",
              },
              {
                en: "Cosmetic wear arising from normal use — scratches, fading, or finish wear.",
                ar: "التآكل التجميلي الناتج عن الاستخدام العادي — الخدوش أو البهتان أو تآكل الطلاء.",
              },
              {
                en: "Issues caused by third-party hardware, software, or network conditions outside DESi Türkiye's control.",
                ar: "المشكلات الناجمة عن أجهزة أو برامج أو ظروف شبكة تابعة لجهات خارجية.",
              },
              {
                en: "Products with removed, altered, or illegible serial numbers.",
                ar: "المنتجات ذات الأرقام التسلسلية المُزالة أو المُعدَّلة أو غير المقروءة.",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-neutral-400 mt-0.5">·</span>
                <span>{t(item)}</span>
              </li>
            ))}
          </ul>
          <p className="text-neutral-600 text-sm">
            {t({
              en: "To raise a warranty claim, email support@utopicrx.com with your order number, a description of the fault, and photographs or video.",
              ar: "لتقديم مطالبة ضمان، أرسل بريدًا إلكترونيًا إلى support@utopicrx.com مع رقم طلبك ووصف العيب والصور أو الفيديو.",
            })}
          </p>
        </section>

        {/* Section 07 */}
        <section className="mb-10">
          <p className="text-[#E60012] font-bold text-xs uppercase tracking-widest mb-1">
            SECTION 07
          </p>
          <h2 className="text-xl font-bold mb-3">
            {t({
              en: "Damage discovered on delivery",
              ar: "الضرر المكتشف عند التسليم",
            })}
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            {t({
              en: "Please inspect the outer packaging at the moment of delivery. If the carton is visibly damaged, crushed, or shows signs of having been opened, either refuse the delivery or accept it with a written note to the courier recording the damage. Notify DESi Türkiye within 24 hours, attaching photographs of the carton and the product. Damage claims raised after acceptance without a courier note may not be honoured.",
              ar: "يرجى فحص العبوة الخارجية عند التسليم. إذا كان الكرتون تالفًا بشكل واضح، إما ارفض التسليم أو اقبله مع ملاحظة مكتوبة للشركة. أخطر ديسي تركيا خلال 24 ساعة.",
            })}
          </p>
        </section>

        {/* Section 08 */}
        <section className="mb-10">
          <p className="text-[#E60012] font-bold text-xs uppercase tracking-widest mb-1">
            SECTION 08
          </p>
          <h2 className="text-xl font-bold mb-3">
            {t({
              en: "Refund method and timing",
              ar: "طريقة الاسترداد وتوقيته",
            })}
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            {t({
              en: "Refunds are issued to the original payment method. Card refunds typically appear within 7 to 14 working days of approval, depending on your issuing bank. Bank transfers are issued within 5 working days. Cash-on-delivery orders are refunded by bank transfer to an account in the customer's name. DESi Türkiye does not issue refunds in cash.",
              ar: "تُصدر المبالغ المستردة بنفس طريقة الدفع الأصلية. تستغرق استردادات البطاقات عادةً 7 إلى 14 يوم عمل. لا تُصدر ديسي تركيا مبالغ مستردة نقدًا.",
            })}
          </p>
        </section>

        {/* Section 09 */}
        <section className="mb-10">
          <p className="text-[#E60012] font-bold text-xs uppercase tracking-widest mb-1">
            SECTION 09
          </p>
          <h2 className="text-xl font-bold mb-3">
            {t({ en: "Contact", ar: "اتصل بنا" })}
          </h2>
          <div className="text-neutral-600 text-sm space-y-1">
            <p>
              <span className="font-semibold text-neutral-800">
                {t({ en: "Email", ar: "البريد الإلكتروني" })}
              </span>{" "}
              &nbsp;{" "}
              <a
                href="mailto:support@utopicrx.com"
                className="text-[#E60012] hover:underline"
              >
                support@utopicrx.com
              </a>
            </p>
            <p>
              <span className="font-semibold text-neutral-800">
                {t({ en: "Phone", ar: "الهاتف" })}
              </span>{" "}
              &nbsp;{" "}
              <a href="tel:+971526187729" className="hover:underline">
                +971526187729
              </a>
            </p>
            <p>
              <span className="font-semibold text-neutral-800">
                {t({ en: "Hours", ar: "ساعات العمل" })}
              </span>{" "}
              &nbsp;{" "}
              {t({
                en: "Monday to Saturday, 09:00 – 18:00",
                ar: "الاثنين إلى السبت، 09:00 – 18:00",
              })}
            </p>
          </div>
        </section>

        <p className="text-neutral-400 text-xs leading-relaxed mb-8">
          {t({
            en: "DESi Türkiye reserves the right to amend this policy at any time. The version in force at the time of your purchase is the version that applies to your order. This document is provided in English; in the event of a dispute, the Arabic version (where issued) shall prevail in accordance with UAE law.",
            ar: "تحتفظ ديسي تركيا بالحق في تعديل هذه السياسة في أي وقت. النسخة العربية (حيثما صدرت) هي السائدة عند النزاع وفقًا لقانون الإمارات.",
          })}
        </p>

        <div className="border-t border-neutral-200 pt-6 text-center text-neutral-400 text-xs">
          © DESi Türkiye &nbsp;·&nbsp; utopicrx.com &nbsp;·&nbsp;{" "}
          {t({ en: "Returns & Warranty v1.9", ar: "الإرجاع والضمان v1.9" })}
        </div>
      </main>
    </>
  );
};

export default ReturnsWarranty;
