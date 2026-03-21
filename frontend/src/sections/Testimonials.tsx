import TestimonialCard from "./comps/TestimonialCard";
import Sara from '@/assets/testimonials/sara.png'
import Khaled from '@/assets/testimonials/mohamed.png'
import Abdelaziz from '@/assets/testimonials/abdelaziz.jpeg'

export default function Testimonials() {
    return <section className="px-4 md:px-0">
        <h3 className="text-2xl md:text-3xl font-bold text-center md:text-right">ماذا يقول مستخدمو <span className="text-primary">دليل</span>؟</h3>
        <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
            <TestimonialCard
                img={Abdelaziz}
                name="عبدالعزيز عمر"
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