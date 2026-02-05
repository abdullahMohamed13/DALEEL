import LineObject from '@/assets/lines.svg'
import LeftContainer from '@/assets/container.svg'
import TripsCard from '@/assets/trips-card.svg'
import Andriod from '@/assets/icons/andriod.svg'
import Phone from '@/assets/icons/phone.svg'
import Sara from '@/assets/icons/testimonials/sara.png'
import Khaled from '@/assets/icons/testimonials/mohamed.png'
import Ahmed from '@/assets/icons/testimonials/ahmed.png'

export default function Hero() {
    return <section id="hero" className="min-h-screen" style={{
                flexDirection: 'row', 
                gap: 10,
                boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.25)'
            }}>
        <div className='flex flex-col gap-4'>
            <h2 className="font-bold text-5xl">
                دليلك الشامل <br /><span className="text-primary">لمشاويرك الحكومية</span>
            </h2>
            <img src={LineObject} />
            
            <div>
                <p>كل ما تحتاجه لإنجاز معاملاتك الحكومية بسهولة، والوصول إلى جهتك بدقة عالية، ومشاركة كل التفاصيل مع مجتمع تفاعلي في تطبيق واحد.</p>
            
                {/* Downloading buttons */}
                <div className='flex gap-2 mt-6 items-center'>
                    <button className='shadow-xl bg-black text-white flex items-center gap-4 rounded-full px-7 py-1'>
                        <img src={Phone} alt="" />
                        <div>
                            <span className='text-sm'>
                                حمله من
                            </span>
                            <br />
                            <span>App Store</span>
                        </div>
                    </button>

                    <button className='shadow-xl bg-white flex items-center gap-4 rounded-full px-7 py-1'>
                        <div>
                            <img src={Andriod} />
                        </div>
                        <div>
                            <span className='text-sm'>
                                حمله من
                            </span>
                            <br />
                            <span className='font-bold'>Google Play</span>
                        </div>
                    </button>
                </div>

                <div className='flex gap-5 mt-5 items-center'>
                    <div className='flex'>
                        <img src={Sara} alt="" className='-ml-4' />
                        <img src={Ahmed} alt="" className='-ml-4' />
                        <img src={Khaled} alt="" className='-ml-4' />
                    </div>
                    <p className='text-muted-foreground'>اكثر من 300+ ألف مستخدم يثقون بنا.</p>
                </div>
            </div>
        </div>
        <div>
            <div className='relative'>
                <img src={LeftContainer} alt="" />
                <img src={TripsCard} className='absolute -left-5 -top-10' alt="" />
            </div>
        </div>
    </section>
}