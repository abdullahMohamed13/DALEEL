import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from '@emailjs/browser';
import { useState } from "react";
import { toast } from "sonner";
import { RefreshCw } from 'lucide-react';

export default function Support() {

  const [form, setForm] = useState({
    email: '',
    name: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const isValidGmail = (email: string) => {
    return /@gmail\.com$/i.test(email.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: form.name.trim() ? '' : 'الاسم مطلوب',
      email: !form.email.trim() ? 'البريد الإلكتروني مطلوب' : !isValidGmail(form.email) ? 'أدخل بريد إلكتروني صحيح' : '',
      message: form.message.trim() ? '' : 'الرسالة مطلوبة',
    };

    if (Object.values(newErrors).some(Boolean)) {
      const firstError = Object.values(newErrors).find(Boolean);
      toast.error(firstError);
      return;
    }    

    // start the spinner to tell the user it's processing
    setLoading(true);
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      e.currentTarget,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )

    .then(() => {
        setSubmitted(true);
        // Empty all fields
        setForm({ email: '', name: '', message: '' });
        // Stop the spinner
        setLoading(false);
        setTimeout(() => setSubmitted(false), 5000);
        toast.success('تم إرسال رسالتك بنجاح، سنتواصل معك قريباً');
    }, () => {
        setLoading(false);
        toast.error('فشل إرسال الرسالة، يرجى المحاولة مرة أخرى');
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-6 py-12 mt-8 max-w-5xl"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">الدعم الفني</h1>
        <p className="text-muted-foreground text-lg">
          فريقنا متواجد دائماً لمساعدتك في أي استفسار أو مشكلة تواجهك داخل تطبيق دليل.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
          className="col-span-1 border border-[#0000000D] bg-white rounded-3xl p-8 flex flex-col gap-6 shadow-xl shadow-primary/5"
        >
          <div className="flex items-center gap-4 text-foreground">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold">راسلنا</p>
              <a href="mailto:daleel.support.csi@gmail.com" className="hover:text-primary text-muted-foreground text-sm">
                daleel.support.csi@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 text-foreground">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold">اتصل بنا</p>
              <a href="tel:+201010434465" className="hover:text-primary text-muted-foreground text-sm">
                ٢٠١٠١٠٤٣٤٤٦٥+
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 text-foreground">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold">المقر الرئيسي</p>
              <a href="https://maps.app.goo.gl/eLWPC9chaG3YCrCf7" className="hover:text-primary text-muted-foreground text-sm">
                مصر، الجيزة، مدينة السادس من اكتوبر
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          className="col-span-1 md:col-span-2 border border-[#0000000D] bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5"
        >
          <h2 className="text-2xl font-bold mb-8">أرسل رسالة</h2>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="الاسم الكامل" 
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="البريد الإلكتروني" 
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
              />
            </div>
            <textarea 
              placeholder="كيف يمكننا مساعدتك؟" 
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none font-sans"
            />

            {/* Submitting button */}
            <button disabled={submitted || loading} className="bg-primary text-white w-full py-4 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-primary/80 hover:scale-101 hover:shadow-primary/50 transition-all">
              {loading 
                ? <RefreshCw className="animate-spin mx-auto size-5" />
                : submitted ? 'تم إرسال الرسالة بنجاح!' : 'إرسال الرسالة'
              }
            </button>

          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
