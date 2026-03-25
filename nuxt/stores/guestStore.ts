import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {
  findSharedSurnamePair,
  findSingleGuestSurname,
  resolveGuestName,
} from './guestNameRegistry';

export interface GuestState {
  rawFirstName: string | null;
  rawSecondName: string | null;
  rawThirdName: string | null;
  rawFourthName: string | null;
  rawSurnameFromUrl: string | null;
}

function decodeParam(value: string | null): string | null {
  if (value == null || value === '') return null;
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '));
  } catch {
    return value.replace(/\+/g, ' ');
  }
}

function getQueryValue(
  q: Record<string, unknown>,
  key: string
): string | null {
  const v = q[key];
  if (v == null) return null;
  if (Array.isArray(v)) {
    const s = v[0];
    if (s == null || s === '') return null;
    return String(s);
  }
  if (v === '') return '';
  return String(v);
}

const RESERVED_KEYS = new Set(['name', 'surname', 'firstKey', 'secondKey', 'tertiaryKey', 'forthKey']);

function parseAllNames(
  nameDecoded: string | null,
  iterateEmptyKeys: () => Iterable<{ key: string; value: string }>
): { first: string | null; second: string | null; third: string | null; fourth: string | null } {
  let first: string | null = nameDecoded;
  let second: string | null = null;
  let third: string | null = null;
  let fourth: string | null = null;

  const extras: string[] = [];
  for (const { key, value } of iterateEmptyKeys()) {
    if (RESERVED_KEYS.has(key)) continue;
    if (value === '') extras.push(decodeParam(key) ?? key);
    if (extras.length === 3) break;
  }

  second = extras[0] ?? null;
  third  = extras[1] ?? null;
  fourth = extras[2] ?? null;

  return { first, second, third, fourth };
}

function parseFromSearchParams(params: URLSearchParams): {
  first: string | null;
  second: string | null;
  third: string | null;
  fourth: string | null;
  surname: string | null;
} {
  const surname = decodeParam(params.get('surname'));
  const nameDecoded =
    decodeParam(params.get('name')) ?? decodeParam(params.get('firstKey'));

  const { first, second, third, fourth } = parseAllNames(nameDecoded, function* () {
    for (const [key, value] of params.entries()) {
      yield { key, value };
    }
  });

  return { first, second, third, fourth, surname };
}

function parseFromRouteQuery(q: Record<string, unknown>): {
  first: string | null;
  second: string | null;
  third: string | null;
  fourth: string | null;
  surname: string | null;
} {
  const surnameRaw = getQueryValue(q, 'surname');
  const surname = surnameRaw != null && surnameRaw !== ''
    ? decodeParam(surnameRaw)
    : null;

  const nameRaw =
    getQueryValue(q, 'name') ?? getQueryValue(q, 'firstKey');
  const nameDecoded = nameRaw != null && nameRaw !== ''
    ? decodeParam(nameRaw)
    : null;

  const { first, second, third, fourth } = parseAllNames(nameDecoded, function* () {
    for (const key of Object.keys(q)) {
      if (RESERVED_KEYS.has(key)) continue;
      const val = getQueryValue(q, key);
      const value = val ?? '';
      yield { key, value };
    }
  });

  return { first, second, third, fourth, surname };
}

