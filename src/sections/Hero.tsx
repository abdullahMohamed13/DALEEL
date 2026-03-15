import React, { type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import LineObject from '@/assets/lines.svg'
import Sara from '@/assets/testimonials/sara.png'
import Khaled from '@/assets/testimonials/mohamed.png'
import Abdelaziz from '@/assets/testimonials/abdelaziz.jpeg'

// Dynamic Floating Elements
import DocumentIcon from '@/assets/features/document.svg'
import LocationIcon from '@/assets/features/location.svg'
import GroupIcon from '@/assets/features/group.svg'

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

    return (
        <section 
            id="hero" 
            className="relative min-h-[90vh] mb-15 md:mb-0 pb-10 md:pb:0 flex items-center justify-center overflow-hidden perspective-[1500px]"
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
                <img src={DocumentIcon} alt="Document" className="w-12 h-12" />
            </FloatingElement>
            <FloatingElement xOffset={smoothX} yOffset={smoothY} zDepth={-80} top="5%" left="75%" delay={1.2}>
                <img src={LocationIcon} alt="Location" className="w-16 h-16" />
            </FloatingElement>
            <FloatingElement xOffset={smoothX} yOffset={smoothY} zDepth={60} top="70%" left="8%" delay={0.8}>
                <img src={GroupIcon} alt="Community" className="w-14 h-14" />
            </FloatingElement>

            {/* Central 3D Platform */}
            <motion.div 
                className='relative z-10 w-full max-w-5xl mx-auto px-6'
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
                    className='flex flex-col items-center text-center gap-6 bg-white/40 backdrop-blur-3xl p-10 md:p-16 rounded-[40px] shadow-2xl border border-white/60'
                >
                    <motion.div style={{ transform: "translateZ(80px)" }} className="relative">
                        <h2 className="font-extrabold text-5xl md:text-7xl leading-tight">
                            دليلك الشامل <br />
                            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-l from-primary to-[#23A05D]">
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
                        className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl"
                    >
                        كل ما تحتاجه لإنجاز معاملاتك الحكومية بسهولة، والوصول إلى جهتك بدقة عالية، ومشاركة كل التفاصيل مع مجتمع تفاعلي في تطبيق واحد.
                    </motion.p>

                    <motion.div 
                        style={{ transform: "translateZ(40px)" }}
                        className='flex flex-col sm:flex-row gap-5 mt-10 items-center bg-gray-50/50 p-3 pr-6 rounded-full border border-gray-100'
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