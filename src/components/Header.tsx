import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import { appDownload } from "@/utils/appDownload";

export default function Header() {
    const location = useLocation();

    // If not on home page, link back to home with hash, else just use hash
    const getHref = (hash: string) => {
        return location.pathname === '/' ? hash : `/${hash}`;
    };

    return <header className="flex items-center justify-around pb-3">
        <Link to="/" className="flex gap-3 items-center hover:opacity-80 transition-opacity">
            <div className="flex flex-col text-secondary">
                <p className="font-bold text-xl">دليل</p>
                <p className="text-sm">Daleel</p>
            </div>
            <img src="/main-logo.svg" alt="" />
        </Link>

        <ul className="flex gap-6 items-center">
            <li>
                <a href={getHref("#hero")} className="hover:text-primary transition-colors">
                    الرئيسية
                </a>
            </li>
            <li>
                <a href={getHref("#features")} className="hover:text-primary transition-colors">
                    المميزات
                </a>
            </li>
            <li>
                <a href={getHref("#about")} className="hover:text-primary transition-colors">
                    عن التطبيق
                </a>
            </li>
            <li>
                <a href="/support" className="hover:text-primary transition-colors">
                    تواصل معنا
                </a>
            </li>
        </ul>

        <Button className="font-bold" onClick={appDownload}>
            تحميل التطبيق
            <Download />
        </Button>
    </header>
}