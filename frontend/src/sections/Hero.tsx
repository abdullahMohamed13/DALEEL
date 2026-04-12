import React, { type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import LineObject from '@/assets/lines.svg'
import Sara from '@/assets/testimonials/sara.png'
import Khaled from '@/assets/testimonials/mohamed.png'
import Abdelaziz from '@/assets/testimonials/abdelaziz.jpeg'

// Dynamic Floating Elements
import {FileText} from 'lucide-react'
import { MdOutlineGroups, MdOutlineLocationOn } from "react-icons/md";

import { SVG3D } from "3dsvg";

// The Floating Icon Component for depth
const FloatingElement = ({ 
    children, 
    xOffset, 
    yOffset, 
    zDepth,
    top,
    left,
    delay
}: { 
    children: React.ReactNode, 
    xOffset: any, 
    yOffset: any, 
    zDepth: number,
    top: string,
    left: string,
    delay: number
}) => {
    // Parallax logic based on distance
    const moveX = useTransform(xOffset, [-0.5, 0.5], [-zDepth, zDepth]);
    const moveY = useTransform(yOffset, [-0.5, 0.5], [-zDepth, zDepth]);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay, type: "spring", bounce: 0.4 }}
            className="absolute hidden md:block" // Hidden on small screens to avoid clutter
            style={{ 
                top, 
                left, 
                x: moveX, 
                y: moveY,
                zIndex: zDepth > 50 ? 20 : 0
            }}
        >
            <div className={`p-4 rounded-2xl bg-white shadow-2xl border border-gray-100/50 backdrop-blur-md flex items-center justify-center`}
                 style={{ 
                    transform: `translateZ(${zDepth}px) rotateY(${zDepth * 0.1}deg) rotateX(${-zDepth * 0.1}deg)`,
                 }}>
                {children}
            </div>
        </motion.div>
    );
};

