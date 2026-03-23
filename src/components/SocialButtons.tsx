import React from 'react';
import { Facebook, Youtube, Globe, MessageCircle } from 'lucide-react';
import { CONFIG } from '../constants/config';

const SocialButtons: React.FC = () => {
  const socials = [
    { icon: Facebook, url: CONFIG.FACEBOOK, color: 'hover:text-blue-500', label: 'Facebook' },
    { icon: Youtube, url: CONFIG.YOUTUBE, color: 'hover:text-red-500', label: 'YouTube' },
    { icon: MessageCircle, url: `https://wa.me/${CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`, color: 'hover:text-emerald-500', label: 'WhatsApp' },
    { icon: Globe, url: CONFIG.WEBSITE, color: 'hover:text-blue-400', label: 'Site Web' },
  ];

  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-white/40 transition-all duration-300 transform hover:scale-125 ${social.color}`}
          aria-label={social.label}
        >
          <social.icon className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
};

export default SocialButtons;
