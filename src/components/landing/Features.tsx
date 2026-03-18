import React from 'react';
import { Zap, BarChart3, ArrowRight } from 'lucide-react';

const FEATURES = [
  { title: 'Qualificação Inteligente', desc: 'Nossa IA filtra leads curiosos e foca em quem realmente quer comprar.', icon: Zap },
  { title: 'Agendamento Direto', desc: 'Integração nativa com sua agenda para marcações sem intervenção humana.', icon: BarChart3 },
  { title: 'Recuperação de Carrinho', desc: 'Identifica desistências e reativa o cliente com ofertas personalizadas.', icon: ArrowRight },
];

const SECTORS = ['Restaurantes', 'Petshops', 'Clínicas', 'Imobiliárias', 'Varejo', 'Educação', 'SaaS'];

interface FeaturesProps {
  onAuth: (mode: 'login' | 'signup') => void;
}

export default function Features({ onAuth }: FeaturesProps) {
  return (
    <section id="platform" className="py-20 md:py-32 px-6 bg-white relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center mb-32">
          <div>
            <h2 className="text-4xl md:text-7xl font-display font-bold leading-[0.9] mb-8 tracking-tighter">
              UMA PLATAFORMA <br />
              <span className="text-brand-orange">SEM LIMITES.</span>
            </h2>
            <p className="text-lg md:text-xl text-brand-black/50 mb-12 leading-tight max-w-md">
              Desenvolvemos a tecnologia mais avançada para que você possa focar no que realmente importa: crescer seu negócio.
            </p>
            
            <div className="space-y-8">
              {FEATURES.map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-paper border border-brand-line flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                    <item.icon className="w-6 h-6 text-brand-orange group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-brand-black/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-[40px] md:rounded-[60px] bg-brand-paper border border-brand-line overflow-hidden relative">
              <img 
                src="https://picsum.photos/seed/tech/800/800" 
                alt="Technology" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-orange/10 mix-blend-multiply"></div>
            </div>
            
            <div className="absolute -bottom-6 md:-bottom-10 -right-4 md:-right-10 glass p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-2xl border-white/60 max-w-[200px] md:max-w-[240px] animate-bounce-slow">
              <div className="text-3xl md:text-4xl font-display font-bold text-brand-orange mb-2">99.9%</div>
              <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-[0.2em]">Uptime Garantido</div>
            </div>
          </div>
        </div>

        <div className="bg-brand-black rounded-[40px] md:rounded-[60px] p-8 md:p-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-orange blur-[120px] rounded-full"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-display font-bold mb-8 leading-[0.9] tracking-tighter">
              PRONTO PARA <br /> QUALQUER <span className="text-brand-orange italic font-serif font-medium">setor.</span>
            </h2>
            <p className="text-base md:text-lg text-white/50 mb-12 leading-relaxed">
              De restaurantes a clínicas, o NEXUS entende seu negócio e fala a língua do seu cliente. Nossa IA é treinada com dados específicos do seu nicho.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16">
              {SECTORS.map((tag) => (
                <span key={tag} className="px-4 md:px-6 py-2 md:py-3 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange hover:border-brand-orange transition-all cursor-default">
                  {tag}
                </span>
              ))}
            </div>
            
            <button 
              onClick={() => onAuth('signup')}
              className="btn-primary bg-white text-brand-black hover:bg-brand-orange hover:text-white px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl w-full sm:w-auto"
            >
              Criar meu Agente agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
