import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 md:px-6 py-8 md:py-12 mt-4 md:mt-8 max-w-4xl"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_25px_50px_-12px_hsl(var(--primary)_/_0.1)] border border-[#0000000D]"
      >
        <div className="badge mb-6 inline-block">تحديث: مارس 2026</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">سياسة الخصوصية</h1>

        <div className="space-y-6 md:space-y-8 text-muted-foreground leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">1. جمع المعلومات</h2>
            <p>
              في تطبيق "دليل"، نولي أهمية قصوى لخصوصيتك. نقوم بجمع معلوماتك الأساسية (مثل الاسم ورقم الهاتف) لتقديم خدمة شخصية، بالإضافة إلى بيانات الموقع الجغرافي (أثناء استخدام التطبيق فقط) لتوجيهك بدقة لأهم المواقع الحكومية والخدمية. 
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">2. استخدام البيانات</h2>
            <p>
              نستخدم بياناتك لتجربة خالية من المتاعب، مثل:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 mr-4">
              <li>تخصيص قائمة المستندات الحكومية المطلوبة لك.</li>
              <li>تحسين دقة الخرائط وتوجيهك لأفضل الطرق والمواقف.</li>
              <li>تعزيز المجتمع التفاعلي والسماح بمشاركة تجارب الرحلات المعاملات بأمان.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">3. حماية بياناتك ومستنداتك</h2>
            <p>
              نحن لا نشارك أو نبيع أوراقك الحكومية أو بياناتك الشخصية لأي طرف ثالث. جميع البيانات مشفرة وتُستخدم فقط داخل التطبيق لتحسين خدمتك وتسهيل وصولك للخدمات الحكومية.
            </p>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
