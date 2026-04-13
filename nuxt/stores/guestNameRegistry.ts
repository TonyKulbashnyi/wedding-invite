/**
 * Ключі з URL (латиниця / як у посиланні) → українське відображення імен.
 * Ключі зберігаються в нижньому регістрі для пошуку.
 */
export const GUEST_NAME_KEY_TO_UA: Readonly<Record<string, string>> = {
  vitaliy: 'Віталій',
  oksana: 'Оксана',
  anton: 'Антон',
  tetiana: 'Тетяна',
  ilya: 'Ілля',
  serhii: 'Сергій',
  irina: 'Ірина',
  yulia: 'Юлія',
  dmitro: 'Дмитро',
  karolina: 'Кароліна',
  lesya: 'Леся',
  ihor: 'Ігор',
  sofia: 'Софія',
  oleksandr: 'Олександр',
  kateryna: 'Катерина',
  marharyta: 'Маргарита',
  liubov: 'Любов',
  zaur: 'Заур',
  orest: 'Орест',
  nastya: 'Настя',
  maria: 'Марія',
  dmytro: 'Дмитро',
  maksim: 'Максим',
  anna: 'Аня', 
  alan: 'Алан',
  adam: 'Адам',   
  marina: 'Марина',
  nastia: 'Настя',
  anastasia: 'Анастасія',
};

/** Для звертання в invite-title (Шановний / Шановна / Шановні) */
export type GuestSex = 'men' | 'women';

/**
 * Прізвище з реєстру без обов’язкового `surname=` у URL.
 *
 * - Якщо є **лише `firstKey`** (без `secondKey`) — збіг, коли в URL **одне** ім’я.
 * - Якщо є **`firstKey` + `secondKey`** — збіг, коли в URL **обидва** імені (у будь-якому порядку).
 *
 * **`surname`** (необов’язково) — кирилицею; у query `surname=` має пріоритет над реєстром.
 * Запис може задавати лише **`sex`** для звертання, без прізвища.
 * **`sex`** (необов’язково) — лише з реєстру; на заголовок «Шановні/Шановний/Шановна».
 */
export interface GuestSurnamePairConfig {
  readonly firstKey: string;
  readonly secondKey?: string;
  readonly tertiaryKey?: string;
  readonly forthKey?: string;
  readonly surname?: string;
  readonly sex?: GuestSex;
}

export const GUEST_PAIRS_WITH_SHARED_SURNAME: readonly GuestSurnamePairConfig[] =
  [
    {
      firstKey: 'Vitaliy',
      secondKey: 'Oksana',
      surname: 'Куриленко',
    },
    {
      firstKey: 'Tetiana',
      surname: 'Усик',
      sex: 'women',
    },
    {
      firstKey: 'Ilya',
      surname: 'Усик',
      sex: 'men',
    },
    {
      firstKey: 'Serhii',
      secondKey: 'Marina' ,
      tertiaryKey: 'Sofia',
      surname: 'Колесникові',
    },
    {
      firstKey: 'anastasia',
      surname: 'Колесникова',
    },
    {
      firstKey: 'Anton',
      secondKey: 'Irina'
    },
    {
      firstKey: 'Yulia',
      secondKey: 'Dmitro'
    },
    {
      firstKey: 'Karolina',
      surname: 'Ковальова',
      sex: 'women',
    },
    {
      firstKey: 'Lesya',
      surname: 'Дяденко',
      sex: 'women',
    },
    {
      firstKey: 'Ihor',
      secondKey: 'Oksana',
      surname: 'Кульбашні',
    },
    {
      firstKey: 'Sofia',
      secondKey: 'Oleksandr',
    },
    {
      firstKey: 'Kateryna',
      surname: 'Кульбашна',
      sex: 'women',
    },
    {
      firstKey: 'Dmitro',
      secondKey: 'Marharyta',
      surname: 'Куриленко',
    },
    {
      firstKey: 'Kateryna',
      secondKey: 'Zaur',
      tertiaryKey: 'Adam',
      forthKey: 'Alan',
      surname: 'Джатдоєві',
    },
    {
      firstKey: 'Liubov',
      surname: 'Ободовська',
      sex: 'women',
    },
    {
      firstKey: 'Orest',
      secondKey: 'Anna'
    },
    {
      firstKey: 'Ihor',
      secondKey: 'Nastya'
    },
    {
      firstKey: 'Oleksandr',
      secondKey: 'Maria'
    },
    {
      firstKey: 'Dmytro',
      surname: 'Бадрак',
      sex: 'men',
    },
    {
      firstKey: 'Maksim',
      secondKey: 'Maria'
    },
  ];



export function findSingleGuestSurname(
  firstRaw: string | null,
  hasSecondGuest: boolean
): string | null {
  if (hasSecondGuest || firstRaw == null || firstRaw === '') return null;
  const a = normalizeGuestKey(firstRaw);
  return null;
}

export function normalizeGuestKey(key: string): string {
  return key.trim().toLowerCase();
}

export function resolveGuestName(raw: string | null): string {
  if (raw == null || raw === '') return '';
  const k = normalizeGuestKey(raw);
  return GUEST_NAME_KEY_TO_UA[k] ?? raw.trim();
}

function hasSecondGuestName(secondRaw: string | null): boolean {
  return secondRaw != null && String(secondRaw).trim() !== '';
}

function isNonEmpty(v: string | null | undefined): v is string {
  return v != null && String(v).trim() !== '';
}

export function findSharedSurnamePair(
  firstRaw: string | null,
  secondRaw: string | null,
  thirdRaw?: string | null,
  fourthRaw?: string | null,
): GuestSurnamePairConfig | null {
  if (!isNonEmpty(firstRaw)) return null;

  const keys = [firstRaw, secondRaw, thirdRaw, fourthRaw]
    .filter(isNonEmpty)
    .map(normalizeGuestKey);

  for (const p of GUEST_PAIRS_WITH_SHARED_SURNAME) {
    const pKeys = [p.firstKey, p.secondKey, p.tertiaryKey, p.forthKey]
      .filter(isNonEmpty)
      .map(normalizeGuestKey);

    if (pKeys.length !== keys.length) continue;

    const matched = pKeys.every(pk => keys.includes(pk));
    if (matched) return p;
  }

  return null;
}
