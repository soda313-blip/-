export interface WordClassDefinition {
  english: string;
  shortDesc: string;
  badgeColor: string;
}

export const WORD_CLASS_DEFINITIONS: Record<string, WordClassDefinition> = {
  명사: {
    english: 'Noun',
    shortDesc: '이름/사물/사람',
    badgeColor: 'bg-blue-900/80 text-blue-200 border-blue-500/50',
  },
  단수명사: {
    english: 'Singular Noun',
    shortDesc: '하나의 사물/사람',
    badgeColor: 'bg-blue-900/80 text-blue-200 border-blue-500/50',
  },
  '불규칙 복수명사': {
    english: 'Irregular Plural',
    shortDesc: '형태가 바뀌는 복수명사',
    badgeColor: 'bg-indigo-900/80 text-indigo-200 border-indigo-500/50',
  },
  동사: {
    english: 'Verb',
    shortDesc: '움직임/동작/상태',
    badgeColor: 'bg-red-900/80 text-red-200 border-red-500/50',
  },
  일반동사: {
    english: 'Action Verb',
    shortDesc: '구체적인 행동/동작',
    badgeColor: 'bg-red-900/80 text-red-200 border-red-500/50',
  },
  be동사: {
    english: 'Be Verb',
    shortDesc: '~이다 / ~에 있다',
    badgeColor: 'bg-rose-900/80 text-rose-200 border-rose-500/50',
  },
  조동사: {
    english: 'Modal Verb',
    shortDesc: '동사를 돕는 말 (can, will)',
    badgeColor: 'bg-orange-900/80 text-orange-200 border-orange-500/50',
  },
  형용사: {
    english: 'Adjective',
    shortDesc: '성질/모양/색깔 꾸밈',
    badgeColor: 'bg-emerald-900/80 text-emerald-200 border-emerald-500/50',
  },
  부사: {
    english: 'Adverb',
    shortDesc: '동사/형용사/부사 수식',
    badgeColor: 'bg-cyan-900/80 text-cyan-200 border-cyan-500/50',
  },
  대명사: {
    english: 'Pronoun',
    shortDesc: '이름 대신 부르는 말 (He, It)',
    badgeColor: 'bg-purple-900/80 text-purple-200 border-purple-500/50',
  },
  관계대명사: {
    english: 'Relative Pronoun',
    shortDesc: '문장을 이어주는 대명사',
    badgeColor: 'bg-purple-900/80 text-purple-200 border-purple-500/50',
  },
  전치사: {
    english: 'Preposition',
    shortDesc: '위치/시간/장소 앞 (~에)',
    badgeColor: 'bg-amber-900/80 text-amber-200 border-amber-500/50',
  },
  전치사구: {
    english: 'Prep. Phrase',
    shortDesc: '전치사 + 명사 덩어리',
    badgeColor: 'bg-amber-900/80 text-amber-200 border-amber-500/50',
  },
  접속사: {
    english: 'Conjunction',
    shortDesc: '단어와 문장을 연결 (and, but)',
    badgeColor: 'bg-teal-900/80 text-teal-200 border-teal-500/50',
  },
  감탄사: {
    english: 'Interjection',
    shortDesc: '느낌/외침/놀람 (Wow!, Oh!)',
    badgeColor: 'bg-pink-900/80 text-pink-200 border-pink-500/50',
  },
  현재시제: {
    english: 'Present Tense',
    shortDesc: '현재의 사실/규칙적 습관',
    badgeColor: 'bg-sky-900/80 text-sky-200 border-sky-500/50',
  },
  과거시제: {
    english: 'Past Tense',
    shortDesc: '이미 지나간 일 (~했다)',
    badgeColor: 'bg-violet-900/80 text-violet-200 border-violet-500/50',
  },
  미래시제: {
    english: 'Future Tense',
    shortDesc: '앞으로 일어날 일 (will)',
    badgeColor: 'bg-teal-900/80 text-teal-200 border-teal-500/50',
  },
  현재진행형: {
    english: 'Present Continuous',
    shortDesc: '지금 하는 중 (be + ~ing)',
    badgeColor: 'bg-emerald-900/80 text-emerald-200 border-emerald-500/50',
  },
  진행형: {
    english: 'Continuous Form',
    shortDesc: '~하고 있는 중 (be + ~ing)',
    badgeColor: 'bg-emerald-900/80 text-emerald-200 border-emerald-500/50',
  },
  '현재진행형 의문문': {
    english: 'Pres. Cont. Question',
    shortDesc: '~하는 중인가요? 묻는 문장',
    badgeColor: 'bg-emerald-900/80 text-emerald-200 border-emerald-500/50',
  },
  '과거시제 의문문': {
    english: 'Past Question',
    shortDesc: '~했었나요? 묻는 문장',
    badgeColor: 'bg-violet-900/80 text-violet-200 border-violet-500/50',
  },
  완료시제: {
    english: 'Perfect Tense',
    shortDesc: '경험/완료 (have + p.p.)',
    badgeColor: 'bg-fuchsia-900/80 text-fuchsia-200 border-fuchsia-500/50',
  },
  현재완료: {
    english: 'Present Perfect',
    shortDesc: '과거부터 지금까지 영향',
    badgeColor: 'bg-fuchsia-900/80 text-fuchsia-200 border-fuchsia-500/50',
  },
  과거분사: {
    english: 'Past Participle',
    shortDesc: '수동/완료 의미의 p.p.',
    badgeColor: 'bg-slate-800 text-slate-200 border-slate-500/50',
  },
  동명사: {
    english: 'Gerund',
    shortDesc: '동사가 된 명사 (~하는 것)',
    badgeColor: 'bg-indigo-900/80 text-indigo-200 border-indigo-500/50',
  },
  to부정사: {
    english: 'To-Infinitive',
    shortDesc: 'to + 동사원형 (명사/형용사/부사)',
    badgeColor: 'bg-cyan-900/80 text-cyan-200 border-cyan-500/50',
  },
  'to부정사 (목적)': {
    english: 'To-Inf. (Purpose)',
    shortDesc: '~하기 위해서 (목적 나타냄)',
    badgeColor: 'bg-cyan-900/80 text-cyan-200 border-cyan-500/50',
  },
  비교급: {
    english: 'Comparative',
    shortDesc: '둘 중 더 ~한 (-er, more)',
    badgeColor: 'bg-yellow-900/80 text-yellow-200 border-yellow-500/50',
  },
  최상급: {
    english: 'Superlative',
    shortDesc: '가장 ~한 (the -est, most)',
    badgeColor: 'bg-amber-900/80 text-amber-200 border-amber-500/50',
  },
  명령문: {
    english: 'Imperative',
    shortDesc: '~해라! (동사원형으로 시작)',
    badgeColor: 'bg-rose-900/80 text-rose-200 border-rose-500/50',
  },
  부정명령문: {
    english: 'Negative Imperative',
    shortDesc: '~하지 마라! (Don\'t + 동사)',
    badgeColor: 'bg-rose-950 text-rose-300 border-rose-600/50',
  },
  의문문: {
    english: 'Question',
    shortDesc: '궁금한 점을 묻는 문장 (?)',
    badgeColor: 'bg-blue-900/80 text-blue-200 border-blue-500/50',
  },
  의문사: {
    english: 'Wh- Question Word',
    shortDesc: '누가/언제/어디서/무엇/어떻게',
    badgeColor: 'bg-blue-900/80 text-blue-200 border-blue-500/50',
  },
  감탄문: {
    english: 'Exclamatory',
    shortDesc: '감탄과 감정을 표현하는 문장 (!)',
    badgeColor: 'bg-pink-900/80 text-pink-200 border-pink-500/50',
  },
};

export function getWordClassMeta(optionName: string): WordClassDefinition {
  return (
    WORD_CLASS_DEFINITIONS[optionName] || {
      english: 'Grammar',
      shortDesc: '문법 품사/역할',
      badgeColor: 'bg-stone-800 text-stone-200 border-stone-600/50',
    }
  );
}
