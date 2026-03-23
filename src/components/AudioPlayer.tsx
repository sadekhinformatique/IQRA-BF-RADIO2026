import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { CONFIG } from '../constants/config';
import { motion } from 'motion/react';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(CONFIG.STREAM_URL);
    audioRef.current.volume = volume;

    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      // Auto-reconnect logic could go here
    };

    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('waiting', handleWaiting);
    audioRef.current.addEventListener('error', handleError);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('waiting', handleWaiting);
        audioRef.current.removeEventListener('error', handleError);
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      // Reset src to ensure we are playing the live stream and not a buffered segment
      audioRef.current.src = CONFIG.STREAM_URL;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Playback failed", err);
        setIsLoading(false);
      });
    }
  };

  const stopPlayback = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = "";
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    audioRef.current.muted = newMuteState;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl w-full max-w-md mx-auto">
      <div className="relative group">
        <div className={`absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 ${isPlaying ? 'animate-pulse' : ''}`}></div>
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="relative flex items-center justify-center w-24 h-24 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-all active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-10 h-10 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-10 h-10 fill-current" />
          ) : (
            <Play className="w-10 h-10 fill-current ml-1" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-4 w-full justify-center">
        <button
          onClick={stopPlayback}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Stop"
        >
          <Square className="w-5 h-5 fill-current" />
        </button>

        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full flex-1 max-w-[200px]">
          <button onClick={toggleMute} className="text-white">
            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>

      {isPlaying && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-1 items-end h-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [4, 16, 8, 16, 4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              className="w-1 bg-emerald-500 rounded-full"
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AudioPlayer;
