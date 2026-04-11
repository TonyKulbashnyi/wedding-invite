<template>
  <section id="rsvp" class="rsvp relative z-2 px-6">
    <div class="rsvp__form text-center max-w-2xl mx-auto border border-white/10 bg-charcoal/80 backdrop-blur-sm p-6 sm:p-8">
      <div class="mb-6">
        <h2 class="font-serif text-2xl sm:text-3xl text-white mb-4">
          Підтвердіть, будь ласка, вашу присутність
        </h2>
        <p class="text-md text-white ">
          Планування кожної деталі потребує часу та уваги — ваша відповідь допоможе зробити свято комфортним для кожного гостя 
        </p>
      </div>
      <form class="space-y-5" @submit.prevent="handleSubmit">

        <div class="space-y-4">
          <p class="block text-left text-md font-medium tracking-[0.1em] uppercase text-white">
            Позначте, хто приєднається:
          </p>
          <div class="space-y-4 text-sm text-white">
            <label
              v-for="name in guestNames"
              :key="name"
              class="flex items-center gap-2"
            >
              <input
                type="checkbox"
                :value="name"
                v-model="selectedGuests"
              />
              <span>{{ name }}</span>
            </label>
          </div>
        </div>

        <div class="space-y-4">
          <p class="text-left block text-md font-medium tracking-[0.1em] uppercase text-white">
            Побажання щодо напоїв:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white">
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

        <div class="text-xs text-white/50">
          <p>
            <span class="font-semibold text-white">Просимо надіслати підтвердження до 1 червня 2026 року,</span>
            щоб була можливість врахувати всі побажання при плануванні свята.

          </p>
        </div>

        <button
          type="submit"
          class="mt-2 inline-flex w-full items-center justify-center bg-graphite text-cream px-6 py-3 text-sm font-medium hover:bg-graphite/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="isSubmitting"
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
import photo6 from '~/assets/img/7.jpeg';

const drinkOptions = [
  'Вино',
  'Шампанське',
  'Віскі',
  'Горілка',
  'Текіла',
  'Коктейлі',
];

const guestStore = useGuestStore();
const { displayName, displayPartnerName, displayThirdName, displayFourthName } = storeToRefs(guestStore);

const guestNames = computed(() => {
  const candidates = [
    displayName.value,
    displayPartnerName.value,
    displayThirdName.value,
    displayFourthName.value,
  ];
  return candidates.filter(n => n && n !== 'дорогі гості') as string[];
});

const selectedGuests = ref<string[]>([]);

const alcohol = ref<string[]>([]);
const isSubmitting = ref(false);
const statusMessage = ref('');

const statusClass = computed(() =>
  statusMessage.value.includes('Дякуємо')
    ? 'text-white'
    : 'text-[0.8rem] text-red-500'
);

async function handleSubmit() {
  isSubmitting.value = true;
  statusMessage.value = '';

  const attending = selectedGuests.value;
  const notAttending = guestNames.value.filter(n => !attending.includes(n));

  const attendingText = attending.length > 0
    ? `✅ Будуть: ${attending.join(', ')}`
    : '✅ Будуть: —';

  const notAttendingText = notAttending.length > 0
    ? `❌ Не зможуть: ${notAttending.join(', ')}`
    : null;

  const drinksText =
    alcohol.value.length > 0
      ? `Напої: ${alcohol.value.join(', ')}.`
      : 'Напої: не вказано.';

  const lines = ['Нове RSVP на весілля 💌', '', attendingText];
  if (notAttendingText) lines.push(notAttendingText);
  lines.push(drinksText);

  const message = lines.join('\n');

  try {
    await $fetch('/api/rsvp', {
      method: 'POST',
      body: { message },
    });

    statusMessage.value = 'Дякуємо! Ваша відповідь успішно надіслана.';
  } catch (error) {
    console.error(error);
    statusMessage.value =
      'На жаль, сталася помилка під час надсилання. Спробуйте, будь ласка, ще раз або напишіть нам напряму.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style lang="scss" scoped>
.rsvp {
  height: calc(100dvh + 30rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: v-bind("'url(' + photo6 + ')'");
  background-size: cover;
  background-position: center;
  top: 30rem;

  &__form {
    position: relative;
    top: calc(-30rem/2);
  }
}

:deep(input[type='checkbox']),
:deep(input[type='radio']) {
  appearance: none;
  -webkit-appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.08);
  cursor: pointer;
  position: relative;
  transition: background-color 0.15s, border-color 0.15s;

  &:checked {
    background-color: theme('colors.graphite');
    border-color: theme('colors.graphite');

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: 0.55rem;
      height: 1rem;
      border: 2.5px solid #fff;
      border-top: none;
      border-left: none;
      transform: rotate(45deg) translate(-1px, -2px);
    }
  }

  &:focus-visible {
    outline: 2px solid theme('colors.graphite');
    outline-offset: 2px;
  }
}

:deep(input[type='radio']) {
  border-radius: 50%;

  &:checked::after {
    width: 0.85rem;
    height: 0.85rem;
    border: none;
    border-radius: 50%;
    background-color: #fff;
    transform: none;
    inset: 0;
  }
}
</style>
