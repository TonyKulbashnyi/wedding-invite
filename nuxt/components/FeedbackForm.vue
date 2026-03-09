<template>
  <section id="rsvp" class="bg-cream py-16 px-6">
    <div class="max-w-2xl mx-auto rounded-3xl border border-birch bg-birch/20 p-6 sm:p-8 shadow-sm">
      <div class="mb-6">
        <p class="text-xs tracking-[0.3em] uppercase text-taupe mb-3">
          RSVP
        </p>
        <h2 class="font-serif text-2xl sm:text-3xl text-charcoal mb-2">
          Підтвердіть, будь ласка, присутність
        </h2>
        <p class="text-sm text-charcoal/80">
          Нам важливо знати, що ви будете з нами цього дня, щоб підготувати все з любов’ю та турботою.
        </p>
      </div>

      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div class="space-y-1">
          <label class="block text-xs font-medium tracking-[0.2em] uppercase text-taupe">
            Імена гостей
          </label>
          <input
            type="text"
            class="w-full rounded-full border border-birch bg-cream/70 px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-lichen/70"
            :value="namesField"
            readonly
          />
          <p class="text-[0.7rem] text-taupe">
            Поле заповнюється автоматично з посилання (параметр <code>?name=</code>).
          </p>
        </div>

        <div class="space-y-2">
          <p class="block text-xs font-medium tracking-[0.2em] uppercase text-taupe">
            Присутність
          </p>
          <div class="space-y-1 text-sm text-charcoal/90">
            <label class="flex items-center gap-2">
              <input
                type="radio"
                class="accent-lichen"
                value="yes"
                v-model="attendance"
              />
              <span>Я буду на святі</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="radio"
                class="accent-lichen"
                value="no"
                v-model="attendance"
              />
              <span>На жаль, не зможу прийти</span>
            </label>
          </div>
        </div>

        <div class="space-y-2">
          <p class="block text-xs font-medium tracking-[0.2em] uppercase text-taupe">
            Напої
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-charcoal/90">
            <label
              v-for="option in drinkOptions"
              :key="option"
              class="flex items-center gap-2"
            >
              <input
                type="checkbox"
                class="accent-lichen"
                :value="option"
                v-model="alcohol"
              />
              <span>{{ option }}</span>
            </label>
          </div>
        </div>

        <div class="text-xs text-taupe">
          <p>
            Будь ласка, надішліть відповідь до
            <span class="font-semibold text-charcoal">1 серпня 2026</span>,
            щоб ми змогли все ретельно спланувати.
          </p>
        </div>

        <button
          type="submit"
          class="mt-2 inline-flex w-full items-center justify-center rounded-full bg-forest text-cream px-6 py-3 text-sm font-medium shadow-md hover:bg-moss transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="isSubmitting || !attendance"
        >
          <span v-if="!isSubmitting">Надіслати відповідь</span>
          <span v-else>Надсилання...</span>
        </button>

        <p v-if="statusMessage" class="text-xs" :class="statusClass">
          {{ statusMessage }}
        </p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGuestStore } from '~/stores/guestStore';

const config = useRuntimeConfig();
const TELEGRAM_TOKEN = config.public.telegramToken as string | undefined;
const TELEGRAM_CHAT_ID = config.public.telegramChatId as string | undefined;

type Attendance = 'yes' | 'no' | '';

const drinkOptions = [
  'Вино',
  'Віскі',
  'Шампанське',
  'Коктейлі безалкогольні',
  'Вода / лимонад',
];

const guestStore = useGuestStore();
const { displayName } = storeToRefs(guestStore);

const namesField = computed(() => displayName.value);

const attendance = ref<Attendance>('');
const alcohol = ref<string[]>([]);
const isSubmitting = ref(false);
const statusMessage = ref('');

const statusClass = computed(() =>
  statusMessage.value.includes('Дякуємо')
    ? 'text-lichen'
    : 'text-[0.8rem] text-red-500'
);

async function handleSubmit() {
  if (!attendance.value) return;

  isSubmitting.value = true;
  statusMessage.value = '';

  const attendanceText =
    attendance.value === 'yes'
      ? '✅ Гість(гості) будуть на святі.'
      : '❌ На жаль, гість(гості) не зможуть бути присутні.';

  const drinksText =
    alcohol.value.length > 0
      ? `Напої: ${alcohol.value.join(', ')}.`
      : 'Напої: не вказано.';

  const message = [
    'Нове RSVP на весілля 💌',
    '',
    `Імена: ${namesField.value}`,
    attendanceText,
    drinksText,
  ].join('\n');

  try {
    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error('Missing Telegram credentials in runtimeConfig');
    }

    const response = await $fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: 'POST',
        body: {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        },
      }
    );

    if (!response) {
      throw new Error('Telegram API error');
    }

    statusMessage.value =
      'Дякуємо! Ваша відповідь успішно надіслана в Telegram.';
  } catch (error) {
    console.error(error);
    statusMessage.value =
      'На жаль, сталася помилка під час надсилання. Спробуйте, будь ласка, ще раз або напишіть нам напряму.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

