import { Button } from "@/components/ui/button";
import { appDownload } from "@/utils/appDownload";
import { Download } from "lucide-react";

export default function CallToAction() {
    return <section id="contact">
        <div className="mt-20 md:mt-30 gap-6 md:gap-8 items-center flex flex-col md:flex-row justify-between text-center md:text-right bg-primary/5 border border-primary/20 rounded-3xl py-10 md:py-15 px-6 md:px-10">
            <div>
                <h3 className="text-lg md:text-xl font-bold">جاهز لتسهيل حياتك؟</h3>
            <p className="text-sm md:text-base text-muted mt-2 md:mt-0">حمل تطبيق دليل الآن وابدأ رحلة بلا متاعب، كل شيء
تحتاجه في مكان واحد.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto mt-6 md:mt-0">
                <Button onClick={appDownload} className="w-full sm:w-auto" size={'lg'}>
                    <span className="text-lg">تحميل التطبيق</span>
                    <Download className="mr-2" />
                </Button>
                <Button variant='outline' className="w-full sm:w-auto" size={'lg'}>
                    <a href="/support" className="w-full text-center text-lg">
                        تواصل معنا
                    </a>
                </Button>
            </div>
        </div>
    </section>
}
