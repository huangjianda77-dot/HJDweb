/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { 
  Zap, 
  Wind, 
  Thermometer, 
  Smartphone, 
  ShieldCheck, 
  RefreshCw, 
  ChevronRight,
  Menu,
  X,
  Droplets,
  Activity,
  Play,
  Quote,
  Globe
} from "lucide-react";
import { useState, useRef } from "react";
import { translations, Language } from "./translations";

const Navbar = ({ currentLang, setLang }: { currentLang: Language, setLang: (l: Language) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[currentLang].nav;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-600/10"
            >
              <Wind className="text-white w-6 h-6" />
            </motion.div>
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase italic">{t.brand}</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-[10px] font-bold uppercase tracking-widest">
            <a href="#features" className="text-slate-500 hover:text-brand-blue transition-colors">{t.features}</a>
            <a href="#benefits" className="text-slate-500 hover:text-brand-blue transition-colors">{t.benefits}</a>
            <a href="#models" className="text-slate-500 hover:text-brand-blue transition-colors">{t.models}</a>
            
            <div className="relative group">
              <button className="flex items-center text-slate-500 hover:text-brand-blue transition-colors gap-1 uppercase">
                <Globe className="w-3 h-3" />
                {currentLang}
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 min-w-[120px] z-[100]">
                {(Object.keys(translations) as Language[]).map(l => (
                  <button 
                    key={l} 
                    onClick={() => setLang(l)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:bg-slate-50 transition-colors ${currentLang === l ? 'text-brand-blue bg-blue-50' : 'text-slate-500'}`}
                  >
                    {l === 'en' ? 'English' : l === 'zh' ? '中文' : l === 'ko' ? '한국어' : l === 'ja' ? '日本語' : l === 'es' ? 'Español' : l === 'fr' ? 'Français' : 'Deutsch'}
                  </button>
                ))}
              </div>
            </div>

            <a 
              href="#models"
              className="ml-4 px-6 py-2 bg-slate-900 text-white rounded-full hover:bg-brand-blue transition-all duration-300 shadow-sm"
            >
              {t.shopNow}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <select 
              value={currentLang} 
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-slate-500 border-none focus:ring-0"
            >
              {(Object.keys(translations) as Language[]).map(l => (
                <option key={l} value={l}>{l.toUpperCase()}</option>
              ))}
            </select>
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-dark">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-slate-100 p-6 flex flex-col space-y-6 shadow-2xl"
        >
          <a href="#features" className="text-xs font-bold uppercase tracking-widest text-slate-500">{t.features}</a>
          <a href="#benefits" className="text-xs font-bold uppercase tracking-widest text-slate-500">{t.benefits}</a>
          <a href="#models" className="text-xs font-bold uppercase tracking-widest text-slate-500">{t.models}</a>
          <button className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold uppercase tracking-widest text-xs"> {t.shopNow} </button>
        </motion.div>
      )}
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any, title: string, description: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:border-brand-blue/30 transition-all duration-500 group"
  >
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-6 h-6 text-brand-blue" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <div className="min-h-screen bg-white selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar currentLang={lang} setLang={setLang} />

      {/* Hero Section Poster Style */}
      <section ref={targetRef} className="relative pt-32 pb-20 md:pt-40 md:pb-48 overflow-hidden min-h-[90vh] flex items-center bg-slate-900">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-man-plunging-into-a-cold-water-bath-41221-large.mp4" type="video/mp4" />
          </video>
          {/* Enhanced Overlay for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 text-left z-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-[10px] font-bold uppercase tracking-[0.3em] mb-8 backdrop-blur-md"
              >
                <Activity className="w-3 h-3 mr-2" />
                {t.hero.tag}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.85] uppercase italic"
              >
                {t.hero.title1} <br />
                <span className="text-brand-blue">{t.hero.title2}</span> <br />
                {t.hero.title3}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-300 mb-10 max-w-sm leading-relaxed font-medium"
              >
                {t.hero.desc}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <button className="w-full sm:w-auto px-10 py-5 bg-brand-blue text-white rounded-2xl font-black text-lg hover:grow transition-all duration-300 shadow-2xl shadow-blue-500/20">
                  {t.hero.ctaPrimary}
                </button>
                <button className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                  {t.hero.ctaSecondary}
                </button>
              </motion.div>
            </div>

            {/* Right Poster View */}
            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1.2, ease: "circOut" }}
                className="relative z-20 perspective-2000"
              >
                {/* Large Background Text */}
                <div className="absolute -top-20 -right-20 text-[18rem] font-black text-white/[0.03] select-none -z-10 leading-none">
                  ICE
                </div>
                
                <div className="relative group">
                  <img 
                    src="/input_file_0.png" 
                    alt="ArcticFlow Pro Series" 
                    className="w-full h-auto drop-shadow-[0_50px_80px_rgba(10,132,255,0.3)] filter brightness-110 active:scale-95 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Specs Labels */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 -right-4 bg-slate-900/40 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/10 z-30 hidden md:block"
                  >
                    <div className="text-brand-blue font-bold text-sm mb-1 uppercase tracking-wider">Precision-Lite™</div>
                    <div className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">3°C Const Temp</div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 -left-8 bg-slate-900/40 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/10 z-30 hidden md:block"
                  >
                    <div className="text-brand-blue font-bold text-sm mb-1 uppercase tracking-wider">UVC-Pure™</div>
                    <div className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">99.9% Filtration</div>
                  </motion.div>
                </div>

                {/* Main Blue Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[80%] bg-brand-blue/30 blur-[140px] rounded-full -z-10 animate-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Bar / Poster Footer */}
      <div className="border-y border-slate-100 bg-slate-50/50 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 text-center mb-8">
            Trusted by World-Class Institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-40 grayscale contrast-125">
            {['FORBES', 'VOGUE', 'MEN\'S HEALTH', 'WIRED', 'TED'].map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-black italic tracking-tighter text-slate-900">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { label: t.stats.stallForce, value: "40lbs" },
            { label: t.stats.batteryLife, value: "120min" },
            { label: t.stats.noiseLevel, value: "45dB" },
            { label: t.stats.heatMode, value: t.stats.active },
          ].map((stat, i) => (
            <div 
              key={i}
              className="border-r border-slate-800 last:border-0"
            >
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{stat.label}</span>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Bento */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-4">{t.features.tag}</h2>
            <p className="text-4xl md:text-5xl font-black text-brand-dark tracking-tight">{t.features.title}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Zap}
              title={t.features.swiftCooling.title}
              description={t.features.swiftCooling.desc}
              delay={0.1}
            />
            <FeatureCard 
              icon={Thermometer}
              title={t.features.preciseControl.title}
              description={t.features.preciseControl.desc}
              delay={0.2}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title={t.features.pureFiltration.title}
              description={t.features.pureFiltration.desc}
              delay={0.3}
            />
            <div className="md:col-span-2 p-8 bg-brand-dark rounded-3xl overflow-hidden relative group h-[400px]">
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-white mb-4">{t.features.integration.title}</h3>
                <p className="text-gray-400 max-w-sm">{t.features.integration.desc}</p>
                <div className="mt-8">
                  <button className="flex items-center text-brand-accent font-bold group">
                    {t.features.integration.cta} <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="absolute right-[-100px] bottom-[-50px] w-full h-[500px] opacity-40 group-hover:scale-110 transition-transform duration-1000">
                {/* Visual anchor for app */}
                <Smartphone className="w-full h-full text-brand-blue stroke-[0.5]" />
              </div>
            </div>
            <FeatureCard 
              icon={RefreshCw}
              title={t.features.autoRecovery.title}
              description={t.features.autoRecovery.desc}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                {t.benefits.tag}
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
                {t.benefits.title}
              </h2>
              <div className="space-y-8">
                {[
                  { title: t.benefits.inflammation.title, desc: t.benefits.inflammation.desc, icon: Droplets },
                  { title: t.benefits.sleep.title, desc: t.benefits.sleep.desc, icon: Wind },
                  { title: t.benefits.hormonal.title, desc: t.benefits.hormonal.desc, icon: Activity },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="mt-1 w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                      <item.icon className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[40px] overflow-hidden shadow-2xl relative"
            >
              <img 
                src="/src/assets/images/regenerated_image_1778654136831.jpg" 
                alt="Athlete using ArcticFlow" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-bold text-2xl">"{t.benefits.quote.text}"</p>
                <p className="text-brand-accent">— {t.benefits.quote.author}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-slate-50 overflow-hidden text-slate-900 leading-tight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div className="max-w-2xl">
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                {t.testimonials.tag}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                {t.testimonials.title}
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm font-medium leading-relaxed">
              {t.testimonials.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Video Highlight */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 group cursor-pointer"
            >
              <div className="relative rounded-[40px] overflow-hidden aspect-video shadow-2xl bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070" 
                  alt="Recovery session" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center shadow-2xl shadow-brand-blue/40 group-hover:scale-110 transition-transform">
                    <Play className="text-white w-8 h-8 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center gap-4 text-white">
                    <div className="p-1 px-3 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                      {t.testimonials.highlightTag}
                    </div>
                  </div>
                  <h3 className="text-4xl font-black text-white mt-4">"{t.testimonials.highlightQuote}"</h3>
                  <p className="text-white/60 mt-2 font-medium leading-relaxed">— {t.testimonials.highlightAuthor}</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Feed */}
            <div className="lg:col-span-4 space-y-6">
              {[
                {
                  name: "David Chen",
                  role: "NBA Mobility Coach",
                  text: "ArcticFlow's temp stability is unmatched. We use it for the whole roster during playoffs.",
                  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&h=120&auto=format&fit=crop"
                },
                {
                  name: "Elena Rodriguez",
                  role: "CrossFit Games Athlete",
                  text: "The filtration system is the real MVP. Clean water every single session without the hassle.",
                  img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&h=120&auto=format&fit=crop"
                },
                {
                  name: "Tom Bridge",
                  role: "Ultramarathon Runner",
                  text: "It's changed the way I look at mileage. Recovery starts the second I step out of the tub.",
                  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&h=120&auto=format&fit=crop"
                }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <Quote className="absolute -right-4 -top-4 w-20 h-20 text-slate-50 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" />
                  <div className="flex items-center gap-4 mb-4">
                    <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border-2 border-brand-blue/10" referrerPolicy="no-referrer" />
                    <div className="text-black">
                      <h4 className="font-bold text-slate-900 leading-none">{t.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium italic">"{t.text}"</p>
                </motion.div>
              ))}
              
              <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-brand-blue hover:text-brand-blue transition-all">
                {t.testimonials.viewAll}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">{t.models.title}</h2>
            <p className="text-slate-500 uppercase text-[10px] font-bold tracking-[0.2em]">{t.models.subtitle}</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {/* Model 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-slate-50 rounded-[48px] p-10 border border-slate-100 hover:border-brand-blue/20 transition-all flex flex-col shadow-sm"
            >
              <div className="mb-8">
                <span className="px-3 py-1 bg-blue-50 text-[10px] font-bold text-brand-blue rounded-full tracking-widest uppercase">{t.models.pro.tag}</span>
                <h3 className="text-3xl font-black mt-4 text-slate-900">PRO <span className="text-brand-blue">{t.models.pro.series}</span></h3>
                <p className="text-slate-500 mt-2 text-sm">{t.models.pro.desc}</p>
              </div>
              <div className="flex-1 space-y-4 mb-10">
                {["1HP Cooling", "400L Tub", "UV-C Filtration", "App Support"].map((feat, i) => (
                  <div key={i} className="flex items-center text-sm font-medium text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                      <ShieldCheck className="w-3 h-3 text-brand-blue" />
                    </div>
                    {feat}
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-8 border-t border-slate-100">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-slate-900">$299</span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">USD</span>
                </div>
                <button className="w-full py-5 bg-brand-blue text-white rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-blue-100">
                  {t.models.pro.cta}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-blue rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-200"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                {t.cta.title}
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium">
                {t.cta.desc}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="w-full sm:w-auto px-12 py-5 bg-white text-brand-blue rounded-xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                  {t.cta.orderNow}
                </button>
                <button className="w-full sm:w-auto px-10 py-5 bg-slate-900/20 text-white rounded-xl font-bold text-lg backdrop-blur-md hover:bg-slate-900 border border-white/20 transition-all">
                  {t.cta.compare}
                </button>
              </div>
            </div>
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/20 rounded-full blur-[100px] -ml-48 -mb-48" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-600/20">
                  <Wind className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase italic">{t.nav.brand}</span>
              </div>
              <p className="text-slate-400 max-w-xs leading-relaxed mb-10 text-sm">
                Engineering the next generation of recovery systems. Medically certified cooling technology for peak performance.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-brand-blue transition-all border border-slate-700">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-brand-blue transition-all border border-slate-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">{t.footer.products}</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li className="hover:text-brand-blue cursor-pointer transition-colors">Pro Series 1HP</li>
                <li className="hover:text-brand-blue cursor-pointer transition-colors">Compact Lite</li>
                <li className="hover:text-brand-blue cursor-pointer transition-colors">Active Filtration</li>
                <li className="hover:text-brand-blue cursor-pointer transition-colors">Accessories</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">{t.footer.science}</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li className="hover:text-brand-blue cursor-pointer transition-colors">The Lab</li>
                <li className="hover:text-brand-blue cursor-pointer transition-colors">White Papers</li>
                <li className="hover:text-brand-blue cursor-pointer transition-colors">Case Studies</li>
                <li className="hover:text-brand-blue cursor-pointer transition-colors">Support</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <p>{t.footer.rights}</p>
            <div className="flex gap-10">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
