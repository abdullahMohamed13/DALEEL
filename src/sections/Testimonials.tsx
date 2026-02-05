import TestimonialCard from "./comps/TestimonialCard";
import Sara from '@/assets/icons/testimonials/sara.png'
import Khaled from '@/assets/icons/testimonials/mohamed.png'
import Ahmed from '@/assets/icons/testimonials/ahmed.png'

export default function Testimonials() {
    return <section>
        <h3 className="text-3xl font-bold">ماذا يقول مستخدمو <span className="text-primary">دليل</span> {` `}؟</h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <TestimonialCard
                img={Ahmed}
                name="احمد محمد"
                review="' تطبيق رائع جدا! وفر علي الكثير من الوقت في معرفة الأوراق المطلوبة لتجديد الرخصة. أنصح الجميع بتحميله. '"
                rating={5}
                />
            <TestimonialCard
                img={Sara}
                name="سارة علي"
                review="' الخرائط دقيقة جدا وتفاعلية. ساعدني في الوصول لموقع الجوازات الجديد بسهولة تامة.'"
                rating={4}
            />
            <TestimonialCard
                img={Khaled}
                name="خالد العمر"
                review="' فكرة مشاركة الرحلات ممتازة. تجعل الطريق امتع وتفيدنا في معرفة حالة الزحام.'"
                rating={4}
            />
        </div>

    </section>
}