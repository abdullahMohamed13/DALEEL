import FeaturesCard from "./comps/FeaturesCard";
import {FileText} from 'lucide-react'
import { MdOutlineGroups, MdOutlineLocationOn } from "react-icons/md";

export default function Features() {
    const iconSize = 40;
    return <section className="flex flex-col items-center text-center md:text-right" id="features">
        <div className="badge">
            مميزات التطبيق
        </div>
        <h2 className="text-2xl md:text-3xl mt-4 md:mt-5 font-bold">لماذا تختار <span className="badge">دليل</span>{` `}؟</h2>
        <p className="mt-4 md:mt-7 text-sm md:text-base text-muted max-w-2xl px-2 md:px-0">صمننا التطبيق ليحل مشاكلك اليومية، من معرفة الأوراق المطلوبة وحتى الوصول لأماكنها بدقة.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-10 md:mt-20">
            <FeaturesCard
                icon={<FileText size={iconSize} />}
                header="أوراقك الحكومية.. واضحة"
                body="قائمة شاملة ومحدثة بجميع المستندات المطلوبة للمعاملات الحكومية لتجنب التعب والمشاوير الزائدة والانتظار الطويل."
            />
            <FeaturesCard
                icon={<MdOutlineLocationOn size={iconSize} />}
                header="اوصل لوجهتك بدقة"
                body="خرائط دقيقة ومحدثة لأهم المواقع الحكومية والخدمية، مع توجيه دقيق للمداخل والمواقف لتصل إلى وجهتك بأسرع وقت."
            />
            <FeaturesCard
                icon={<MdOutlineGroups size={iconSize} />}
                header="تفاعل وشارك رحلتك"
                body="مجتمع تفاعلي يتيح لك مشاركة تفاصيل رحلاتك، حالة الطرق، والاستفادة من تجارب ونصائح الاخرين في الوقت الفعلي."
            />
        </div>
    </section>
}
