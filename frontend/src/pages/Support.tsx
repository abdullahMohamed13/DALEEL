import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Support() {
  const emailJsConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };

  const [form, setForm] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: form.name.trim() ? "" : "الاسم مطلوب",
      email: !form.email.trim()
        ? "البريد الإلكتروني مطلوب"
        : !isValidEmail(form.email)
          ? "أدخل بريدًا إلكترونيًا صحيحًا"
          : "",
      message: form.message.trim() ? "" : "الرسالة مطلوبة",
    };

    if (Object.values(newErrors).some(Boolean)) {
      toast.error(Object.values(newErrors).find(Boolean) ?? "تحقق من الحقول المطلوبة");
      return;
    }

    if (Object.values(emailJsConfig).some((value) => !value)) {
      toast.error("إعدادات إرسال البريد غير مكتملة");
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        e.currentTarget,
        emailJsConfig.publicKey,
      );

      setSubmitted(true);
      setForm({ email: "", name: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
      toast.success("تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا");
    } catch {
      toast.error("فشل إرسال الرسالة، يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12"
    >
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">الدعم الفني</h1>
        <p className="px-2 text-base text-muted-foreground md:px-0 md:text-lg">
          فريقنا متواجد دائمًا لمساعدتك في أي استفسار أو مشكلة تواجهك داخل تطبيق دليل.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
          className="col-span-1 flex flex-col gap-6 rounded-3xl border border-[#0000000D] bg-white p-6 shadow-xl md:p-8"
        >
          <div className="flex items-center gap-4 text-foreground">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold">راسلنا</p>
              <a
                href="mailto:daleel.support.csi@gmail.com"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                daleel.support.csi@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-foreground">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold">اتصل بنا</p>
              <a
                href="tel:+201010434465"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                +201010434465
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-foreground">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold">المقر الرئيسي</p>
              <a
                href="https://maps.app.goo.gl/eLWPC9chaG3YCrCf7"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                مصر، الجيزة، مدينة السادس من أكتوبر
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          className="col-span-1 rounded-3xl border border-[#0000000D] bg-white p-6 shadow-xl md:col-span-2 md:p-8 lg:p-12"
        >
          <h2 className="mb-6 text-xl font-bold md:mb-8 md:text-2xl">أرسل رسالة</h2>
          <form className="flex flex-col gap-4 md:gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="الاسم الكامل"
                className="w-full rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="البريد الإلكتروني"
                className="w-full rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <textarea
              placeholder="كيف يمكننا مساعدتك؟"
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            <button
              type="submit"
              disabled={submitted || loading}
              className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-[1.01] hover:bg-primary/80 hover:shadow-primary/50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <RefreshCw className="mx-auto size-5 animate-spin" />
              ) : submitted ? (
                "تم إرسال الرسالة بنجاح!"
              ) : (
                "إرسال الرسالة"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
