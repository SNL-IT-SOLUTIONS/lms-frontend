import { GraduationCap, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from 'react';
import LogoLoop from '@/components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer } from 'react-icons/si';
import { useNavigate } from "react-router-dom";

const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiFramer />, title: "Framer Motion", href: "https://www.framer.com/motion" },
];

const Index = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">

            {/* Modern Glass Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200/30 py-4 shadow-lg'
                : 'bg-transparent py-6'
                }`}>
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative p-2 bg-white rounded-xl">
                                    <GraduationCap size={28} className="text-gray-900" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    LearnFlow
                                </span>
                                <span className="text-xs text-gray-500">Modern Learning Platform</span>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                                <span className="relative">
                                    Home
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </span>
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                                <span className="relative">
                                    Features
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </span>
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                                <span className="relative">
                                    Courses
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </span>
                            </a>
                            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium group">
                                <span className="relative">
                                    Docs
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </span>
                            </a>
                            <button onClick={() => navigate("/login")} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 group">
                                Get Started
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 animate-fadeIn">
                            <div className="flex flex-col gap-4">
                                {['Home', 'Features', 'Courses', 'Docs'].map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="text-gray-700 hover:text-blue-600 py-3 px-4 rounded-xl hover:bg-gray-50 transition-all font-medium"
                                    >
                                        {item}
                                    </a>
                                ))}
                                <button className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Hero Content */}
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                            <Sparkles size={16} className="text-blue-500" />
                            <span className="text-sm font-medium text-blue-700">Next-gen Learning Platform</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Transform Your
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Learning Experience
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            An intelligent Learning Management System built with cutting-edge technology.
                            Interactive, accessible, and designed for the future of education.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button onClick={() => navigate("/login")} className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-3">
                                <span >Start Learning Free</span>
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 animate-ping-slow opacity-0 group-hover:opacity-100"></div>
                            </button>

                            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                                Explore Features
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-20">
                        {[
                            { value: '10K+', label: 'Active Learners' },
                            { value: '500+', label: 'Courses' },
                            { value: '99%', label: 'Satisfaction' },
                            { value: '24/7', label: 'Support' }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group">
                                <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 text-sm mt-2">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Tech Stack Showcase */}
                    <div className="mb-20">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                Built With Modern Stack
                            </h2>
                            <p className="text-gray-600">Powered by cutting-edge technologies</p>
                        </div>

                        <div className="relative overflow-hidden py-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10"></div>
                            <LogoLoop
                                logos={techLogos}
                                speed={80}
                                direction="left"
                                logoHeight={64}
                                gap={60}
                                hoverSpeed={0.8}
                                scaleOnHover={true}
                                fadeOut={true}
                                fadeOutColor="#ffffff"
                                ariaLabel="Technology stack"
                                className="py-4"
                            />
                        </div>
                    </div>

                    {/* Feature Card */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"></div>
                        <div className="relative max-w-4xl mx-auto">
                            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            Ready to Elevate Your Learning Journey?
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Join thousands of learners and experience the future of education.
                                            No credit card required to start.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                                            />
                                            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all">
                                                Get Started
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => navigate("/login")} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                                            LOGIN
                                        </button>
                                        <button onClick={() => navigate("/login")} className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                                            SIGN UP
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Custom CSS for animations */}
            <style>{`
                @keyframes ping-slow {
                    0% {
                        transform: scale(1);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1.1);
                        opacity: 0;
                    }
                }
                .animate-ping-slow {
                    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Index;