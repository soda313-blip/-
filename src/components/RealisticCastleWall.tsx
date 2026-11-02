import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface RealisticCastleWallProps {
  children: ReactNode;
  gateCracks: number; // 0 to 10
  isDamaged: boolean; // hit state
  status: 'idle' | 'firing' | 'hit' | 'miss';
  isDoorDown?: boolean;
}

export default function RealisticCastleWall({
  children,
  gateCracks,
  isDamaged,
  status,
  isDoorDown: forcedDoorDown,
}: RealisticCastleWallProps) {
  const isGreenExplosion = status === 'hit';
  const isRedExplosion = status === 'miss';
  const isDoorDown = forcedDoorDown !== undefined ? forcedDoorDown : (status === 'hit' || isDamaged || gateCracks >= 10);

  return (
    <div className="relative w-full max-w-2xl mx-auto z-10 flex flex-col items-center select-none overflow-visible">
      {/* ======================================================== */}
      {/* 1. CARTOON CASTLE TOWERS & ROOFS (Exact match to reference) */}
      {/* ======================================================== */}
      <div className="relative w-full h-24 sm:h-32 -mb-2 sm:-mb-3 overflow-visible pointer-events-none z-10">
        <svg
          viewBox="0 0 700 240"
          className="w-full h-full overflow-visible drop-shadow-[0_10px_15px_rgba(0,0,0,0.7)]"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            {/* Red Conical Roof Shading Facets */}
            <linearGradient id="roofFacetLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e85342" />
              <stop offset="100%" stopColor="#cf3b2e" />
            </linearGradient>
            <linearGradient id="roofFacetMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c53528" />
              <stop offset="100%" stopColor="#a8281d" />
            </linearGradient>
            <linearGradient id="roofFacetDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#962217" />
              <stop offset="100%" stopColor="#7a180f" />
            </linearGradient>

            {/* Golden Flag Gradient */}
            <linearGradient id="flagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e5982c" />
              <stop offset="50%" stopColor="#f5aa35" />
              <stop offset="100%" stopColor="#d98218" />
            </linearGradient>

            {/* Warm Stone Wall Color */}
            <linearGradient id="stoneWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b1a590" />
              <stop offset="30%" stopColor="#c2b6a1" />
              <stop offset="70%" stopColor="#c5baa6" />
              <stop offset="100%" stopColor="#ada08b" />
            </linearGradient>

            {/* Battlements Dark Brown-Stone */}
            <linearGradient id="battlementGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4c433c" />
              <stop offset="50%" stopColor="#63574e" />
              <stop offset="100%" stopColor="#483f38" />
            </linearGradient>
          </defs>

          {/* ---------------------------------------------------- */}
          {/* A. FAR LEFT TOWER (Tall Outer Tower with Golden Flag) */}
          {/* ---------------------------------------------------- */}
          <g id="tower-far-left">
            {/* Flagpole & Golden Swallowtail Flag */}
            <g id="flag-left">
              {/* Wooden / Iron Flagpole */}
              <line x1="110" y1="18" x2="110" y2="76" stroke="#2c241e" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="110" cy="18" r="4" fill="#f5aa35" stroke="#2c241e" strokeWidth="2" />
              {/* Swallowtail Flag waving right */}
              <path
                d="M 110,22 Q 135,18 160,22 L 146,38 L 162,54 Q 135,48 110,54 Z"
                fill="url(#flagGrad)"
                stroke="#2c241e"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
            </g>

            {/* Red Faceted Conical Roof */}
            <g id="roof-left">
              {/* Left facet (dark) */}
              <polygon points="110,64 68,108 92,108" fill="url(#roofFacetDark)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
              {/* Center-left facet (mid) */}
              <polygon points="110,64 92,108 110,108" fill="url(#roofFacetMid)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
              {/* Center-right facet (light) */}
              <polygon points="110,64 110,108 132,108" fill="url(#roofFacetLight)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
              {/* Right facet (mid) */}
              <polygon points="110,64 132,108 152,108" fill="url(#roofFacetMid)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
              {/* Base Rim line */}
              <line x1="68" y1="108" x2="152" y2="108" stroke="#2c241e" strokeWidth="3.5" />
            </g>

            {/* Dark Crenellated Merlons (Battlements) */}
            <path
              d="M 64,110 
                 L 64,152 L 156,152 L 156,110 
                 L 142,110 L 142,122 L 126,122 L 126,110 
                 L 112,110 L 112,122 L 96,122 L 96,110 
                 L 82,110 L 82,122 L 64,122 Z"
              fill="url(#battlementGrad)"
              stroke="#2c241e"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Stone Shaft Upper */}
            <rect x="74" y="152" width="72" height="88" fill="url(#stoneWallGrad)" stroke="#2c241e" strokeWidth="4" />

            {/* Arched Window on Left Tower */}
            <path
              d="M 98,198 L 98,176 A 12,12 0 0,1 122,176 L 122,198 Z"
              fill="#524840"
              stroke="#2c241e"
              strokeWidth="3.5"
            />
            <path
              d="M 103,196 L 103,178 A 7,7 0 0,1 117,178 L 117,196 Z"
              fill="#251f1b"
            />
            {/* Window Stone Sill */}
            <rect x="94" y="198" width="32" height="6" rx="1.5" fill="#6a5e55" stroke="#2c241e" strokeWidth="2.5" />

            {/* Scattered Accent White Bricks */}
            <rect x="80" y="162" width="16" height="7" rx="1" fill="#ede8dc" stroke="#2c241e" strokeWidth="2" />
            <rect x="130" y="212" width="14" height="6" rx="1" fill="#ede8dc" stroke="#2c241e" strokeWidth="2" />
          </g>

          {/* ---------------------------------------------------- */}
          {/* B. FAR RIGHT TOWER (Tall Outer Tower with Golden Flag)*/}
          {/* ---------------------------------------------------- */}
          <g id="tower-far-right">
            {/* Flagpole & Golden Swallowtail Flag */}
            <g id="flag-right">
              {/* Flagpole */}
              <line x1="590" y1="18" x2="590" y2="76" stroke="#2c241e" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="590" cy="18" r="4" fill="#f5aa35" stroke="#2c241e" strokeWidth="2" />
              {/* Swallowtail Flag waving left */}
              <path
                d="M 590,22 Q 565,18 540,22 L 554,38 L 538,54 Q 565,48 590,54 Z"
                fill="url(#flagGrad)"
                stroke="#2c241e"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
            </g>

            {/* Red Faceted Conical Roof */}
            <g id="roof-right">
              {/* Right facet (dark) */}
              <polygon points="590,64 632,108 608,108" fill="url(#roofFacetDark)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
              {/* Center-right facet (mid) */}
              <polygon points="590,64 608,108 590,108" fill="url(#roofFacetMid)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
              {/* Center-left facet (light) */}
              <polygon points="590,64 590,108 568,108" fill="url(#roofFacetLight)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
              {/* Left facet (mid) */}
              <polygon points="590,64 568,108 548,108" fill="url(#roofFacetMid)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
              {/* Base Rim line */}
              <line x1="548" y1="108" x2="632" y2="108" stroke="#2c241e" strokeWidth="3.5" />
            </g>

            {/* Dark Crenellated Merlons (Battlements) */}
            <path
              d="M 544,110 
                 L 544,152 L 636,152 L 636,110 
                 L 622,110 L 622,122 L 606,122 L 606,110 
                 L 592,110 L 592,122 L 576,122 L 576,110 
                 L 562,110 L 562,122 L 544,122 Z"
              fill="url(#battlementGrad)"
              stroke="#2c241e"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Stone Shaft Upper */}
            <rect x="554" y="152" width="72" height="88" fill="url(#stoneWallGrad)" stroke="#2c241e" strokeWidth="4" />

            {/* Arched Window on Right Tower */}
            <path
              d="M 578,198 L 578,176 A 12,12 0 0,1 602,176 L 602,198 Z"
              fill="#524840"
              stroke="#2c241e"
              strokeWidth="3.5"
            />
            <path
              d="M 583,196 L 583,178 A 7,7 0 0,1 597,178 L 597,196 Z"
              fill="#251f1b"
            />
            {/* Window Stone Sill */}
            <rect x="574" y="198" width="32" height="6" rx="1.5" fill="#6a5e55" stroke="#2c241e" strokeWidth="2.5" />

            {/* Scattered Accent White Bricks */}
            <rect x="604" y="162" width="16" height="7" rx="1" fill="#ede8dc" stroke="#2c241e" strokeWidth="2" />
            <rect x="556" y="212" width="14" height="6" rx="1" fill="#ede8dc" stroke="#2c241e" strokeWidth="2" />
          </g>

          {/* ---------------------------------------------------- */}
          {/* C. CENTER GRAND KEEP (High Tower & Big Conical Roof) */}
          {/* ---------------------------------------------------- */}
          <g id="tower-center-keep">
            {/* Red Faceted Conical Roof (Large) */}
            <g id="roof-center">
              {/* Outer Left facet (dark) */}
              <polygon points="350,22 260,94 300,94" fill="url(#roofFacetDark)" stroke="#2c241e" strokeWidth="4" strokeLinejoin="round" />
              {/* Mid Left facet (mid) */}
              <polygon points="350,22 300,94 350,94" fill="url(#roofFacetMid)" stroke="#2c241e" strokeWidth="4" strokeLinejoin="round" />
              {/* Mid Right facet (light) */}
              <polygon points="350,22 350,94 398,94" fill="url(#roofFacetLight)" stroke="#2c241e" strokeWidth="4" strokeLinejoin="round" />
              {/* Outer Right facet (mid-dark) */}
              <polygon points="350,22 398,94 440,94" fill="url(#roofFacetDark)" stroke="#2c241e" strokeWidth="4" strokeLinejoin="round" />
              {/* Base Rim line */}
              <line x1="260" y1="94" x2="440" y2="94" stroke="#2c241e" strokeWidth="4" />
            </g>

            {/* Dark Crenellated Merlons (Large Central Keep) */}
            <path
              d="M 252,94 
                 L 252,142 L 448,142 L 448,94 
                 L 426,94 L 426,110 L 398,110 L 398,94 
                 L 370,94 L 370,110 L 330,110 L 330,94 
                 L 302,94 L 302,110 L 274,110 L 274,94 Z"
              fill="url(#battlementGrad)"
              stroke="#2c241e"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Central Keep Stone Shaft */}
            <rect x="260" y="142" width="180" height="98" fill="url(#stoneWallGrad)" stroke="#2c241e" strokeWidth="4" />

            {/* Large Central Arched Window */}
            <path
              d="M 326,204 L 326,170 A 24,24 0 0,1 374,170 L 374,204 Z"
              fill="#524840"
              stroke="#2c241e"
              strokeWidth="4"
            />
            <path
              d="M 334,202 L 334,173 A 16,16 0 0,1 366,173 L 366,202 Z"
              fill="#251f1b"
            />
            {/* Center Window Sill */}
            <rect x="320" y="204" width="60" height="8" rx="2" fill="#6a5e55" stroke="#2c241e" strokeWidth="3" />

            {/* Center Tower White Accent Bricks */}
            <rect x="274" y="160" width="22" height="9" rx="1.5" fill="#ede8dc" stroke="#2c241e" strokeWidth="2.5" />
            <rect x="274" y="196" width="20" height="8" rx="1.5" fill="#ede8dc" stroke="#2c241e" strokeWidth="2.5" />
            <rect x="404" y="160" width="22" height="9" rx="1.5" fill="#ede8dc" stroke="#2c241e" strokeWidth="2.5" />
            <rect x="408" y="196" width="20" height="8" rx="1.5" fill="#ede8dc" stroke="#2c241e" strokeWidth="2.5" />
          </g>

          {/* ---------------------------------------------------- */}
          {/* D. MID-LEFT BASTION TOWER (Stepped Forward)          */}
          {/* ---------------------------------------------------- */}
          <g id="tower-mid-left">
            {/* Conical Roof */}
            <polygon points="190,102 152,148 180,148" fill="url(#roofFacetDark)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="190,102 180,148 195,148" fill="url(#roofFacetMid)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="190,102 195,148 214,148" fill="url(#roofFacetLight)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="190,102 214,148 228,148" fill="url(#roofFacetMid)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
            <line x1="152" y1="148" x2="228" y2="148" stroke="#2c241e" strokeWidth="3.5" />

            {/* Dark Merlons */}
            <path
              d="M 148,148 L 148,188 L 232,188 L 232,148 L 218,148 L 218,160 L 202,160 L 202,148 L 186,148 L 186,160 L 170,160 L 170,148 Z"
              fill="url(#battlementGrad)"
              stroke="#2c241e"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Tower Shaft */}
            <rect x="156" y="188" width="68" height="52" fill="url(#stoneWallGrad)" stroke="#2c241e" strokeWidth="3.5" />
            {/* Accent Brick */}
            <rect x="176" y="204" width="16" height="7" rx="1" fill="#ede8dc" stroke="#2c241e" strokeWidth="2" />
          </g>

          {/* ---------------------------------------------------- */}
          {/* E. MID-RIGHT BASTION TOWER (Stepped Forward)         */}
          {/* ---------------------------------------------------- */}
          <g id="tower-mid-right">
            {/* Conical Roof */}
            <polygon points="510,102 472,148 500,148" fill="url(#roofFacetMid)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="510,102 500,148 515,148" fill="url(#roofFacetLight)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="510,102 515,148 534,148" fill="url(#roofFacetMid)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
            <polygon points="510,102 534,148 548,148" fill="url(#roofFacetDark)" stroke="#2c241e" strokeWidth="3.5" strokeLinejoin="round" />
            <line x1="472" y1="148" x2="548" y2="148" stroke="#2c241e" strokeWidth="3.5" />

            {/* Dark Merlons */}
            <path
              d="M 468,148 L 468,188 L 552,188 L 552,148 L 538,148 L 538,160 L 522,160 L 522,148 L 506,148 L 506,160 L 490,160 L 490,148 Z"
              fill="url(#battlementGrad)"
              stroke="#2c241e"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Tower Shaft */}
            <rect x="476" y="188" width="68" height="52" fill="url(#stoneWallGrad)" stroke="#2c241e" strokeWidth="3.5" />
            {/* Accent Brick */}
            <rect x="508" y="204" width="16" height="7" rx="1" fill="#ede8dc" stroke="#2c241e" strokeWidth="2" />
          </g>

          {/* Connecting Wall Parapet Crenellations behind gate */}
          <path
            d="M 224,204 L 224,188 L 244,188 L 244,198 L 268,198 L 268,188 L 292,188 L 292,204 Z"
            fill="url(#battlementGrad)"
            stroke="#2c241e"
            strokeWidth="3.5"
          />
          <path
            d="M 408,204 L 408,188 L 432,188 L 432,198 L 456,198 L 456,188 L 476,188 L 476,204 Z"
            fill="url(#battlementGrad)"
            stroke="#2c241e"
            strokeWidth="3.5"
          />
        </svg>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN FORTRESS WALL BODY & EMBEDDED WOODEN GATE        */}
      {/* ======================================================== */}
      <div
        className={`relative w-full rounded-2xl sm:rounded-3xl border-4 p-2.5 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 ${
          isGreenExplosion
            ? 'border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.8)] bg-[#bdafa0]'
            : isRedExplosion
            ? 'border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.8)] bg-[#bdafa0]'
            : 'border-[#2d251f] bg-[#c3b7a5]'
        }`}
      >
        {/* Cartoon Warm Stone Masonry Wall Background */}
        <div className="absolute inset-0 bg-[#c2b6a2] pointer-events-none" />

        {/* Scattered White Stone Accent Bricks across the wall (as in reference image) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-90">
          <div className="absolute top-4 left-6 w-8 h-3.5 rounded-xs bg-[#efebe1] border-2 border-[#2d251f]" />
          <div className="absolute top-14 left-16 w-10 h-4 rounded-xs bg-[#efebe1] border-2 border-[#2d251f]" />
          <div className="absolute bottom-6 left-8 w-9 h-3.5 rounded-xs bg-[#efebe1] border-2 border-[#2d251f]" />
          <div className="absolute top-4 right-6 w-8 h-3.5 rounded-xs bg-[#efebe1] border-2 border-[#2d251f]" />
          <div className="absolute top-14 right-16 w-10 h-4 rounded-xs bg-[#efebe1] border-2 border-[#2d251f]" />
          <div className="absolute bottom-6 right-8 w-9 h-3.5 rounded-xs bg-[#efebe1] border-2 border-[#2d251f]" />
        </div>

        {/* Subdued Stone Masonry Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="w-full h-full flex flex-col justify-between">
            {[0, 1, 2, 3, 4, 5].map((r) => (
              <div key={r} className="w-full h-8 flex border-b border-[#2d251f]">
                <div className="flex-1 border-r border-[#2d251f]" />
                <div className="flex-1 border-r border-[#2d251f]" />
                <div className="flex-1 border-r border-[#2d251f]" />
                <div className="flex-1 border-r border-[#2d251f]" />
              </div>
            ))}
          </div>
        </div>

        {/* Green/Red Impact Lighting Flash Overlay */}
        {isGreenExplosion && (
          <motion.div
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 bg-emerald-400/40 pointer-events-none z-30"
          />
        )}
        {isRedExplosion && (
          <motion.div
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 bg-rose-500/40 pointer-events-none z-30"
          />
        )}

        {/* ======================================================== */}
        {/* 3. INNER CONTENT: QUESTION BANNER & CRACK OVERLAY        */}
        {/* ======================================================== */}
        <div className="relative z-10">{children}</div>

        {/* ======================================================== */}
        {/* 4. CARTOON ARCHED WOODEN GATEWAY (Exact match to reference) */}
        {/* ======================================================== */}
        <div className="mt-3 relative flex flex-col items-center justify-center">
          {/* Arched Castle Gateway Assembly */}
          <div className="relative w-48 sm:w-60 h-28 sm:h-32 flex flex-col items-center justify-end overflow-hidden drop-shadow-lg">
            {/* Outer Dark Charcoal Stone Arch Surround */}
            <div className="absolute inset-0 rounded-t-full bg-[#3d342d] border-4 border-[#241e1a] shadow-inner flex flex-col items-center justify-end overflow-hidden">
              {/* Stone Voussoirs / Arch Keystone Accents */}
              <div className="absolute top-0 inset-x-0 h-4 flex justify-between px-4 opacity-70">
                <div className="w-3 h-3 border-r-2 border-[#241e1a]" />
                <div className="w-4 h-4 bg-[#4a4037] border-x-2 border-b-2 border-[#241e1a] rounded-b-sm" />
                <div className="w-3 h-3 border-l-2 border-[#241e1a]" />
              </div>
            </div>

            {/* Castle Interior / Gateway Tunnel (Revealed when door goes fully down) */}
            <div className="absolute inset-x-2 bottom-0 h-[88%] rounded-t-full bg-gradient-to-b from-[#18110b] via-[#24170e] to-[#120b06] border-x-2 border-t-2 border-[#1c1510] overflow-hidden flex flex-col items-center justify-between p-2 shadow-inner">
              {/* Stone Flagstone Floor & Hallway Perspective */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/30 via-amber-950/20 to-black/80 pointer-events-none" />

              {/* Two Flickering Torches inside the castle hall */}
              <div className="w-full flex items-center justify-between px-2 pt-1 z-10">
                <div className="flex flex-col items-center animate-bounce">
                  <span className="text-sm">🔥</span>
                  <div className="w-1.5 h-3 bg-stone-700 rounded-xs" />
                </div>
                <div className="text-[10px] sm:text-xs font-jua text-yellow-300 font-bold bg-black/70 px-2.5 py-0.5 rounded-full border border-yellow-500/50 shadow-md">
                  성문 돌파 완료! ⚔️
                </div>
                <div className="flex flex-col items-center animate-bounce">
                  <span className="text-sm">🔥</span>
                  <div className="w-1.5 h-3 bg-stone-700 rounded-xs" />
                </div>
              </div>

              {/* Warm Hallway Light & Castle Courtyard Road */}
              <div className="relative z-10 text-center pb-1">
                <div className="text-[11px] font-jua text-amber-200 tracking-wide drop-shadow flex items-center gap-1 justify-center">
                  <span>🏰</span>
                  <span>성 안으로 진입 성공!</span>
                  <span>✨</span>
                </div>
              </div>
            </div>

            {/* Suspension Iron Chains on sides */}
            <div className="absolute top-2 left-3 w-1 h-20 bg-stone-700 border-x border-[#1a1410] z-25 opacity-80" />
            <div className="absolute top-2 right-3 w-1 h-20 bg-stone-700 border-x border-[#1a1410] z-25 opacity-80" />

            {/* The Heavy Wooden Castle Gate Door Panels that Go FULLY DOWN */}
            <motion.div
              initial={false}
              animate={{
                y: isDoorDown ? '108%' : '0%',
              }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 14,
                mass: 1.1,
              }}
              className="relative w-[90%] h-[90%] rounded-t-full bg-[#bd9a66] border-x-3 border-t-3 border-[#241e1a] overflow-hidden flex shadow-2xl z-20 origin-bottom"
            >
              {/* Left Door Leaf */}
              <div className="w-1/2 h-full border-r-2 border-[#241e1a] bg-gradient-to-r from-[#ab8857] via-[#bd9a66] to-[#af8d5a] flex flex-col justify-between p-1">
                <div className="w-0.5 h-full bg-[#8c6b3e]/30 mx-auto" />
                <div className="w-2 h-2 rounded-full bg-[#241e1a] mx-auto shadow" />
              </div>

              {/* Right Door Leaf */}
              <div className="w-1/2 h-full bg-gradient-to-r from-[#bd9a66] via-[#c6a470] to-[#ad8a59] flex flex-col justify-between p-1">
                <div className="w-0.5 h-full bg-[#8c6b3e]/30 mx-auto" />
                <div className="w-2 h-2 rounded-full bg-[#241e1a] mx-auto shadow" />
              </div>

              {/* Horizontal Iron Strap Crossbar */}
              <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-4.5 bg-[#72747a] border-y-2 border-[#241e1a] shadow flex items-center justify-around px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#241e1a]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#241e1a]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#241e1a]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#241e1a]" />
              </div>

              {/* Iron Ring Door Knocker */}
              <div className="absolute top-1/2 translate-y-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#241e1a] bg-[#4a4744]/60 pointer-events-none" />

              {/* Procedural Stone & Wood Cracks (Deepening with each hit) */}
              {gateCracks > 0 && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-20"
                  viewBox="0 0 100 80"
                  fill="none"
                >
                  <path
                    d="M 50,10 L 48,25 L 53,40 L 47,55 L 51,75"
                    stroke="#000000"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 50,10 L 48,25 L 53,40 L 47,55 L 51,75"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  {gateCracks >= 3 && (
                    <path
                      d="M 48,25 L 32,35 L 20,30 L 15,48"
                      stroke="#000000"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  )}

                  {gateCracks >= 5 && (
                    <path
                      d="M 53,40 L 68,48 L 80,42 L 88,60"
                      stroke="#000000"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  )}

                  {gateCracks >= 8 && (
                    <path
                      d="M 28,15 L 42,32 L 62,28 L 78,16"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                    />
                  )}
                </svg>
              )}
            </motion.div>

            {/* Threshold Stone Beam */}
            <div className="absolute bottom-0 inset-x-0 h-2 bg-[#2d251e] border-t border-[#1a1410] z-25" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. BOTTOM FORTRESS BASE & STONE HEALTH PROGRESS GAUGE    */}
        {/* ======================================================== */}
        <div className="mt-2.5 flex items-center justify-between px-2 text-xs font-jua">
          <div className="flex items-center gap-1.5 text-stone-900 font-extrabold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse shadow-[0_0_6px_rgba(217,119,6,0.9)]" />
            <span className="tracking-wide text-stone-900">성문 내구도:</span>
          </div>

          {/* 10 Stone Block Indicators */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 10 }).map((_, i) => {
              const isCracked = i < gateCracks;
              return (
                <div
                  key={i}
                  className={`w-3 sm:w-4.5 h-3 rounded-xs transition-all duration-300 border-2 ${
                    isCracked
                      ? 'bg-gradient-to-t from-red-600 via-amber-500 to-yellow-300 border-[#241e1a] shadow-[0_0_6px_rgba(245,158,11,0.9)]'
                      : 'bg-[#524941] border-[#241e1a]'
                  }`}
                  title={`성문 돌파 석조 블록 ${i + 1}`}
                />
              );
            })}
          </div>

          <div className="text-stone-950 font-black tracking-wider bg-[#d9cebe] px-2.5 py-0.5 rounded-md border-2 border-[#241e1a]">
            {gateCracks}/10 돌파
          </div>
        </div>
      </div>
    </div>
  );
}
