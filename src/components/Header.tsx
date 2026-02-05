import { Button } from "./ui/button";

export default function Header() {
    return <header className="flex items-center justify-around border-b-[#0000000D] border-b-2 pb-3">
        <div className="flex gap-3 items-center">
            <div className="flex flex-col text-secondary">
                <p className="font-bold text-xl">دليل</p>
                <p className="text-sm">Daleel</p>
            </div>
            <img src="/logo.png" alt="" />
        </div>
            
        <ul className="flex gap-6 items-center">
            <li>
                <a href="#hero">
                    الرئيسية
                </a>
            </li>
            <li>
                <a href="#features">
                    المميزات
                </a>
            </li>
            <li>
                <a href="#about">
                    عن التطبيق
                </a>
            </li>
            <li>
                <a href="#contact">
                    تواصل معنا
                </a>
            </li>
        </ul>

        <Button>
            تحميل التطبيق
        </Button>
    </header>
}