export const useGuestStore = defineStore('guest', () => {
  const rawFirstName = ref<string | null>(null);
  const rawSecondName = ref<string | null>(null);
  const rawThirdName = ref<string | null>(null);
  const rawFourthName = ref<string | null>(null);
  const rawSurnameFromUrl = ref<string | null>(null);

  const defaultGuest = 'дорогі гості';

  const displayName = computed(() => {
    const f = rawFirstName.value;
    if (f == null || f === '') return defaultGuest;
    return resolveGuestName(f) || defaultGuest;
  });

  const displayPartnerName = computed(() => {
    const s = rawSecondName.value;
    if (s == null || s === '') return '';
    return resolveGuestName(s) || '';
  });

  const displayThirdName = computed(() => {
    const s = rawThirdName.value;
    if (s == null || s === '') return '';
    return resolveGuestName(s) || '';
  });

  const displayFourthName = computed(() => {
    const s = rawFourthName.value;
    if (s == null || s === '') return '';
    return resolveGuestName(s) || '';
  });

  const hasTwoGuests = computed(() => {
    const s = rawSecondName.value;
    return s != null && s.trim() !== '';
  });

  const matchedSharedSurnamePair = computed(() =>
    findSharedSurnamePair(
      rawFirstName.value,
      rawSecondName.value,
      rawThirdName.value,
      rawFourthName.value,
    )
  );

  /** Заголовок запрошення: поле `sex` у збіглому записі GUEST_PAIRS_WITH_SHARED_SURNAME */
  const displayInviteTitle = computed(() => {
    const s = matchedSharedSurnamePair.value?.sex;
    if (s === 'men') return 'Шановний';
    if (s === 'women') return 'Шановна';
    return 'Шановні';
  });

  /**
   * Прізвище: `surname=` у URL (працює і для одного імені) → пара з реєстру → один гість у реєстрі.
   */
  const displaySharedSurname = computed(() => {
    const fromUrl = rawSurnameFromUrl.value?.trim();
    const pair = matchedSharedSurnamePair.value;
    const single = findSingleGuestSurname(
      rawFirstName.value,
      hasTwoGuests.value
    );

    const pairSurname = pair?.surname?.trim();
    const text =
      (fromUrl && fromUrl !== '' ? fromUrl : null) ??
      (pairSurname && pairSurname !== '' ? pairSurname : null) ??
      (single && single !== '' ? single : null) ??
      null;

    if (text == null || text === '') return null;
    return text.trim();
  });

  const showSharedSurname = computed(() => Boolean(displaySharedSurname.value));

  /**
   * Оновлює стан з query. Передавай `useRoute().query` зі сторінки (SSR + клієнт).
   * Якщо не передано — на клієнті читається `window.location.search`.
   *
   * Перше ім’я: `name=...` або те саме через `firstKey=...` (якщо `name` немає).
   * Один гість + прізвище: `?firstKey=Vitaliy&surname=Куриленко` (кирилицю в URL краще encode).
   * Звертання «Шановні/Шановний/Шановна» — з поля `sex` у реєстрі GUEST_PAIRS_WITH_SHARED_SURNAME.
   */
  function initFromUrl(routeQuery?: Record<string, unknown> | null) {
    let parsed: {
      first: string | null;
      second: string | null;
      third: string | null;
      fourth: string | null;
      surname: string | null;
    };

    if (routeQuery != null && Object.keys(routeQuery).length > 0) {
      parsed = parseFromRouteQuery(routeQuery);
    } else if (typeof window !== 'undefined') {
      parsed = parseFromSearchParams(new URLSearchParams(window.location.search));
    } else {
      return;
    }

    rawFirstName.value = parsed.first ?? null;
    rawSecondName.value = parsed.second ?? null;
    rawThirdName.value = parsed.third ?? null;
    rawFourthName.value = parsed.fourth ?? null;
    rawSurnameFromUrl.value = parsed.surname ?? null;
  }

  function setName(name: string) {
    rawFirstName.value = name;
  }

  function setPartnerName(name: string) {
    rawSecondName.value = name;
  }

  function setSurnameFromUrl(value: string | null) {
    rawSurnameFromUrl.value = value;
  }

  return {
    rawFirstName,
    rawSecondName,
    rawThirdName,
    rawFourthName,
    rawSurnameFromUrl,
    displayName,
    displayPartnerName,
    displayThirdName,
    displayFourthName,
    displayInviteTitle,
    hasTwoGuests,
    matchedSharedSurnamePair,
    displaySharedSurname,
    showSharedSurname,
    initFromUrl,
    setName,
    setPartnerName,
    setSurnameFromUrl,
  };
});
