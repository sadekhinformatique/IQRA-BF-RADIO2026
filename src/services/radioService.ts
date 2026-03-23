import { CONFIG } from '../constants/config';

class RadioService {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio(CONFIG.STREAM_URL);
      this.audio.preload = 'none';
    }
  }

  play() {
    if (this.audio) {
      this.audio.src = CONFIG.STREAM_URL; // Reload to avoid cache/latency issues
      this.audio.play().catch(err => console.error("Playback error:", err));
      this.isPlaying = true;
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = ""; // Stop buffering
      this.isPlaying = false;
    }
  }

  getAudioInstance() {
    return this.audio;
  }
}

export const radioService = new RadioService();
