<template>
  <div class="min-h-screen flex flex-col bg-cream text-charcoal">
    <main>
      <section class="py-16 px-6 flex items-center justify-center min-h-[70vh]">
        <div class="max-w-xl text-center">
          <p class="tracking-[0.3em] text-xs uppercase text-taupe mb-4">
            Запрошення на весілля
          </p>
          <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal mb-4">
            Іван &amp; Марія
          </h1>
          <p class="text-sm tracking-[0.3em] uppercase text-taupe mb-6">
            09 · 09 · 2026
          </p>
          <p class="text-sm sm:text-base text-charcoal/80 leading-relaxed">
            Ми з радістю запрошуємо вас розділити з нами день, коли ми скажемо
            одне одному «так». Нехай цей вечір буде наповнений світлом, музикою та
            теплом близьких сердець.
          </p>
        </div>
      </section>

      <InviteBlock />
      <LocationBlock />
      <TimingBlock />
      <DresscodeBlock />
      <FeedbackForm />
      <InfoBlock />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGuestStore } from '~/stores/guestStore';

import InviteBlock from '~/components/InviteBlock.vue';
import LocationBlock from '~/components/LocationBlock.vue';
import TimingBlock from '~/components/TimingBlock.vue';
import DresscodeBlock from '~/components/DresscodeBlock.vue';
import FeedbackForm from '~/components/FeedbackForm.vue';
import InfoBlock from '~/components/InfoBlock.vue';
import AppFooter from '~/components/AppFooter.vue';

const guestStore = useGuestStore();

onMounted(() => {
  guestStore.initFromUrl();
});
</script>
