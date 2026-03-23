import React from 'react';
import AudioPlayer from '../components/AudioPlayer';
import NowPlaying from '../components/NowPlaying';
import SocialButtons from '../components/SocialButtons';
import { CONFIG } from '../constants/config';
import { motion } from 'motion/react';

const Home: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl space-y-12 relative z-10"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-block p-4 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 mb-6"
          >
            <img 
              src="https://picsum.photos/seed/islamic/200/200" 
              alt="Logo Radio" 
              className="w-32 h-32 rounded-2xl object-cover shadow-xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            {CONFIG.RADIO_NAME}
          </h1>
          <p className="text-emerald-500 font-medium text-xl md:text-2xl italic">
            {CONFIG.SLOGAN}
          </p>
        </div>

        <div className="space-y-8">
          <NowPlaying />
          <AudioPlayer />
        </div>

        <div className="pt-8">
          <p className="text-center text-white/40 text-sm uppercase tracking-widest mb-4">Suivez-nous</p>
          <SocialButtons />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
