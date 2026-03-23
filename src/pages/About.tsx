import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Globe, MessageCircle } from 'lucide-react';
import { CONFIG } from '../constants/config';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-16"
      >
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">À Propos de Nous</h1>
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm leading-relaxed text-white/80 text-lg">
            <p>
              RADIO IQRA TV est une station islamique basée au Burkina Faso dédiée à la diffusion des enseignements authentiques de l'Islam dans un esprit de paix, de fraternité et d'éducation spirituelle.
            </p>
            <p className="mt-4">
              Notre mission est d'accompagner les fidèles dans leur cheminement spirituel quotidien à travers une programmation riche et variée, alliant récitation du Coran, enseignements théologiques et informations culturelles.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Contactez-nous</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>Ouagadougou, Burkina Faso</span>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-500">
                  <Phone className="w-5 h-5" />
                </div>
                <span>{CONFIG.WHATSAPP_NUMBER}</span>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-500">
                  <Mail className="w-5 h-5" />
                </div>
                <span>contact@radioiqraburkina.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Liens Utiles</h2>
            <div className="grid grid-cols-1 gap-4">
              <a 
                href={CONFIG.WEBSITE} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <span className="text-white/80">Site Officiel</span>
                </div>
                <span className="text-white/20 group-hover:text-white/40">→</span>
              </a>
              <a 
                href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-white/80">WhatsApp</span>
                </div>
                <span className="text-white/20 group-hover:text-white/40">→</span>
              </a>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default About;
