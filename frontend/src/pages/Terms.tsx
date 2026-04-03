import { motion } from "framer-motion";

export default function Terms() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl"
    >
      <motion.div
        className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl shadow-primary/5 border border-primary/10 relative overflow-hidden"
      >
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">الشروط والأحكام</h1>

        <div className="space-y-6 md:space-y-8 text-muted-foreground leading-relaxed relative z-10 text-sm md:text-base">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">قبول الشروط</h2>
            <p>
              باستخدامك لتطبيق وموقع "دليل"، فإنك توافق بالكامل على هذه الشروط والأحكام. إذا لم تكن توافق لأي سبب، يُرجى التوقف عن استخدام الخدمات فوراً.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">إخلاء المسؤولية للمستندات</h2>
            <p>
              نبذل قصارى جهدنا لتوفير قوائم محدثة ودقيقة بجميع المستندات المطلوبة للمعاملات الحكومية لتجنب المشاوير الزائدة. ومع ذلك، قد تتغير المتطلبات من قِبل الجهات الرسمية دون إشعار مسبق. "دليل" لا يتحمل مسؤولية أي نقص في الأوراق أو رفض المعاملات، وننصح دائماً بالتحقق من المصادر الرسمية.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">سلوك المجتمع التفاعلي</h2>
            <p>
              نهدف لإنشاء مجتمع تفاعلي يتيح مشاركة حالة الطرق وتجارب المراجعين. يجب على جميع المستخدمين الالتزام بآداب الحوار وعدم نشر معلومات مضللة، سب، أو التعدي على خصوصية أفراد آخرين أو مؤسسات. يحق لإدارة "دليل" تعليق أي حساب يخالف هذه المعايير.
            </p>
          </motion.section>
        </div>
      </motion.div>
    </motion.div>
  );
}
