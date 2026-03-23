import React from 'react';
import { CONFIG } from '../constants/config';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/10 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-white/40 text-sm">
          &copy; {new Date().getFullYear()} {CONFIG.RADIO_NAME}. Tous droits réservés.
        </p>
        <p className="text-white/20 text-xs mt-2">
          Burkina Faso - La Voix du Saint Coran
        </p>
      </div>
    </footer>
  );
};

export default Footer;
