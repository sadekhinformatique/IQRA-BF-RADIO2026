import React, { useState, useEffect } from 'react';
import { getNowPlaying } from '../services/apiService';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Radio } from 'lucide-react';

interface NowPlayingData {
  now_playing: {
    song: {
      title: string;
      artist: string;
      art: string;
    };
  };
  live: {
    is_live: boolean;
    streamer_name: string;
  };
}

const NowPlaying: React.FC = () => {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const result = await getNowPlaying();
      // AzuraCast /nowplaying returns an array of stations
      // We assume the first one is our station
      const stationData = Array.isArray(result) ? result[0] : result;
      setData(stationData);
    } catch (error) {
      console.error("Failed to fetch now playing:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center gap-2 text-white/50 animate-pulse">
        <div className="w-48 h-6 bg-white/10 rounded"></div>
        <div className="w-32 h-4 bg-white/10 rounded"></div>
      </div>
    );
  }

  const song = data?.now_playing?.song;
  const isLive = data?.live?.is_live;
  const streamer = data?.live?.streamer_name;

  return (
    <div className="text-center space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={song?.title || 'idle'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium text-sm uppercase tracking-widest">
            {isLive ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                EN DIRECT : {streamer || 'Studio'}
              </>
            ) : (
              <>
                <Radio className="w-4 h-4" />
                EN DIFFUSION
              </>
            )}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white line-clamp-2 px-4">
            {song?.title || 'RADIO IQRA TV'}
          </h2>
          <p className="text-white/60 text-lg flex items-center justify-center gap-2">
            <Music className="w-4 h-4" />
            {song?.artist || 'La Voix du Saint Coran'}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NowPlaying;