export default function Hero() {
    // Global mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for tracking
    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });
    
    // Core transforms for the central scene
    const rotateX = useTransform(smoothY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-8deg", "8deg"]);
    const gridRotateX = useTransform(smoothY, [-0.5, 0.5], ["40deg", "70deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        
        // Normalize between -0.5 and 0.5
        const xPos = (clientX - left) / width - 0.5;
        const yPos = (clientY - top) / height - 0.5;
        
        mouseX.set(xPos);
        mouseY.set(yPos);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const mySvg = `
        <svg width="100" height="100" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.88">
                <path d="M39.2985 7.36857C39.1757 7.85873 39.0293 8.33979 38.8561 8.81174C36.6553 9.55381 34.6402 10.7709 32.9431 12.4068C31.246 14.0426 29.985 15.9851 29.2136 18.1066C27.559 18.665 25.8021 18.9564 23.998 18.9564C22.1939 18.9564 20.4354 18.6665 18.7824 18.1066C18.0126 15.9851 16.75 14.0426 15.0529 12.4068C13.3558 10.7709 11.3407 9.55532 9.13989 8.81174C8.96829 8.33827 8.82031 7.85721 8.69751 7.36857C8.24097 5.54147 9.67671 3.78418 11.6257 3.78418H11.6273C13.0205 3.78418 14.2248 4.70532 14.5554 6.01039C15.5945 10.1047 19.4326 13.1519 23.9964 13.1519C28.5603 13.1519 32.3984 10.1047 33.4374 6.01039C33.768 4.70684 34.9724 3.78418 36.3656 3.78418H36.3672C38.3161 3.78418 39.7519 5.54147 39.2953 7.36857H39.2985Z" fill="#379777"/>
            </g>
            <path d="M23.9996 8.35852C26.3941 8.35852 28.3352 6.4874 28.3352 4.17926C28.3352 1.87112 26.3941 0 23.9996 0C21.6052 0 19.6641 1.87112 19.6641 4.17926C19.6641 6.4874 21.6052 8.35852 23.9996 8.35852Z" fill="#379777"/>
            <path d="M18.7841 18.1073C16.5833 17.3653 14.5682 16.1482 12.8711 14.5123C11.174 12.8764 9.913 10.934 9.1416 8.8125C11.3425 9.55457 13.3575 10.7716 15.0546 12.4075C16.7517 14.0434 18.0127 15.9858 18.7841 18.1073Z" fill="#379777"/>
            <path opacity="0.88" d="M19.6649 23.1351C19.6649 24.8741 19.3626 26.5692 18.7833 28.1641C16.584 28.9062 14.5674 30.1233 12.8719 31.7576C11.1748 33.3935 9.91377 35.3359 9.14237 37.4574C8.65119 37.6229 8.15214 37.7655 7.64522 37.8839C5.74978 38.324 3.92676 36.94 3.92676 35.0613C3.92676 33.7168 4.88235 32.5558 6.23624 32.2372C10.4837 31.2356 13.6448 27.5359 13.6448 23.1366C13.6448 18.7373 10.4837 15.0376 6.23624 14.036C4.88392 13.7173 3.92676 12.5564 3.92676 11.2134C3.92676 9.33166 5.74978 7.94768 7.64522 8.38928C8.15372 8.50764 8.65276 8.64878 9.14237 8.8157C9.91219 10.9372 11.1748 12.8796 12.8719 14.5155C14.5689 16.1514 16.584 17.367 18.7849 18.1105C19.3642 19.7055 19.6665 21.399 19.6665 23.1381L19.6649 23.1351Z" fill="#379777"/>
            <path d="M4.33559 27.3136C6.73006 27.3136 8.67117 25.4425 8.67117 23.1343C8.67117 20.8262 6.73006 18.9551 4.33559 18.9551C1.94111 18.9551 0 20.8262 0 23.1343C0 25.4425 1.94111 27.3136 4.33559 27.3136Z" fill="#379777"/>
            <path d="M18.7825 28.1641C18.0127 30.284 16.7501 32.228 15.0546 33.8624C13.3575 35.4983 11.3425 36.7138 9.1416 37.4574C9.91143 35.3359 11.174 33.3934 12.8711 31.7576C14.5666 30.1232 16.5833 28.9061 18.7825 28.1641Z" fill="#379777"/>
            <path opacity="0.88" d="M36.3711 42.4842H36.3695C34.9763 42.4842 33.7719 41.563 33.4413 40.2595C32.4023 36.1637 28.5642 33.1165 24.0003 33.1165C19.4365 33.1165 15.5984 36.1637 14.5593 40.2595C14.2287 41.563 13.0244 42.4842 11.6312 42.4842H11.6296C9.68062 42.4842 8.24487 40.7269 8.70142 38.8998C8.82421 38.4096 8.97062 37.9286 9.14379 37.4566C11.3446 36.7145 13.3597 35.4975 15.0568 33.8616C16.7523 32.2272 18.0149 30.2833 18.7847 28.1633C20.4393 27.6048 22.1978 27.3135 24.0019 27.3135C25.806 27.3135 27.5645 27.6048 29.2191 28.1633C29.9889 30.2833 31.2515 32.2272 32.947 33.8616C34.6441 35.4975 36.6592 36.713 38.86 37.4566C39.0316 37.9301 39.1796 38.4111 39.3024 38.8998C39.7589 40.7269 38.3232 42.4842 36.3742 42.4842H36.3711Z" fill="#379777"/>
            <path d="M27.0653 45.045C28.7585 43.4129 28.7585 40.7668 27.0653 39.1347C25.3722 37.5026 22.627 37.5026 20.9339 39.1347C19.2407 40.7668 19.2407 43.4129 20.9339 45.045C22.627 46.6771 25.3722 46.6771 27.0653 45.045Z" fill="#379777"/>
            <path d="M38.8564 8.8125C38.0865 10.934 36.824 12.8764 35.1269 14.5123C33.4298 16.1482 31.4147 17.3637 29.2139 18.1073C29.9837 15.9858 31.2463 14.0434 32.9434 12.4075C34.6404 10.7716 36.6555 9.55609 38.8564 8.8125Z" fill="#379777"/>
            <path d="M38.8567 37.4554C36.6559 36.7134 34.6408 35.4963 32.9437 33.8604C31.2482 32.226 29.9856 30.2821 29.2158 28.1621C31.4151 28.9042 33.4318 30.1212 35.1273 31.7556C36.8243 33.3915 38.0853 35.3339 38.8567 37.4554Z" fill="#379777"/>
            <path opacity="0.88" d="M34.355 23.1342C34.355 27.5335 37.5162 31.2332 41.7636 32.2348C43.1159 32.5535 44.0731 33.7144 44.0731 35.0574C44.0731 36.9391 42.2501 38.3231 40.3546 37.8815C39.8461 37.7632 39.3471 37.622 38.8575 37.4551C38.0877 35.3336 36.8251 33.3912 35.128 31.7553C33.4325 30.1209 31.4158 28.9039 29.2166 28.1618C28.6372 26.5669 28.335 24.8718 28.335 23.1327C28.335 21.3936 28.6357 19.6986 29.2166 18.1052C31.4174 17.3631 33.4325 16.146 35.1296 14.5101C36.8267 12.8742 38.0877 10.9318 38.8591 8.81032C39.3502 8.64491 39.8493 8.50226 40.3562 8.38389C42.2517 7.94381 44.0747 9.32779 44.0747 11.2065C44.0747 12.551 43.1191 13.7119 41.7652 14.0306C37.5178 15.0322 34.3566 18.7319 34.3566 23.1312L34.355 23.1342Z" fill="#379777"/>
            <path d="M43.6647 27.3136C46.0592 27.3136 48.0003 25.4425 48.0003 23.1343C48.0003 20.8262 46.0592 18.9551 43.6647 18.9551C41.2702 18.9551 39.3291 20.8262 39.3291 23.1343C39.3291 25.4425 41.2702 27.3136 43.6647 27.3136Z" fill="#379777"/>
        </svg>`;

    return (
        <section 
            id="hero" 
            className="relative min-h-[90vh] mb-15 md:mb-0 pb-10 md:pb-0 flex items-center justify-center overflow-hidden perspective-[1500px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Interactive Grid Background */}
            <motion.div 
                className="absolute inset-0 z-[-1] pointer-events-none opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, var(--primary) 1px, transparent 1px),
                        linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                    transformOrigin: 'bottom center',
                    rotateX: gridRotateX,
                    scale: 3,
                    y: '20%'
                }}
            />

            {/* Floating Contextual Elements */}
            <FloatingElement xOffset={smoothX} yOffset={smoothY} zDepth={120} top="20%" left="15%" delay={0.2}>
                <FileText size={45} color='var(--primary)' />
            </FloatingElement>
            <FloatingElement xOffset={smoothX} yOffset={smoothY} zDepth={-80} top="5%" left="75%" delay={1.2}>
                <MdOutlineLocationOn size={45} color='var(--primary)' />
            </FloatingElement>
            <FloatingElement xOffset={smoothX} yOffset={smoothY} zDepth={60} top="70%" left="8%" delay={0.8}>
                <MdOutlineGroups size={45} color='var(--primary)' />
            </FloatingElement>

            {/* Central 3D Platform */}
            <motion.div 
                className='relative z-10 w-full max-w-5xl mx-auto'
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
            >
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ transform: "translateZ(50px)" }}
                    className='flex flex-col items-center text-center gap-4 sm:gap-6 bg-white/40 backdrop-blur-3xl p-6 sm:p-10 md:p-16 rounded-[2rem] sm:rounded-[40px] shadow-2xl border border-white/60'
                >
                    {/* 3D SVG Element */}
                    <SVG3D
                        svg={mySvg}
                        depth={0.9}
                        smoothness={0.6}
                        color="#2ecc76"
                        animate="spinFloat"
                        animateSpeed={0.9}
                    />
                    
                    <motion.div style={{ transform: "translateZ(80px)" }} className="relative">
                        <h2 className="font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight">
                            دليلك الشامل <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-l from-primary to-secondary">
                                لمشاويرك الحكومية
                            </span>
                        </h2>
                        <motion.img 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            src={LineObject} 
                            className="absolute -bottom-6 right-0 w-2/3 origin-right" 
                            alt="" 
                        />
                    </motion.div>
                    
                    <motion.p 
                        style={{ transform: "translateZ(60px)" }}
                        className="text-base sm:text-lg md:text-xl text-muted-foreground mt-4 sm:mt-6 max-w-2xl px-2 sm:px-0"
                    >
                        كل ما تحتاجه لإنجاز معاملاتك الحكومية بسهولة، والوصول إلى جهتك بدقة عالية، ومشاركة كل التفاصيل مع مجتمع تفاعلي في تطبيق واحد.
                    </motion.p>

                    <motion.div 
                        style={{ transform: "translateZ(40px)" }}
                        className='flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10 items-center bg-gray-50/50 p-4 sm:p-3 sm:pr-6 rounded-3xl sm:rounded-full border border-gray-100'
                    >
                        <div className='flex'>
                            <img src={Sara} alt="User" className='w-10 h-10 rounded-full border-2 border-white -ml-4 shadow-sm' />
                            <img src={Abdelaziz} alt="User" className='w-10 h-10 rounded-full border-2 border-white -ml-4 shadow-sm' />
                            <img src={Khaled} alt="User" className='w-10 h-10 rounded-full border-2 border-white shadow-sm' />
                        </div>
                        <div className='text-md text-gray-600 font-medium'>
                            <span className='font-bold text-xl'>قريباً.</span>
                            {' '}
                            <span className="text-primary font-semibold">كن من اول المستخدمين</span>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
