import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "هل يضمن التطبيق أن جميع الأوراق المطلوبة صحيحة 100٪؟",
      answer: "نبذل قصارى جهدنا لمراجعة المتطلبات باستمرار، ولكن المتطلبات الحكومية قد تتغير. لذلك نوصي دائماً بالتأكد من القنوات الرسمية قبل الذهاب للمعاملة."
    },
    {
      question: "هل يمكنني مشاركة تجربتي في مصلحة حكومية مع الآخرين؟",
      answer: "نعم! يمكنك من خلال قسم 'المجتمع التفاعلي' مشاركة تجربتك، حالة الطرق، ووقت الانتظار حتى يستفيد منها مستخدمون آخرون."
    },
    {
      question: "كيف يمكنني الوصول لأفضل موقف للسيارة بجوار المصلحة؟",
      answer: "في دليل، نوفر خرائط دقيقة لا ترشدك للمبنى فقط، بل توجهك لأقرب المواقف المتاحة والمداخل الرئيسية للمنشأة."
    },
    {
      question: "هل التطبيق مجاني؟",
      answer: "نعم، دليل مجاني للتحميل والاستخدام لتسهيل مشاويرك ومعاملاتك الحكومية."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 md:px-6 py-8 md:py-12 mt-4 md:mt-8 max-w-3xl"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">الأسئلة الشائعة</h1>
        <p className="text-muted-foreground text-base md:text-lg px-2 md:px-0">
          ابحث عن إجابات لاستفساراتك حول كيفية استخدام تطبيق دليل وتسهيل معاملاتك الحكومية.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="border border-[#0000000D] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-4 md:p-6 text-right font-bold focus:outline-none text-sm md:text-base"
            >
              <span>{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="text-muted-foreground" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 md:p-6 pt-0 text-muted-foreground leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
