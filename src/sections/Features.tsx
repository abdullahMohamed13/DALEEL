import FeaturesCard from "./comps/FeaturesCard";
import DocumentIcon from '@/assets/icons/features/document.svg'
import LocationIcon from '@/assets/icons/features/location.svg'
import GroupIcon from '@/assets/icons/features/group.svg'

export default function Features() {
    return <section className="flex-col items-center" id="features">
        <div className="badge">
            مميزات التطبيق
        </div>
        <h2 className="text-3xl mt-5 font-bold">لماذا تختار <span className="badge">دليل</span>{` `}؟</h2>
        <p className="mt-7 text-muted">صمننا التطبيق ليحل مشاكلك اليومية، من معرفة الأوراق المطلوبة وحتى الوصول لأماكنها بدقة.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
            <FeaturesCard
                icon={DocumentIcon}
                header="أوراقك الحكومية، واضحة"
                body="قائمة شاملة ومحدثة بجميع المستندات المطلوبة للمعاملات الحكومية لتجنب التعب والمشاوير الزائدة والانتظار الطويل."
            />
            <FeaturesCard
                icon={LocationIcon}
                header="اوصل لوجهتك بدقة"
                body="خرائط دقيقة ومحدثة لأهم المواقع الحكومية والخدمية، مع توجيه دقيق للمداخل والمواقف لتصل إلى وجهتك بأسرع وقت."
            />
            <FeaturesCard
                icon={GroupIcon}
                header="تفاعل وشارك رحلتك"
                body="مجتمع تفاعلي يتيح لك مشاركة تفاصيل رحلاتك، حالة الطرق، والاستفادة من تجارب ونصائح الاخرين في الوقت الفعلي."
            />
        </div>
    </section>
}