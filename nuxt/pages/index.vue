<template>
  <div class="min-h-screen flex flex-col bg-cream text-charcoal">
    <div class="desktop-modal">
      <p class="desktop-modal__text font-script ">
        Відкрийте запрошення на телефоні
      </p>
    </div>
    <main>
    
      <Greeting />
      <div ref="overlapRef" class="overlap">
        <Invite />
        <Location />
      </div>
      <Timing :style="overlapScrolled ? { zIndex: 1 } : {}" />
      <div class="overlap overlap--second">
        <Dresscode />
        <DresscodeContent />
        <FeedbackForm />
        <Info />
        <AppFooter />
      </div>
    </main>

  
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useGuestStore } from '~/stores/guestStore';

const overlapRef = ref<HTMLElement | null>(null);
const overlapScrolled = ref(false);

function onScroll() {
  if (!overlapRef.value) return;
  const rect = overlapRef.value.getBoundingClientRect();
  overlapScrolled.value = rect.bottom <= window.innerHeight;
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));

import Invite from '~/components/Invite.vue';
import Location from '~/components/Location.vue';
import Timing from '~/components/Timing.vue';
import Dresscode from '~/components/Dresscode.vue';
import FeedbackForm from '~/components/FeedbackForm.vue';
import Info from '~/components/Info.vue';
import AppFooter from '~/components/AppFooter.vue';
import Greeting from '~/components/Greeting.vue';

const route = useRoute();
const guestStore = useGuestStore();

watch(
  () => route.query,
  (q) => guestStore.initFromUrl(q as Record<string, unknown>),
  { deep: true, immediate: true }
);
</script>
<style lang="scss" scoped>
.desktop-modal {
  display: none;

  @media (min-width: theme('screens.lg')) {
    display: flex;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background-color: theme('colors.cream');
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  &__text {
    max-width: 720px;
    text-align: center;
    font-size: 3.5rem;
    line-height: 1.6;
    color: theme('colors.green');
  }
}

@media (min-width: theme('screens.lg')) {
  :global(body) {
    overflow: hidden;
  }
}

.overlap {
  position: relative;
  z-index: 2;
  top: 100dvh;
  background: theme('colors.capuccino');

  &--second {
    top: 200dvh;
  }
}
</style>
