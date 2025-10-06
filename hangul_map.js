// 영어 → 한글 자모 매핑
const engToKor = {
  r: "ㄱ",
  R: "ㄲ",
  s: "ㄴ",
  S: "ㄴ",
  e: "ㄷ",
  E: "ㄸ",
  f: "ㄹ",
  F: "ㄹ",
  a: "ㅁ",
  A: "ㅁ",
  q: "ㅂ",
  Q: "ㅃ",
  t: "ㅅ",
  T: "ㅆ",
  d: "ㅇ",
  D: "ㅇ",
  w: "ㅈ",
  W: "ㅉ",
  c: "ㅊ",
  C: "ㅊ",
  z: "ㅋ",
  Z: "ㅋ",
  x: "ㅌ",
  X: "ㅌ",
  v: "ㅍ",
  V: "ㅍ",
  g: "ㅎ",
  G: "ㅎ",
  k: "ㅏ",
  K: "ㅏ",
  o: "ㅐ",
  O: "ㅒ",
  i: "ㅑ",
  I: "ㅑ",
  j: "ㅓ",
  J: "ㅓ",
  p: "ㅔ",
  P: "ㅖ",
  u: "ㅕ",
  U: "ㅕ",
  h: "ㅗ",
  H: "ㅗ",
  y: "ㅛ",
  Y: "ㅛ",
  n: "ㅜ",
  N: "ㅜ",
  b: "ㅠ",
  B: "ㅠ",
  m: "ㅡ",
  M: "ㅡ",
  l: "ㅣ",
  L: "ㅣ",

  // 이중모음
  hk: "ㅘ", // ㅗ + ㅏ
  ho: "ㅙ", // ㅗ + ㅐ
  hl: "ㅚ", // ㅗ + ㅣ
  nj: "ㅝ", // ㅜ + ㅓ
  np: "ㅞ", // ㅜ + ㅔ
  nl: "ㅟ", // ㅜ + ㅣ
  ml: "ㅢ", // ㅡ + ㅣ

  // 겹받침
  rt: "ㄳ",
  sw: "ㄵ",
  sg: "ㄶ",
  fr: "ㄺ",
  fa: "ㄻ",
  fq: "ㄼ",
  ft: "ㄽ",
  fx: "ㄾ",
  fv: "ㄿ",
  fg: "ㅀ",
  qt: "ㅄ",
};

// 한글 자모 → 영어
const korToEng = {};
for (const key in engToKor) {
  const value = engToKor[key];
  if (!(value in korToEng)) {
    korToEng[value] = key;
  }
}

// 초성, 중성, 종성
const CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const JUNG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];
const JONG = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

function combineHangul(jamos) {
  let result = "";
  let i = 0;

  while (i < jamos.length) {
    const choIdx = CHO.indexOf(jamos[i]);
    if (choIdx === -1 || i + 1 >= jamos.length) {
      result += jamos[i];
      i++;
      continue;
    }

    let jungIdx = -1;
    let jungChar = null;
    let jungLen = 0;

    if (i + 2 < jamos.length) {
      const twoChar = jamos[i + 1] + jamos[i + 2];
      const idx = JUNG.indexOf(twoChar);
      if (idx !== -1) {
        jungIdx = idx;
        jungChar = twoChar;
        jungLen = 2;
      }
    }

    if (jungIdx === -1) {
      jungChar = jamos[i + 1];
      jungIdx = JUNG.indexOf(jungChar);
      jungLen = 1;
    }

    if (jungIdx === -1) {
      result += jamos[i];
      i++;
      continue;
    }

    let jongIdx = 0;
    const jongCandidate = jamos[i + 1 + jungLen];
    const nextChar = jamos[i + 2 + jungLen];

    const isJong =
      jongCandidate &&
      JONG.includes(jongCandidate) &&
      !(
        // 종성 후보가 다음 초성인 경우
        (
          CHO.includes(jongCandidate) &&
          nextChar &&
          JUNG.some((j) => nextChar === j || jongCandidate + nextChar === j)
        )
      );

    if (isJong) {
      jongIdx = JONG.indexOf(jongCandidate);
      i += 1 + jungLen + 1;
    } else {
      i += 1 + jungLen;
    }

    const syllableCode = 0xac00 + choIdx * 21 * 28 + jungIdx * 28 + jongIdx;
    result += String.fromCharCode(syllableCode);
  }

  return result;
}

// Kor -> Eng
function convertKorToEng(text) {
  const result = [];
  for (let ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const offset = code - 0xac00;
      const cho = Math.floor(offset / (21 * 28));
      const jung = Math.floor((offset % (21 * 28)) / 28);
      const jong = offset % 28;

      result.push(
        korToEng[CHO[cho]] || "",
        korToEng[JUNG[jung]] || "",
        JONG[jong] ? korToEng[JONG[jong]] || "" : ""
      );
    } else {
      result.push(korToEng[ch] || ch);
    }
  }
  return result.join("");
}

// Eng -> Kor
function convertEngToHangul(text) {
  const jamos = [];
  let i = 0;

  while (i < text.length) {
    const cho = engToKor[text[i]];
    if (CHO.includes(cho)) {
      jamos.push(cho);
      i++;

      // 중성 처리 (이중모음 포함)
      let jung = null;
      if (
        i + 1 < text.length &&
        engToKor[text[i] + text[i + 1]] &&
        JUNG.includes(engToKor[text[i] + text[i + 1]])
      ) {
        jung = engToKor[text[i] + text[i + 1]];
        jamos.push(jung);
        i += 2;
      } else if (engToKor[text[i]] && JUNG.includes(engToKor[text[i]])) {
        jung = engToKor[text[i]];
        jamos.push(jung);
        i++;
      } else {
        // 중성이 없으면 초성만 출력
        continue;
      }

      // 종성 처리 (겹받침 포함)
      if (i < text.length) {
        const next1 = text[i];
        const next2 = text[i + 1];
        const combined = next1 + next2;

        // 겹받침 후보가 있고, 그 뒤에 모음이 오지 않는 경우만 겹받침으로 인정
        if (
          engToKor[combined] &&
          JONG.includes(engToKor[combined]) &&
          !(i + 2 < text.length && JUNG.includes(engToKor[text[i + 2]]))
        ) {
          jamos.push(engToKor[combined]);
          i += 2;
          continue;
        }

        // 단일 받침 (단, 다음 글자가 모음이면 받침이 아니라 다음 초성으로 넘김)
        if (
          engToKor[next1] &&
          JONG.includes(engToKor[next1]) &&
          !(i + 1 < text.length && JUNG.includes(engToKor[text[i + 1]]))
        ) {
          jamos.push(engToKor[next1]);
          i++;
        }
      }
    } else {
      jamos.push(engToKor[text[i]] || text[i]);
      i++;
    }
  }

  return combineHangul(jamos);
}
