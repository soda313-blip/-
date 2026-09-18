interface CastleIllustrationProps {
  className?: string;
}

export default function CastleIllustration({ className = 'w-full h-full' }: CastleIllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Crisp Cartoon Colors matching the reference image */}
        {/* Red Roof Facets */}
        <linearGradient id="cRoofDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#aa2b20" />
          <stop offset="100%" stopColor="#871d14" />
        </linearGradient>
        <linearGradient id="cRoofMid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9382b" />
          <stop offset="100%" stopColor="#ab291e" />
        </linearGradient>
        <linearGradient id="cRoofLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#df4738" />
          <stop offset="100%" stopColor="#c9382b" />
        </linearGradient>

        {/* Flag Golden Amber */}
        <linearGradient id="cFlagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#df9429" />
          <stop offset="50%" stopColor="#f5aa35" />
          <stop offset="100%" stopColor="#ca7e17" />
        </linearGradient>

        {/* Warm Gray-Beige Stone Wall */}
        <linearGradient id="cWallStone" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b4a895" />
          <stop offset="50%" stopColor="#c3b8a6" />
          <stop offset="100%" stopColor="#b0a490" />
        </linearGradient>

        {/* Dark Charcoal-Brown Battlements */}
        <linearGradient id="cBattlement" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#544c44" />
          <stop offset="50%" stopColor="#675d54" />
          <stop offset="100%" stopColor="#504840" />
        </linearGradient>

        {/* Wooden Gate Texture */}
        <linearGradient id="cWoodDoor" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b18f59" />
          <stop offset="50%" stopColor="#c3a26d" />
          <stop offset="100%" stopColor="#aa8852" />
        </linearGradient>
      </defs>

      {/* ========================================================= */}
      {/* 1. BACKGROUND / TALL TOWERS & CENTRAL KEEP                */}
      {/* ========================================================= */}

      {/* ----------------- FAR-LEFT OUTER TOWER ----------------- */}
      <g id="far-left-tower">
        {/* Flagpole & Golden Swallowtail Pennant Flag */}
        <line x1="84" y1="92" x2="84" y2="200" stroke="#251f1b" strokeWidth="3" />
        <circle cx="84" cy="92" r="3" fill="#e8a230" stroke="#251f1b" strokeWidth="1.5" />
        {/* Golden Flag */}
        <path
          d="M 84,96 Q 110,92 136,96 L 122,112 L 138,128 Q 110,122 84,128 Z"
          fill="url(#cFlagGrad)"
          stroke="#251f1b"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Red Conical Roof with Panels */}
        <polygon points="84,125 45,178 68,178" fill="url(#cRoofDark)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="84,125 68,178 84,178" fill="url(#cRoofMid)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="84,125 84,178 104,178" fill="url(#cRoofLight)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="84,125 104,178 123,178" fill="url(#cRoofMid)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <line x1="45" y1="178" x2="123" y2="178" stroke="#251f1b" strokeWidth="3" />

        {/* Battlement / Merlons */}
        <path
          d="M 40,178 L 40,225 L 128,225 L 128,178 
             L 114,178 L 114,192 L 100,192 L 100,178 
             L 86,178 L 86,192 L 72,192 L 72,178 
             L 58,178 L 58,192 L 44,192 L 44,178 Z"
          fill="url(#cBattlement)"
          stroke="#251f1b"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Upper Wall Shaft */}
        <rect x="49" y="225" width="70" height="95" fill="url(#cWallStone)" stroke="#251f1b" strokeWidth="3.5" />

        {/* Arched Window */}
        <path d="M 72,274 L 72,250 A 12,12 0 0,1 96,250 L 96,274 Z" fill="#4d443c" stroke="#251f1b" strokeWidth="3" />
        <path d="M 77,272 L 77,252 A 7,7 0 0,1 91,252 L 91,272 Z" fill="#201a16" />
        <rect x="68" y="274" width="32" height="6" rx="1.5" fill="#675d54" stroke="#251f1b" strokeWidth="2.5" />

        {/* Accent Bricks */}
        <rect x="56" y="235" width="14" height="6" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
        <rect x="98" y="295" width="14" height="6" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />

        {/* Lower Stepped Wall Battlement */}
        <path
          d="M 32,320 L 32,342 L 118,342 L 118,320 
             L 104,320 L 104,328 L 88,328 L 88,320 
             L 72,320 L 72,328 L 56,328 L 56,320 Z"
          fill="url(#cBattlement)"
          stroke="#251f1b"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Lower Wall Shaft down to ground */}
        <rect x="42" y="342" width="70" height="88" fill="url(#cWallStone)" stroke="#251f1b" strokeWidth="3.5" />
        <rect x="48" y="385" width="16" height="7" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
      </g>

      {/* ----------------- FAR-RIGHT OUTER TOWER ----------------- */}
      <g id="far-right-tower">
        {/* Flagpole & Golden Swallowtail Pennant Flag */}
        <line x1="416" y1="92" x2="416" y2="200" stroke="#251f1b" strokeWidth="3" />
        <circle cx="416" cy="92" r="3" fill="#e8a230" stroke="#251f1b" strokeWidth="1.5" />
        {/* Golden Flag */}
        <path
          d="M 416,96 Q 390,92 364,96 L 378,112 L 362,128 Q 390,122 416,128 Z"
          fill="url(#cFlagGrad)"
          stroke="#251f1b"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Red Conical Roof with Panels */}
        <polygon points="416,125 455,178 432,178" fill="url(#cRoofDark)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="416,125 432,178 416,178" fill="url(#cRoofMid)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="416,125 416,178 396,178" fill="url(#cRoofLight)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="416,125 396,178 377,178" fill="url(#cRoofMid)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <line x1="377" y1="178" x2="455" y2="178" stroke="#251f1b" strokeWidth="3" />

        {/* Battlement / Merlons */}
        <path
          d="M 372,178 L 372,225 L 460,225 L 460,178 
             L 446,178 L 446,192 L 432,192 L 432,178 
             L 418,178 L 418,192 L 404,192 L 404,178 
             L 390,178 L 390,192 L 376,192 L 376,178 Z"
          fill="url(#cBattlement)"
          stroke="#251f1b"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Upper Wall Shaft */}
        <rect x="381" y="225" width="70" height="95" fill="url(#cWallStone)" stroke="#251f1b" strokeWidth="3.5" />

        {/* Arched Window */}
        <path d="M 404,274 L 404,250 A 12,12 0 0,1 428,250 L 428,274 Z" fill="#4d443c" stroke="#251f1b" strokeWidth="3" />
        <path d="M 409,272 L 409,252 A 7,7 0 0,1 423,252 L 423,272 Z" fill="#201a16" />
        <rect x="400" y="274" width="32" height="6" rx="1.5" fill="#675d54" stroke="#251f1b" strokeWidth="2.5" />

        {/* Accent Bricks */}
        <rect x="430" y="235" width="14" height="6" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
        <rect x="388" y="295" width="14" height="6" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />

        {/* Lower Stepped Wall Battlement */}
        <path
          d="M 382,320 L 382,342 L 468,342 L 468,320 
             L 454,320 L 454,328 L 438,328 L 438,320 
             L 422,320 L 422,328 L 406,328 L 406,320 Z"
          fill="url(#cBattlement)"
          stroke="#251f1b"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Lower Wall Shaft down to ground */}
        <rect x="388" y="342" width="70" height="88" fill="url(#cWallStone)" stroke="#251f1b" strokeWidth="3.5" />
        <rect x="436" y="385" width="16" height="7" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
      </g>

      {/* ----------------- CENTER GRAND KEEP ----------------- */}
      <g id="center-grand-keep">
        {/* Large Conical Roof with Faceted Shading Panels */}
        <polygon points="250,98 182,176 215,176" fill="url(#cRoofDark)" stroke="#251f1b" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="250,98 215,176 250,176" fill="url(#cRoofMid)" stroke="#251f1b" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="250,98 250,176 288,176" fill="url(#cRoofLight)" stroke="#251f1b" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="250,98 288,176 318,176" fill="url(#cRoofDark)" stroke="#251f1b" strokeWidth="4" strokeLinejoin="round" />
        {/* Conical Roof Mid Horiz Tile Line */}
        <path d="M 215,138 Q 250,144 285,138" stroke="#251f1b" strokeWidth="3" fill="none" />
        <line x1="182" y1="176" x2="318" y2="176" stroke="#251f1b" strokeWidth="4" />

        {/* Center Keep Battlement Merlons */}
        <path
          d="M 172,176 L 172,218 L 328,218 L 328,176 
             L 310,176 L 310,192 L 288,192 L 288,176 
             L 266,176 L 266,192 L 234,192 L 234,176 
             L 212,176 L 212,192 L 190,192 L 190,176 Z"
          fill="url(#cBattlement)"
          stroke="#251f1b"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Center Keep Wall Shaft */}
        <rect x="180" y="218" width="140" height="96" fill="url(#cWallStone)" stroke="#251f1b" strokeWidth="4" />

        {/* Large Arched Center Window */}
        <path d="M 233,264 L 233,234 A 17,17 0 0,1 267,234 L 267,264 Z" fill="#4d443c" stroke="#251f1b" strokeWidth="3.5" />
        <path d="M 239,262 L 239,236 A 11,11 0 0,1 261,236 L 261,262 Z" fill="#201a16" />
        <rect x="228" y="264" width="44" height="7" rx="2" fill="#675d54" stroke="#251f1b" strokeWidth="3" />

        {/* Accent Bricks around Center Window */}
        <rect x="192" y="228" width="16" height="7" rx="1.5" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
        <rect x="192" y="255" width="16" height="7" rx="1.5" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
        <rect x="292" y="228" width="16" height="7" rx="1.5" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
        <rect x="292" y="255" width="16" height="7" rx="1.5" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
      </g>

      {/* ----------------- CENTRAL WALL BATTLEMENT WALKWAY ----------------- */}
      <path
        d="M 160,305 L 160,286 L 190,286 L 190,296 L 220,296 L 220,286 
           L 280,286 L 280,296 L 310,296 L 310,286 L 340,286 L 340,305 Z"
        fill="url(#cBattlement)"
        stroke="#251f1b"
        strokeWidth="3.5"
      />

      {/* Central Curtain Wall Body */}
      <rect x="110" y="305" width="280" height="125" fill="url(#cWallStone)" stroke="#251f1b" strokeWidth="4" />

      {/* Wall Accent Bricks */}
      <rect x="180" y="322" width="16" height="7" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
      <rect x="165" y="358" width="18" height="8" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
      <rect x="185" y="415" width="18" height="8" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
      <rect x="305" y="328" width="18" height="8" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
      <rect x="325" y="360" width="16" height="7" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />
      <rect x="305" y="415" width="18" height="8" rx="1" fill="#ede8dc" stroke="#251f1b" strokeWidth="2" />

      {/* ========================================================= */}
      {/* 2. FOREGROUND MID-TOWERS (Flanking the Gate)              */}
      {/* ========================================================= */}

      {/* ----------------- MID-LEFT BASTION TOWER ----------------- */}
      <g id="mid-left-tower">
        {/* Conical Roof */}
        <polygon points="135,212 98,258 120,258" fill="url(#cRoofDark)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="135,212 120,258 135,258" fill="url(#cRoofMid)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="135,212 135,258 152,258" fill="url(#cRoofLight)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="135,212 152,258 172,258" fill="url(#cRoofMid)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <line x1="98" y1="258" x2="172" y2="258" stroke="#251f1b" strokeWidth="3" />

        {/* Battlement Merlons */}
        <path
          d="M 94,258 L 94,306 L 176,306 L 176,258 
             L 162,258 L 162,272 L 148,272 L 148,258 
             L 134,258 L 134,272 L 120,272 L 120,258 
             L 106,258 L 106,272 L 94,272 Z"
          fill="url(#cBattlement)"
          stroke="#251f1b"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Shaft down to ground */}
        <path
          d="M 102,306 L 102,430 Q 135,436 168,430 L 168,306 Z"
          fill="url(#cWallStone)"
          stroke="#251f1b"
          strokeWidth="3.5"
        />

        {/* Arched Window */}
        <path d="M 124,360 L 124,335 A 11,11 0 0,1 146,335 L 146,360 Z" fill="#4d443c" stroke="#251f1b" strokeWidth="3" />
        <path d="M 129,358 L 129,337 A 6,6 0 0,1 141,337 L 141,358 Z" fill="#201a16" />
        <rect x="120" y="360" width="30" height="6" rx="1.5" fill="#675d54" stroke="#251f1b" strokeWidth="2.5" />
      </g>

      {/* ----------------- MID-RIGHT BASTION TOWER ----------------- */}
      <g id="mid-right-tower">
        {/* Conical Roof */}
        <polygon points="365,212 328,258 350,258" fill="url(#cRoofMid)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="365,212 350,258 365,258" fill="url(#cRoofLight)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="365,212 365,258 382,258" fill="url(#cRoofMid)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="365,212 382,258 402,258" fill="url(#cRoofDark)" stroke="#251f1b" strokeWidth="3" strokeLinejoin="round" />
        <line x1="328" y1="258" x2="402" y2="258" stroke="#251f1b" strokeWidth="3" />

        {/* Battlement Merlons */}
        <path
          d="M 324,258 L 324,306 L 406,306 L 406,258 
             L 392,258 L 392,272 L 378,272 L 378,258 
             L 364,258 L 364,272 L 350,272 L 350,258 
             L 336,258 L 336,272 L 324,272 Z"
          fill="url(#cBattlement)"
          stroke="#251f1b"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Shaft down to ground */}
        <path
          d="M 332,306 L 332,430 Q 365,436 398,430 L 398,306 Z"
          fill="url(#cWallStone)"
          stroke="#251f1b"
          strokeWidth="3.5"
        />

        {/* Arched Window */}
        <path d="M 354,360 L 354,335 A 11,11 0 0,1 376,335 L 376,360 Z" fill="#4d443c" stroke="#251f1b" strokeWidth="3" />
        <path d="M 359,358 L 359,337 A 6,6 0 0,1 371,337 L 371,358 Z" fill="#201a16" />
        <rect x="350" y="360" width="30" height="6" rx="1.5" fill="#675d54" stroke="#251f1b" strokeWidth="2.5" />
      </g>

      {/* ========================================================= */}
      {/* 3. CENTER MAIN ARCHED GATEWAY (Wooden Doors & Iron Strap) */}
      {/* ========================================================= */}
      <g id="main-gate">
        {/* Outer Dark Charcoal Stone Archway */}
        <path
          d="M 218,430 L 218,375 A 32,32 0 0,1 282,375 L 282,430 Z"
          fill="#4a423b"
          stroke="#251f1b"
          strokeWidth="4"
        />

        {/* Double Wooden Doors (Warm Ochre/Tan) */}
        <path
          d="M 224,430 L 224,378 A 26,26 0 0,1 276,378 L 276,430 Z"
          fill="url(#cWoodDoor)"
          stroke="#251f1b"
          strokeWidth="3.5"
        />

        {/* Center Split Line between the two door leaves */}
        <line x1="250" y1="352" x2="250" y2="430" stroke="#251f1b" strokeWidth="3.5" />

        {/* Horizontal Iron Strap Crossbar (Gray Metal Band) */}
        <rect x="224" y="388" width="52" height="9" fill="#7a7c80" stroke="#251f1b" strokeWidth="3" />
        {/* Rivets on Iron Band */}
        <circle cx="230" cy="392.5" r="1.5" fill="#251f1b" />
        <circle cx="242" cy="392.5" r="1.5" fill="#251f1b" />
        <circle cx="258" cy="392.5" r="1.5" fill="#251f1b" />
        <circle cx="270" cy="392.5" r="1.5" fill="#251f1b" />
      </g>

      {/* Base Ground Line */}
      <line x1="20" y1="430" x2="480" y2="430" stroke="#251f1b" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
