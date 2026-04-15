import { Button } from "@/components/ui/button";
import { appDownload } from "@/utils/appDownload";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section id="contact">
      <div className="mt-20 flex flex-col items-center justify-between gap-6 rounded-3xl border border-primary/20 bg-primary/5 px-6 py-10 text-center md:mt-30 md:flex-row md:gap-8 md:px-10 md:py-15 md:text-right">
        <div>
          <h3 className="text-lg font-bold md:text-xl">جاهز لتسهيل حياتك؟</h3>
          <p className="mt-2 text-sm text-muted md:mt-0 md:text-base">
            حمل تطبيق دليل الآن وابدأ رحلة بلا متاعب، كل شيء تحتاجه في مكان واحد.
          </p>
        </div>

        <div className="mt-6 flex w-full flex-col items-center gap-3 sm:flex-row md:mt-0 md:w-auto">
          <Button onClick={appDownload} className="w-full sm:w-auto" size="lg">
            <span className="text-lg">تحميل التطبيق</span>
            <Download className="mr-2" />
          </Button>

          <Button variant="outline" className="w-full sm:w-auto" size="lg" asChild>
            <Link to="/support" className="w-full text-center text-lg">
              تواصل معنا
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
