import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { Download, Menu } from "lucide-react";
import { appDownload } from "@/utils/appDownload";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

export default function Header() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // If not on home page, link back to home with hash, else just use hash
    const getHref = (hash: string) => {
        return location.pathname === '/' ? hash : `/${hash}`;
    };

    const NavLinks = ({ isMobile, onClick }: { isMobile?: boolean, onClick?: () => void }) => {
        const linkClass = `hover:text-primary transition-colors block w-full ${isMobile ? 'py-4 text-lg font-semibold border-b border-gray-100' : ''
            }`;
        return (
            <>
                <li>
                    <a href={getHref("#hero")} className={linkClass} onClick={onClick}>
                        الرئيسية
                    </a>
                </li>
                <li>
                    <a href={getHref("#features")} className={linkClass} onClick={onClick}>
                        المميزات
                    </a>
                </li>
                <li>
                    <a href={getHref("#app-showcase")} className={linkClass} onClick={onClick}>
                        عن التطبيق
                    </a>
                </li>
                <li>
                    <Link to="/support" className={linkClass} onClick={onClick}>
                        تواصل معنا
                    </Link>
                </li>
            </>
        );
    };

    return (
        <header className="sticky md:static top-0 z-50 bg-white/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b md:border-none border-gray-100 flex items-center justify-between px-6 py-4 md:px-0 md:py-4 md:pb-0 md:justify-around">
            <Link to="/" className="cursor-default flex gap-3 items-center hover:opacity-90 duration-300 transition-opacity">
                <div className="flex flex-col text-secondary">
                    <p className="font-bold text-xl md:text-2xl">دليل</p>
                    <p className="text-sm md:text-base -mt-1 text-muted-foreground">Daleel</p>
                </div>
                <img src="/main-logo.svg" alt="Daleel Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-8 items-center text-lg">
                <NavLinks />
            </ul>

            {/* Desktop Button */}
            <Button className="hidden md:flex font-bold" onClick={appDownload}>
                تحميل التطبيق
                <Download className="mr-2" />
            </Button>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="text-secondary border-gray-200 shadow-sm w-10 h-10 rounded-full">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6 pb-10 flex flex-col">
                        <div className="flex items-center gap-3 mb-8 mt-2 border-b border-gray-100 pb-6">
                            <img src="/main-logo.svg" alt="Daleel Logo" className="w-10 h-10 object-contain" />
                            <div className="flex flex-col text-secondary">
                                <p className="font-bold text-2xl">دليل</p>
                                <p className="text-sm text-muted-foreground -mt-1">Daleel</p>
                            </div>
                        </div>

                        <nav className="flex flex-col flex-1">
                            <ul className="flex flex-col w-full text-right">
                                <NavLinks isMobile onClick={() => setIsOpen(false)} />
                            </ul>

                            <div className="mt-auto pt-6">
                                <Button className="font-bold w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20" onClick={() => {
                                    setIsOpen(false);
                                    appDownload();
                                }}>
                                    تحميل التطبيق
                                    <Download className="mr-2 w-5 h-5 text-white" />
                                </Button>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}