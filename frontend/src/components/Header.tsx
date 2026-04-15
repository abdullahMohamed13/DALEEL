import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { Download, Menu } from "lucide-react";
import { appDownload } from "@/utils/appDownload";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

function HeaderNavLinks({
  getHref,
  isMobile = false,
  onClick,
}: {
  getHref: (hash: string) => string;
  isMobile?: boolean;
  onClick?: () => void;
}) {
  const linkClass = `hover:text-primary transition-colors block w-full ${
    isMobile ? "border-b border-gray-100 py-4 text-lg font-semibold" : ""
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
}

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const getHref = (hash: string) => {
    return location.pathname === "/" ? hash : `/${hash}`;
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur-md md:static md:justify-around md:border-none md:bg-transparent md:px-0 md:py-4 md:pb-0 md:backdrop-blur-none">
      <Link
        to="/"
        className="flex cursor-default items-center gap-3 transition-opacity duration-300 hover:opacity-90"
      >
        <div className="flex flex-col text-secondary">
          <p className="text-xl font-bold md:text-2xl">دليل</p>
          <p className="-mt-1 text-sm text-muted-foreground md:text-base">Daleel</p>
        </div>
        <img
          src="/main-logo.svg"
          alt="Daleel Logo"
          className="h-10 w-10 object-contain md:h-12 md:w-12"
        />
      </Link>

      <ul className="hidden items-center gap-8 text-lg md:flex">
        <HeaderNavLinks getHref={getHref} />
      </ul>

      <Button className="hidden font-bold md:flex" onClick={appDownload}>
        تحميل التطبيق
        <Download className="mr-2" />
      </Button>

      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-gray-200 text-secondary shadow-sm"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="flex w-[300px] flex-col p-6 pb-10 sm:w-[400px]">
            <div className="mb-8 mt-2 flex items-center gap-3 border-b border-gray-100 pb-6">
              <img src="/main-logo.svg" alt="Daleel Logo" className="h-10 w-10 object-contain" />
              <div className="flex flex-col text-secondary">
                <p className="text-2xl font-bold">دليل</p>
                <p className="-mt-1 text-sm text-muted-foreground">Daleel</p>
              </div>
            </div>

            <nav className="flex flex-1 flex-col">
              <ul className="flex w-full flex-col text-right">
                <HeaderNavLinks
                  getHref={getHref}
                  isMobile
                  onClick={() => setIsOpen(false)}
                />
              </ul>

              <div className="mt-auto pt-6">
                <Button
                  className="h-14 w-full rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                  onClick={() => {
                    setIsOpen(false);
                    appDownload();
                  }}
                >
                  تحميل التطبيق
                  <Download className="mr-2 h-5 w-5 text-white" />
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
