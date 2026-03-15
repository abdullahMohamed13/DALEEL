import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import AboutCard from "./comps/AboutCard";
import ServiceImg from '@/assets/about/service1.png'
import InteractionsImg from '@/assets/about/interaction.png'
import NotificationsImg from '@/assets/about/notifications.png'
interface CarouselItem {
    id: number,
    text: {
        header: string,
        body: string,
    },
    img: string;
}

export default function About() {
    const carouselItems: CarouselItem[] = [
        {
            id: 0,
            text: {
                header: 'الأوراق الحكومية المطلوبة',
                body: `تعرف بسهولة على جميع الوثائق والإجراءات اللازمة
لإنهاء معاملاتك.`
            },
            img: ServiceImg,
        },
        {
            id: 1,
            text: {
                header: 'تفاصيل الجهات الحكومية',
                body: `ابحث عن مواقع وأوقات عمل وبيانات الاتصال لكل
مصلحة حكومية.`
            },
            img: InteractionsImg
        },
        {
            id: 2,
            text: {
                header: 'مشاركة المشاوير',
                body: `شارك رحلاتك وتواصل مع مستخدمين آخرين لتوفير الوقت
والجهد.`
            },
            img: NotificationsImg
        },
        {
            id: 3,
            text: {
                header: 'التفاعل مع المشاوير',
                body: `علّق، قيّم، وتابع المشاوير المشتركة لتحصل على أقصى
استفادة.`
            },
            img: InteractionsImg
        },
        {
            id: 4,
            text: {
                header: 'توجيه دقيق للمكان',
                body: `احصل على توجيه دقيق للمداخل والمواقف والأماكن المزدحمة
لتصل بسرعة وسهولة.`
            },
            img: ServiceImg
        },
        {
            id: 5,
            text: {
                header: 'تحديثات في الوقت الفعلي',
                body: `ابق على اطلاع بآخر التحديثات المرورية وحالة الطرق
من خلال مجتمعنا التفاعلي.`
            },
            img: NotificationsImg
        },
    ]

    return <section className="bg-[#FAFAFA] px-8 py-20 w-full" id="about">

        <Carousel opts={{ align: "start", direction: "rtl" }} className="w-full overflow-hidden">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-3xl mb-2 font-bold">جولة داخل التطبيق</h3>
                    <p>واجهة مستخدم بسيطة وسهلة، مصممة لتحربة استخدام مريحة وسريعة، تغطي جميع احتياجاتك.</p>
                </div>

                <div className="flex gap-3">
                    <CarouselNext className="relative z-1000 inset-0 translate-y-0 translate-x-0" />
                    <CarouselPrevious className="relative z-1000 inset-0 translate-y-0 translate-x-0" />
                </div>
            </div>
            <CarouselContent className="mt-20">
                {
                    carouselItems.map((item) => {
                        return <CarouselItem key={item.id} className="basis-1/4">
                            <div className="flex items-center flex-col">
                                <AboutCard img={item.img}/>
                                {/* <img src={item.img} alt="Carousel Image" /> */}
                                <div className="text-center mt-4">
                                    <p className="font-bold text-md">{item.text.header}</p>
                                    <span className="text-sm">{item.text.body}</span>
                                </div>
                            </div>
                        </CarouselItem>
                    })
                }
            </CarouselContent>

        </Carousel>
    </section>
}