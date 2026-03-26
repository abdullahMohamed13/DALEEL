import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import AppFeaturesCard from "./comps/AppFeaturesCard";

// carousel-items images
import ServicesScreen from '@/assets/about/services.png'
import InteractionsScreen from '@/assets/about/reacting.png'
import NotificationsScreen from '@/assets/about/real-time-changes.png'
import ChatBotScreen from '@/assets/about/chatbot.png'
import NewServiceScreen from '@/assets/about/new-service.png'
import HomeScreen from '@/assets/about/home-screen.png'

interface CarouselItem {
    id: number,
    text: {
        header: string,
        body: string,
    },
    img: string;
}

export default function AppFeaturesShowcase() {
    const carouselItems: CarouselItem[] = [
        {
            id: 0,
            text: {
                header: 'الأوراق الحكومية المطلوبة',
                body: `تعرف بسهولة على جميع الوثائق والإجراءات اللازمة
لإنهاء معاملاتك.`
            },
            img: ServicesScreen,
        },
        {
            id: 1,
            text: {
                header: 'مساعد دليل الذكي',
                body: `شات بوت ذكي يجاوبك فوراً على أي سؤال عن المعاملات
والأوراق المطلوبة ويوجهك خطوة بخطوة.`
            },
            img: ChatBotScreen
        },
        {
            id: 2,
            text: {
                header: 'شارك خدمة جديدة',
                body: `زرت مصلحة حكومية؟ أضف تجربتك وشارك الأوراق المطلوبة
مع المجتمع ليستفيد الجميع.`
            },
            img: NewServiceScreen
        },
        {
            id: 3,
            text: {
                header: 'التفاعل مع المشاوير',
                body: `علّق، قيّم، وتابع المشاوير المشتركة لتحصل على أقصى
استفادة.`
            },
            img: InteractionsScreen
        },
        {
            id: 4,
            text: {
                header: 'شاشة رئيسية مريحة',
                body: `واجهة رئيسية بسيطة وواضحة ترشدك لكل أقسام التطبيق
وتوصلك لما تحتاجه بضغطة واحدة.`
            },
            img: HomeScreen
        },
        {
            id: 5,
            text: {
                header: 'تحديثات في الوقت الفعلي',
                body: `ابق على اطلاع بآخر التحديثات المرورية وحالة الطرق
من خلال مجتمعنا التفاعلي.`
            },
            img: NotificationsScreen
        },
    ]

    return <section className="bg-[#FAFAFA] px-4 md:px-8 py-12 md:py-20 w-full" id="about">

        <Carousel opts={{ align: "start", direction: "rtl" }} className="w-full overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-6 md:gap-0">
                <div className="text-center md:text-right">
                    <h3 className="text-2xl md:text-3xl mb-2 font-bold">جولة داخل التطبيق</h3>
                    <p className="text-sm md:text-base text-muted-foreground px-4 md:px-0">واجهة مستخدم بسيطة وسهلة، مصممة لتحربة استخدام مريحة وسريعة، تغطي جميع احتياجاتك.</p>
                </div>

                <div className="flex gap-3">
                    <CarouselPrevious className="relative rotate-180 z-10 inset-0 translate-y-0 translate-x-0" />
                    <CarouselNext className="relative rotate-180 z-10 inset-0 translate-y-0 translate-x-0" />
                </div>
            </div>
            <CarouselContent className="mt-20">
                {
                    carouselItems.map((item) => {
                        return <CarouselItem key={item.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <AppFeaturesCard
                                img={item.img}
                                text={{ header: item.text.header, body: item.text.body }}
                            />
                        </CarouselItem>
                    })
                }
            </CarouselContent>

        </Carousel>
    </section>
}