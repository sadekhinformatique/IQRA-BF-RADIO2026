import React from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, Users, Mic2, Info, Heart } from 'lucide-react';

const Programs: React.FC = () => {
  const programs = [
    { time: '04:30 - 05:30', title: 'Fajr & Prières', icon: Clock, desc: 'Ouverture de l\'antenne avec les prières du matin.' },
    { time: '08:00 - 10:00', title: 'Tafsir du Coran', icon: BookOpen, desc: 'Explication approfondie des versets du Saint Coran.' },
    { time: '10:30 - 12:00', title: 'Cours Islamique', icon: Users, desc: 'Enseignements sur la jurisprudence et la foi.' },
    { time: '14:00 - 16:00', title: 'Conférences', icon: Mic2, desc: 'Interventions de savants et prédicateurs renommés.' },
    { time: '17:00 - 19:00', title: 'Programmes Culturels', icon: Heart, desc: 'Découverte de la culture islamique et débats.' },
    { time: '20:00 - 21:00', title: 'Informations', icon: Info, desc: 'Actualités nationales et internationales.' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Grille des Programmes</h1>
        <p className="text-white/60">Retrouvez tous vos rendez-vous spirituels sur RADIO IQRA TV.</p>
      </motion.div>

      <div className="grid gap-6">
        {programs.map((prog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="p-4 rounded-xl bg-emerald-600/20 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <prog.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-emerald-500 text-sm font-mono">{prog.time}</span>
              <h3 className="text-xl font-bold text-white mt-1">{prog.title}</h3>
              <p className="text-white/50 mt-2">{prog.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
