/**
 * Procedural Web Audio synthesizer for traditional East/Southeast Asian musical scale
 * (Vietnamese Đàn Tranh / Korean Gayageum pentatonic tones, resonant temple bells, water ambiance)
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private musicInterval: number | null = null;
  private isMusicPlaying: boolean = false;

  // Traditional Pentatonic Scale frequencies (D minor / F major pentatonic: D, F, G, A, C)
  private pentatonicNotes = [
    293.66, // D4
    349.23, // F4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    698.46, // F5
    783.99, // G5
    880.00, // A5
    1046.50 // C6
  ];

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(muted ? 0 : 0.15, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Pluck sound modeled after Đàn Tranh / Gayageum zither
   */
  public playPluck(noteIndex?: number) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const freq = noteIndex !== undefined
        ? this.pentatonicNotes[noteIndex % this.pentatonicNotes.length]
        : this.pentatonicNotes[Math.floor(Math.random() * this.pentatonicNotes.length)];

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 4, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + 0.8);

      const now = ctx.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.22, now + 0.015); // sharp pluck attack
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2); // gradual acoustic decay

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + 1.25);
      oscHarmonic.stop(now + 1.25);
    } catch {
      // Audio might be blocked until user gesture
    }
  }

  /**
   * Resonant bronze temple gong / drum (Chuông chùa / Trống đồng)
   */
  public playGong(deep: boolean = false) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const fundamental = deep ? 110 : 164.81; // Low A2 or E3
      const now = ctx.currentTime;

      // Primary oscillator
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(fundamental, now);

      // Inharmonic bell overtone
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(fundamental * 2.76, now);

      const osc3 = ctx.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(fundamental * 4.07, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc1.connect(gain);
      osc2.connect(gain);
      osc3.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      osc1.stop(now + 3.3);
      osc2.stop(now + 3.3);
      osc3.stop(now + 3.3);
    } catch {}
  }

  /**
   * Sparkle sound when picking up a Spirit Lotus or relic
   */
  public playCollect() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const notes = [587.33, 783.99, 1046.50, 1174.66]; // ascending arpeggio

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        const startTime = now + i * 0.06;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.52);
      });
    } catch {}
  }

  /**
   * Water splash sound for stepping stones, boat rowing
   */
  public playWaterSplash() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      // White noise burst with lowpass sweep
      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.22);
      filter.Q.setValueAtTime(3, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.25);
    } catch {}
  }

  /**
   * Festival Drum beat (Trống hội / Samulnori Buk)
   */
  public playFestivalDrum(pitchHigh: boolean = false) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startFreq = pitchHigh ? 220 : 130;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {}
  }

  /**
   * Quest victory flourish
   */
  public playQuestComplete() {
    if (this.isMuted) return;
    try {
      this.playGong(false);
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const melody = [392, 523.25, 587.33, 783.99, 880, 1046.5];

      melody.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.1);

        const startTime = now + index * 0.1;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.85);
      });
    } catch {}
  }

  /**
   * Ambient procedural melody loop (soft background Asian zither improvisation)
   */
  public startAmbientMelody() {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    let beat = 0;
    this.musicInterval = window.setInterval(() => {
      if (this.isMuted) return;
      beat++;
      // Randomly trigger subtle plucks in pentatonic scale
      if (beat % 2 === 0 && Math.random() > 0.3) {
        const noteIdx = Math.floor(Math.random() * this.pentatonicNotes.length);
        this.playPluck(noteIdx);
      }
      if (beat % 16 === 0) {
        this.playGong(true);
      }
    }, 1800);
  }

  public stopAmbientMelody() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const soundManager = new SoundSystem();
