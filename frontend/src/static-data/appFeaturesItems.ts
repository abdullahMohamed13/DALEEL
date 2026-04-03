// carousel-items images
import ServicesScreen from '@/assets/app-features-showcase/services.png'
import InteractionsScreen from '@/assets/app-features-showcase/reacting.png'
import NotificationsScreen from '@/assets/app-features-showcase/real-time-changes.png'
import ChatBotScreen from '@/assets/app-features-showcase/chatbot.png'
import NewServiceScreen from '@/assets/app-features-showcase/new-service.png'
import HomeScreen from '@/assets/app-features-showcase/home-screen.png'

interface CarouselItemsInterface {
    id: number,
    text: {
        header: string,
        body: string,
    },
    img: string;
}

export const appFeatureCarouselItems: CarouselItemsInterface[] = [
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