import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';

const FAQS = [
  {
    q: "Como a NEXUS integra com meu WhatsApp?",
    a: "A integração é feita via QR Code oficial, similar ao WhatsApp Web. Em menos de 2 minutos seu agente já está pronto para responder seus clientes."
  },
  {
    q: "Preciso saber programar para configurar a IA?",
    a: "Absolutamente não. Nossa interface é 100% visual e intuitiva. Você treina seu agente conversando com ele em português simples."
  },
  {
    q: "O agente consegue fechar vendas sozinho?",
    a: "Sim! Ele é capaz de qualificar o lead, apresentar seu catálogo, tirar dúvidas técnicas e até enviar links de checkout ou agendar reuniões."
  },
  {
    q: "Meus dados e dos meus clientes estão seguros?",
    a: "Segurança é nossa prioridade. Utilizamos criptografia de nível bancário e estamos em total conformidade com a LGPD. Seus dados são privados e protegidos."
  }
];

export default function FAQ() {
  return (
    <section className="py-20 md:py-32 px-6 bg-brand-paper/30 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-[0.9] tracking-tighter mb-6">
              DÚVIDAS <br /> <span className="text-brand-orange">FREQUENTES.</span>
            </h2>
            <p className="text-brand-black/50 font-medium">Tudo o que você precisa saber para começar a escalar suas vendas.</p>
          </div>
          <div className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.3em] pb-2 border-b border-brand-line">
            Suporte 24/7 Disponível
          </div>
        </div>

        <div className="grid gap-4">
          {FAQS.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white border border-brand-line rounded-[24px] md:rounded-[32px] p-6 md:p-8 hover:border-brand-orange/30 transition-all cursor-default shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center justify-between group-hover:text-brand-orange transition-colors">
                {faq.q}
                <ChevronDown size={20} className="text-brand-black/20 group-hover:text-brand-orange transition-all duration-300 group-hover:rotate-180" />
              </h3>
              <p className="text-sm md:text-base text-brand-black/50 leading-relaxed font-medium">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 md:mt-24 relative">
          <div className="glass p-10 md:p-20 rounded-[40px] md:rounded-[60px] border-white/60 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-brand-orange/5 -z-10"></div>
            <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 md:mb-6 tracking-tighter uppercase whitespace-normal">Ainda tem dúvidas?</h3>
            <p className="text-sm md:text-base text-brand-black/50 mb-8 md:mb-12 max-w-md mx-auto font-medium">Nossa equipe técnica está pronta para te ajudar a configurar seu primeiro agente.</p>
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 md:gap-4 bg-[#25D366] text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-green-500/20 active:scale-95 group text-sm md:text-base"
            >
              <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
