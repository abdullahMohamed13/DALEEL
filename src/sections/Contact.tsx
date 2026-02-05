import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Contact() {
    return <section className="" id="contact">
        <div className="mt-30 gap-8 items-center flex justify-between rounded-full py-15 px-10">
            <div>
                <h3 className="text-xl font-bold">جاهز لتسهيل حياتك؟</h3>
            <p className="text-muted">حمل تطبيق دليل الآن وابدأ رحلة بلا متاعب، كل شيء
تحتاجه في مكان واحد.</p>
            </div>
            <div className="flex gap-3 items-center">
                <Button>
                    <span>تحميل التطبيق</span>
                    <Download />
                </Button>
                <Button variant='ghost'>تواصل معنا</Button>
            </div>
        </div>
    </section>
}