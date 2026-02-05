import LinkedinIcon from '@/assets/icons/linkedin.svg'
import XIcon from '@/assets/icons/Xicon.svg'

export default function Footer() {
    return <footer className="mt-20 px-6 flex justify-between items-center text-muted-foreground gap-10">
        <div>
            رفيقك الذكي في المعاملات والرحلات.
            <br />
             جميع الحقوق محفوظة
            2026
        </div>
        <ul className="flex gap-4 *:cursor-pointer *:hover:underline">
            <li>سياسة الخصوصية</li>
            <li>الشروط والأحكام</li>
            <li>الأسئلة الشائعة</li>
            <li>الدعم الفني</li>
        </ul>
        <div className='flex items-center gap-3 *:border-[#0000000D] *:border *:bg-[#F9FAFB] *:rounded-full *:p-2 '>
            <div className=''>
                <img src={XIcon} alt="" />
            </div>
            <div>
                <img src={LinkedinIcon} alt="" />
            </div>
        </div>
    </footer>
}