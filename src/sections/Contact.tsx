import { Button } from "@/components/ui/button";
import { appDownload } from "@/utils/appDownload";
import { Download } from "lucide-react";

export default function Contact() {
    return <section className="" id="contact">
        <div className="mt-30 gap-8 items-center flex justify-between bg-primary/5 border border-primary/20 rounded-3xl py-15 px-10">
            <div>
                <h3 className="text-xl font-bold">جاهز لتسهيل حياتك؟</h3>
            <p className="text-muted">حمل تطبيق دليل الآن وابدأ رحلة بلا متاعب، كل شيء
تحتاجه في مكان واحد.</p>
            </div>
            <div className="flex gap-3 items-center">
                <Button onClick={appDownload}>
                    <span>تحميل التطبيق</span>
                    <Download />
                </Button>
                <Button variant='ghost'>
                    <a href="/support">
                        تواصل معنا
                    </a>
                </Button>
            </div>
        </div>
    </section>
}