import { Leaf, Instagram, Facebook, Mail, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="gradient-forest text-cream mt-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-gold" />
            <h3 className="font-display text-2xl">São Gonçalo do Rio Abaixo</h3>
          </div>
          <p className="text-cream/80 text-sm leading-relaxed">
            Natureza, história e mineiridade no coração do Vale do Aço.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3 text-gold">Explore</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/pontos" className="hover:text-gold transition">Pontos Turísticos</Link></li>
            <li><Link to="/roteiro" className="hover:text-gold transition">Monte seu Roteiro</Link></li>
            <li><Link to="/mapa" className="hover:text-gold transition">Mapa Interativo</Link></li>
            <li><Link to="/agenda" className="hover:text-gold transition">Agenda Cultural</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3 text-gold">Descubra</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/historia" className="hover:text-gold transition">História da Cidade</Link></li>
            <li><Link to="/galeria" className="hover:text-gold transition">Galeria</Link></li>
            <li><Link to="/chat" className="hover:text-gold transition">Guia Virtual Gonça</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3 text-gold">Contato</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Praça Coronel Almeida, s/n</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> turismo@saogoncalo.mg.gov.br</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-cream/10 hover:bg-terracotta flex items-center justify-center transition"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-cream/10 hover:bg-terracotta flex items-center justify-center transition"><Facebook className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/60 font-mono">
        © {new Date().getFullYear()} Secretaria de Turismo · São Gonçalo do Rio Abaixo · MG · Turismo sustentável 🌿
      </div>
    </footer>
  );
}
