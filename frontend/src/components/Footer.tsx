import LinkedinIcon from '@/assets/icons/linkedin.png'
import { Link } from 'react-router-dom'

export default function Footer() {
    return <footer className="mt-10 md:mt-20 pb-6 px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-right text-muted-foreground gap-10">

        <div className='flex flex-col gap-4 items-center md:items-start'>
            <Link to="/" className="cursor-default flex gap-3 items-center justify-center md:justify-start hover:opacity-90 duration-300 transition-opacity">
                <div className="flex flex-col text-secondary">
                    <p className="font-bold text-xl">دليل</p>
                    <p className="text-sm">Daleel</p>
                </div>
                <img src="/main-logo.svg" alt="" className="w-10 h-10 md:w-auto md:h-auto" />
            </Link>

            <div>
                رفيقك الذكي في المعاملات والرحلات.
                <br />
                جميع الحقوق محفوظة
                2026
            </div>
        </div>
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 *:cursor-pointer *:hover:text-primary transition-colors">
            <li>
                <Link to="/privacy-policy" className="hover:underline">سياسة الخصوصية</Link>
            </li>
            <li>
                <Link to="/terms" className="hover:underline">الشروط والأحكام</Link>
            </li>
            <li>
                <Link to="/faq" className="hover:underline">الأسئلة الشائعة</Link>
            </li>
            <li>
                <Link to="/support" className="hover:underline">الدعم الفني</Link>
            </li>
        </ul>
        <div className='flex items-center gap-3 *:border-[#0000000D] *:border *:bg-[#F9FAFB] *:rounded-full *:p-3 *:cursor-pointer hover:*:bg-gray-100 transition-colors'>
            <a href='https://www.linkedin.com/company/daleel-eg-csi'>
                <img src={LinkedinIcon} alt="Linkedin icon" />
            </a>
        </div>
    </footer>
}
