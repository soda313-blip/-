import { motion } from 'motion/react';

interface RealisticCannonProps {
  isFiring: boolean;
  selectedOption: string | null;
}

export default function RealisticCannon({ isFiring }: RealisticCannonProps) {
  return (
    <div className="relative flex flex-col items-center justify-end z-20 overflow-visible select-none pointer-events-none mb-0">
      {/* Ground Contact Oval Shadow */}
      <div className="absolute bottom-1 w-48 sm:w-56 h-6 bg-black/60 rounded-full blur-md" />

      {/* Main Animated Cannon Rig */}
      <motion.div
        animate={
          isFiring
            ? {
                y: [0, 14, -3, 0],
                scaleX: [1, 1.07, 0.97, 1],
                scaleY: [1, 0.91, 1.03, 1],
              }
            : { y: 0, scaleX: 1, scaleY: 1 }
        }
        transition={{ duration: 0.42, ease: 'easeOut' }}
        className="relative flex flex-col items-center"
      >
        {/* ======================================================== */}
        {/* CARTOON MUZZLE BLAST & SMOKE RINGS (When Firing)         */}
        {/* ======================================================== */}
        {isFiring && (
          <div className="absolute -top-12 z-40 flex flex-col items-center pointer-events-none">
            {/* Cartoon Smoke Cloud Rings */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1, y: 10 }}
              animate={{ scale: [0.2, 1.6, 2.2], opacity: [1, 0.85, 0], y: -40 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute w-24 h-24 rounded-full bg-stone-300/80 border-4 border-white/60 blur-[1px] flex items-center justify-center"
            >
              <div className="w-14 h-14 rounded-full bg-stone-100/90" />
            </motion.div>

            {/* Comic Starburst Muzzle Flame */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1, rotate: 0 }}
              animate={{ scale: [0.2, 1.45, 1.1], opacity: [1, 1, 0], rotate: 30 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative flex items-center justify-center"
            >
              <svg className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_0_25px_rgba(251,191,36,1)]" viewBox="0 0 100 100">
                <polygon
                  points="50,0 62,35 98,20 75,50 100,75 65,70 50,100 35,70 0,75 25,50 2,20 38,35"
                  fill="#f59e0b"
                  stroke="#fbbf24"
                  strokeWidth="3"
                />
                <polygon
                  points="50,15 58,40 85,30 68,50 85,70 60,65 50,85 40,65 15,70 32,50 15,30 42,40"
                  fill="#fef08a"
                />
                <circle cx="50" cy="50" r="14" fill="#ffffff" />
              </svg>
            </motion.div>

            {/* Flying Sparks */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
              className="absolute -top-4 flex gap-6 text-sm font-black text-amber-300 animate-ping"
            >
              <span>✨</span>
              <span>💥</span>
              <span>✨</span>
            </motion.div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CARTOON CANNON CHARACTER SVG (No Side Wheels, Clean Fuse)*/}
        {/* ======================================================== */}
        <svg
          viewBox="0 0 260 210"
          className="w-56 sm:w-64 md:w-72 h-auto overflow-visible drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)]"
        >
          <defs>
            {/* Dark Slate Metallic Shading for the Spherical Body */}
            <radialGradient id="bodyGradient" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#4a5568" />
              <stop offset="35%" stopColor="#2d3748" />
              <stop offset="75%" stopColor="#1a202c" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>

            {/* Cylindrical Barrel Metal Gradient */}
            <linearGradient id="barrelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a202c" />
              <stop offset="25%" stopColor="#4a5568" />
              <stop offset="55%" stopColor="#334155" />
              <stop offset="85%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Flanged Muzzle Rim Lip Gradient */}
            <linearGradient id="rimLipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="40%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            {/* Dark Bore Powder Hole */}
            <radialGradient id="boreGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="75%" stopColor="#050811" />
              <stop offset="100%" stopColor="#1a202c" />
            </radialGradient>

            {/* Rope Fuse Color */}
            <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ecdcb9" />
              <stop offset="50%" stopColor="#c8ad7f" />
              <stop offset="100%" stopColor="#8d6e3f" />
            </linearGradient>

            {/* Brass Fuse Collar Socket Gradient */}
            <linearGradient id="fuseSocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="60%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* ======================================================= */}
          {/* 1. SIZZLING ROPE FUSE & COLLAR (Firmly Connected to Body) */}
          {/* ======================================================= */}
          <g id="cannon-fuse-assembly">
            {/* Brass / Iron Socket directly on top-left surface of sphere body */}
            <ellipse
              cx="86"
              cy="76"
              rx="9"
              ry="5"
              fill="url(#fuseSocketGrad)"
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            {/* Socket Hole */}
            <ellipse cx="86" cy="76" rx="5" ry="2.5" fill="#0f172a" />

            {/* Shadow under fuse */}
            <path
              d="M 86,76 C 72,56 50,42 34,48 C 24,52 20,44 14,48"
              fill="none"
              stroke="#000000"
              strokeWidth="11"
              strokeLinecap="round"
              opacity="0.3"
            />
            {/* Outer dark stroke for cartoon style */}
            <path
              d="M 86,76 C 72,56 50,42 34,48 C 24,52 20,44 14,48"
              fill="none"
              stroke="#1e1810"
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            {/* Inner textured rope cord */}
            <path
              d="M 86,76 C 72,56 50,42 34,48 C 24,52 20,44 14,48"
              fill="none"
              stroke="url(#ropeGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {/* Rope Twists / Ribs */}
            <path d="M 76,64 L 72,59" stroke="#684f2b" strokeWidth="2" strokeLinecap="round" />
            <path d="M 62,53 L 59,48" stroke="#684f2b" strokeWidth="2" strokeLinecap="round" />
            <path d="M 48,46 L 46,41" stroke="#684f2b" strokeWidth="2" strokeLinecap="round" />
            <path d="M 35,48 L 33,43" stroke="#684f2b" strokeWidth="2" strokeLinecap="round" />
            <path d="M 23,48 L 21,43" stroke="#684f2b" strokeWidth="2" strokeLinecap="round" />

            {/* Frayed Tip Fibers */}
            <path d="M 14,48 L 6,45 M 14,48 L 5,50 M 14,48 L 8,54" stroke="#c8ad7f" strokeWidth="2" strokeLinecap="round" />

            {/* Animated Sizzling Fuse Spark Star */}
            <g transform="translate(6, 48)">
              <circle cx="0" cy="0" r="6" fill="#f59e0b" opacity="0.6" className="animate-ping" />
              <polygon
                points="0,-7 2,-2 7,0 2,2 0,7 -2,2 -7,0 -2,-2"
                fill="#fef08a"
                stroke="#f59e0b"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
            </g>
          </g>

          {/* ======================================================= */}
          {/* 2. MAIN SPHERICAL CANNON BODY (Round Cartoon Bomb Shape)*/}
          {/* ======================================================= */}
          <g id="cannon-body">
            {/* Main Bomb Sphere (Centered at X:130, Y:130) */}
            <circle
              cx="130"
              cy="130"
              r="68"
              fill="url(#bodyGradient)"
              stroke="#0f172a"
              strokeWidth="5"
            />

            {/* Stylized Curved Comic Specular Reflection (Top-Left Shoulder) */}
            <path
              d="M 88,86 C 104,74 126,71 146,75"
              fill="none"
              stroke="#64748b"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 94,83 C 107,74 123,72 138,75"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>

          {/* ======================================================= */}
          {/* 3. CHUNKY FORWARD-ANGLED MUZZLE (Tube & Rim Lip)        */}
          {/* ======================================================= */}
          <g id="cannon-muzzle">
            {/* Muzzle Tube extending forward/upward toward the castle */}
            <path
              d="M 92,112 L 86,54 L 174,54 L 168,112 Z"
              fill="url(#barrelGradient)"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* Muzzle Astragal Ring / Joint Line */}
            <path
              d="M 90,92 Q 130,98 170,92"
              fill="none"
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 92,93 Q 130,99 168,93"
              fill="none"
              stroke="#475569"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Outer Thick Rounded Muzzle Rim Collar (The iconic flanged lip) */}
            <ellipse
              cx="130"
              cy="52"
              rx="48"
              ry="19"
              fill="url(#rimLipGradient)"
              stroke="#0f172a"
              strokeWidth="5"
            />

            {/* Outer Rim Lip Highlight Bevel */}
            <ellipse
              cx="130"
              cy="50"
              rx="46"
              ry="17"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Deep Dark Powder Bore Hole (The wide circular cannon opening) */}
            <ellipse
              cx="130"
              cy="52"
              rx="35"
              ry="13"
              fill="url(#boreGradient)"
              stroke="#090d16"
              strokeWidth="3"
            />

            {/* Subtle internal depth ring */}
            <ellipse
              cx="130"
              cy="53"
              rx="26"
              ry="8"
              fill="#000000"
            />
          </g>

          {/* ======================================================= */}
          {/* 4. CARTOON FACE: FIERCE EYES & SHARP-TOOTHED GRIN       */}
          {/* ======================================================= */}
          <g id="cannon-character-face">
            {/* LEFT CARTOON EYE (Determined & Fierce) */}
            <g id="left-eye">
              {/* White Eyeball */}
              <path
                d="M 68,106 C 68,96 80,94 90,99 C 92,107 88,118 78,118 C 71,118 68,113 68,106 Z"
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Amber/Orange Iris */}
              <circle cx="81" cy="107" r="6.5" fill="#ea580c" />
              <circle cx="81" cy="107" r="4.5" fill="#f59e0b" />
              {/* Black Pupil */}
              <circle cx="81" cy="107" r="3.2" fill="#0f172a" />
              {/* Specular White Catchlight Glint */}
              <circle cx="83" cy="105" r="1.5" fill="#ffffff" />

              {/* Heavy Determined Cartoon Eyebrow / Eyelid Hood */}
              <path
                d="M 65,99 Q 80,91 94,100"
                fill="none"
                stroke="#0f172a"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M 64,96 C 74,89 86,90 94,98"
                fill="none"
                stroke="#475569"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* RIGHT CARTOON EYE (Symmetric Determined Look Toward Fortress) */}
            <g id="right-eye">
              {/* White Eyeball */}
              <path
                d="M 192,106 C 192,96 180,94 170,99 C 168,107 172,118 182,118 C 189,118 192,113 192,106 Z"
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Amber/Orange Iris */}
              <circle cx="179" cy="107" r="6.5" fill="#ea580c" />
              <circle cx="179" cy="107" r="4.5" fill="#f59e0b" />
              {/* Black Pupil */}
              <circle cx="179" cy="107" r="3.2" fill="#0f172a" />
              {/* Specular White Catchlight Glint */}
              <circle cx="177" cy="105" r="1.5" fill="#ffffff" />

              {/* Heavy Determined Cartoon Eyebrow / Eyelid Hood */}
              <path
                d="M 195,99 Q 180,91 166,100"
                fill="none"
                stroke="#0f172a"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M 196,96 C 186,89 174,90 166,98"
                fill="none"
                stroke="#475569"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* MISCHIEVOUS TOOTHY GRIN (Exact match to reference art) */}
            <g id="cannon-mouth">
              {/* Mouth Cavity */}
              <path
                d="M 94,146 Q 130,180 166,146 Q 130,156 94,146 Z"
                fill="#0f172a"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Sharp Cartoon White Teeth (Top Row) */}
              <polygon points="100,148 105,155 111,149" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
              <polygon points="111,149 116,158 123,150" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
              <polygon points="123,150 130,160 137,150" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
              <polygon points="137,150 144,158 149,149" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
              <polygon points="149,149 155,155 160,148" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />

              {/* Sharp Cartoon White Teeth (Bottom Row) */}
              <polygon points="105,157 111,152 116,162" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
              <polygon points="117,163 123,153 130,167" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
              <polygon points="130,167 137,153 143,163" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
              <polygon points="144,162 149,152 155,157" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />

              {/* Cheerful/Mischievous Smile Corner Creases */}
              <path d="M 90,143 C 92,146 94,149 96,152" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M 170,143 C 168,146 166,149 164,152" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
