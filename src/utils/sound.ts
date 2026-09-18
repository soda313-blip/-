// Web Audio API synthesized sound effects
let audioCtx: AudioContext | null = null;
let soundEnabled: boolean = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  try {
    localStorage.setItem('grammar_cannon_sound', enabled ? '1' : '0');
  } catch {
    // Ignore storage issues in sandboxed iframe
  }
}

export function initSoundPreference() {
  try {
    const saved = localStorage.getItem('grammar_cannon_sound');
    if (saved !== null) {
      soundEnabled = saved === '1';
    }
  } catch {
    soundEnabled = true;
  }
}

// Button Click Sound
export function playClickSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(450, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.06);
}

// Cannon Shot Boom + Smoke Burst
export function playCannonShot() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;

  // 1. Deep oscillator boom
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(220, t);
  osc.frequency.exponentialRampToValueAtTime(35, t + 0.35);

  oscGain.gain.setValueAtTime(0.8, t);
  oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.4);

  // 2. Gunpowder crackle noise
  const bufferSize = ctx.sampleRate * 0.3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, t);
  filter.frequency.linearRampToValueAtTime(100, t + 0.3);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.7, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  noise.start(t);
}

// Gate Hit / Crack Sound (Correct Hit)
export function playGateHitSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;

  // Stone crash low frequency
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(160, t);
  osc.frequency.exponentialRampToValueAtTime(40, t + 0.3);

  oscGain.gain.setValueAtTime(0.6, t);
  oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.35);

  // High metallic chime / wood crack
  const chime = ctx.createOscillator();
  const chimeGain = ctx.createGain();
  chime.type = 'sine';
  chime.frequency.setValueAtTime(580, t);
  chime.frequency.setValueAtTime(880, t + 0.08);

  chimeGain.gain.setValueAtTime(0.4, t);
  chimeGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

  chime.connect(chimeGain);
  chimeGain.connect(ctx.destination);
  chime.start(t);
  chime.stop(t + 0.25);
}

// Deflected Red Explosion Sound (Incorrect answer hit)
export function playBounceMissSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;

  // 1. Heavy low muffled blast thud
  const blast = ctx.createOscillator();
  const blastGain = ctx.createGain();
  blast.type = 'sawtooth';
  blast.frequency.setValueAtTime(140, t);
  blast.frequency.exponentialRampToValueAtTime(30, t + 0.3);

  blastGain.gain.setValueAtTime(0.65, t);
  blastGain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

  blast.connect(blastGain);
  blastGain.connect(ctx.destination);
  blast.start(t);
  blast.stop(t + 0.35);

  // 2. High metallic ricochet / deflection crackle
  const ricochet = ctx.createOscillator();
  const ricochetGain = ctx.createGain();
  ricochet.type = 'sine';
  ricochet.frequency.setValueAtTime(620, t);
  ricochet.frequency.exponentialRampToValueAtTime(180, t + 0.25);

  ricochetGain.gain.setValueAtTime(0.4, t);
  ricochetGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

  ricochet.connect(ricochetGain);
  ricochetGain.connect(ctx.destination);
  ricochet.start(t);
  ricochet.stop(t + 0.25);
}

// Fanfare / Victory Sound
export function playVictoryFanfare() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 261.63, delay: 0.0, dur: 0.12 }, // C4
    { freq: 329.63, delay: 0.12, dur: 0.12 }, // E4
    { freq: 392.00, delay: 0.24, dur: 0.12 }, // G4
    { freq: 523.25, delay: 0.36, dur: 0.35 }, // C5
    { freq: 392.00, delay: 0.72, dur: 0.12 }, // G4
    { freq: 523.25, delay: 0.86, dur: 0.6 },  // C5 long
  ];

  notes.forEach(({ freq, delay, dur }) => {
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.45, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur);
  });
}

// Gate Completely Exploded / Destroyed Sound
export function playGateExplosion() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;

  // Heavy rumble explosion
  const bufferSize = ctx.sampleRate * 0.8;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(500, t);
  filter.frequency.linearRampToValueAtTime(80, t + 0.8);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.8, t);
  gain.gain.exponentialRampToValueAtTime(0.01, t + 0.8);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(t);
}

// Defeat / sad sound
export function playDefeatSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 440, delay: 0.0, dur: 0.2 },
    { freq: 415, delay: 0.22, dur: 0.2 },
    { freq: 392, delay: 0.44, dur: 0.2 },
    { freq: 349, delay: 0.66, dur: 0.5 },
  ];

  notes.forEach(({ freq, delay, dur }) => {
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur);
  });
}

// Castle wall repaired sound (masonry stone settling chime)
export function playWallRepairedSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const t = ctx.currentTime;

  // Solid stone click / clack
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, t);
  osc.frequency.exponentialRampToValueAtTime(540, t + 0.12);

  gain.gain.setValueAtTime(0.3, t);
  gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.15);

  // Sparkly repair chime
  const chime = ctx.createOscillator();
  const chimeGain = ctx.createGain();
  chime.type = 'triangle';
  chime.frequency.setValueAtTime(659.25, t + 0.05); // E5
  chime.frequency.setValueAtTime(880, t + 0.14);    // A5

  chimeGain.gain.setValueAtTime(0.25, t + 0.05);
  chimeGain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

  chime.connect(chimeGain);
  chimeGain.connect(ctx.destination);
  chime.start(t + 0.05);
  chime.stop(t + 0.35);
}
