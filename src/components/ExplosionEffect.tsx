import { motion } from 'motion/react';

interface ExplosionEffectProps {
  status: 'hit' | 'miss' | 'idle' | 'firing';
}

export default function ExplosionEffect({ status }: ExplosionEffectProps) {
  if (status !== 'hit' && status !== 'miss') return null;

  const isGreen = status === 'hit';

  // 12 directional particles with diverse angles and distances
  const particles = [
    { x: -70, y: -60, size: 8, delay: 0 },
    { x: 0, y: -85, size: 10, delay: 0.03 },
    { x: 65, y: -65, size: 8, delay: 0.02 },
    { x: -85, y: -10, size: 9, delay: 0.04 },
    { x: 85, y: -5, size: 9, delay: 0.01 },
    { x: -60, y: 50, size: 7, delay: 0.05 },
    { x: 0, y: 70, size: 8, delay: 0.02 },
    { x: 60, y: 55, size: 7, delay: 0.04 },
    { x: -40, y: -45, size: 6, delay: 0.02 },
    { x: 45, y: -40, size: 6, delay: 0.03 },
    { x: -35, y: 35, size: 5, delay: 0.05 },
    { x: 40, y: 30, size: 5, delay: 0.01 },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 overflow-visible"
    >
      {/* Background radial flash */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0, 0.9, 0], scale: [0.3, 2.2, 3] }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`absolute w-44 h-44 rounded-full blur-xl ${
          isGreen
            ? 'bg-[radial-gradient(circle,_rgba(52,211,153,0.95)_0%,_rgba(16,185,129,0.7)_40%,_rgba(5,150,105,0)_80%)]'
            : 'bg-[radial-gradient(circle,_rgba(248,113,113,0.95)_0%,_rgba(239,68,68,0.7)_40%,_rgba(185,28,28,0)_80%)]'
        }`}
      />

      {/* Expanding Shockwave Ring */}
      <motion.div
        initial={{ scale: 0.1, opacity: 1, borderWidth: 8 }}
        animate={{ scale: 2.6, opacity: 0, borderWidth: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`absolute w-36 h-36 rounded-full border-solid ${
          isGreen
            ? 'border-emerald-300 shadow-[0_0_35px_rgba(52,211,153,0.9)]'
            : 'border-red-400 shadow-[0_0_35px_rgba(239,68,68,0.9)]'
        }`}
      />

      {/* Secondary Quick Shockwave Ring */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0.8, borderWidth: 6 }}
        animate={{ scale: 1.8, opacity: 0, borderWidth: 2 }}
        transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
        className={`absolute w-32 h-32 rounded-full border-dashed ${
          isGreen
            ? 'border-lime-200 shadow-[0_0_20px_rgba(167,243,208,0.8)]'
            : 'border-orange-300 shadow-[0_0_20px_rgba(254,202,202,0.8)]'
        }`}
      />

      {/* Bursting Debris / Spark Particles */}
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: p.x * 1.5,
            y: p.y * 1.4,
            scale: 0.2,
            opacity: 0,
            rotate: idx % 2 === 0 ? 180 : -180,
          }}
          transition={{ duration: 0.5, delay: p.delay, ease: 'easeOut' }}
          className={`absolute rounded-full shadow-md ${
            isGreen
              ? idx % 3 === 0
                ? 'bg-lime-200 shadow-[0_0_10px_#a7f3d0]'
                : idx % 2 === 0
                ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                : 'bg-emerald-600 shadow-[0_0_6px_#059669]'
              : idx % 3 === 0
              ? 'bg-yellow-200 shadow-[0_0_10px_#fef08a]'
              : idx % 2 === 0
              ? 'bg-red-500 shadow-[0_0_8px_#ef4444]'
              : 'bg-rose-700 shadow-[0_0_6px_#be123c]'
          }`}
          style={{ width: p.size, height: p.size }}
        />
      ))}

      {/* Core Explosion Fiery Cloud (Green vs Red) */}
      <motion.div
        initial={{ scale: 0.2, rotate: 0, opacity: 0 }}
        animate={{
          scale: [0.2, 1.35, 1.15, 0.9],
          rotate: isGreen ? [0, 12, 6, 0] : [0, -12, -6, 0],
          opacity: [0, 1, 0.9, 0],
        }}
        transition={{ duration: 0.75, times: [0, 0.2, 0.6, 1], ease: 'easeOut' }}
        className="relative flex flex-col items-center select-none pointer-events-none"
      >
        {/* Stylized Fiery Blast SVG Icon */}
        <div className="relative">
          <svg
            className={`w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_0_30px_${isGreen ? 'rgba(52,211,153,1)' : 'rgba(239,68,68,1)'}]`}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id={isGreen ? 'greenBlastGrad' : 'redBlastGrad'} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={isGreen ? '#ecfdf5' : '#fff1f2'} />
                <stop offset="30%" stopColor={isGreen ? '#6ee7b7' : '#fca5a5'} />
                <stop offset="65%" stopColor={isGreen ? '#10b981' : '#ef4444'} />
                <stop offset="100%" stopColor={isGreen ? '#064e3b' : '#7f1d1d'} />
              </radialGradient>
            </defs>

            {/* Jagged Explosion Star Shape */}
            <path
              d="M50 0L57 28L85 15L74 41L100 50L74 59L85 85L57 72L50 100L43 72L15 85L26 59L0 50L26 41L15 15L43 28Z"
              fill={`url(#${isGreen ? 'greenBlastGrad' : 'redBlastGrad'})`}
              stroke={isGreen ? '#a7f3d0' : '#fecaca'}
              strokeWidth="2.5"
            />
            {/* Inner Core */}
            <circle
              cx="50"
              cy="50"
              r="18"
              fill={isGreen ? '#ecfdf5' : '#fef08a'}
              opacity="0.85"
            />
            <circle cx="50" cy="50" r="14" fill={isGreen ? '#ffffff' : '#ffffff'} />
          </svg>
        </div>

        {/* Text Announcement Pill */}
        <motion.div
          initial={{ y: 15, opacity: 0, scale: 0.8 }}
          animate={{ y: [15, 0, 0, -5], opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.9] }}
          transition={{ duration: 0.72, times: [0, 0.25, 0.65, 1] }}
          className={`font-jua font-black text-lg sm:text-2xl px-5 py-1.5 rounded-2xl border-3 shadow-2xl mt-1 tracking-wide flex items-center gap-2 ${
            isGreen
              ? 'bg-gradient-to-r from-emerald-700 via-green-600 to-teal-700 text-emerald-100 border-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.8)]'
              : 'bg-gradient-to-r from-red-700 via-rose-600 to-red-800 text-rose-100 border-red-300 shadow-[0_0_30px_rgba(239,68,68,0.8)]'
          }`}
        >
          <span>{isGreen ? '💥 초록빛 폭발! 명중 성공!' : '💥 붉은색 폭발! 방어벽에 폭발!'}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
