<template>
  <div class="min-h-screen flex flex-col bg-cream text-charcoal">
    <div class="desktop-modal">
      <p class="desktop-modal__text font-script ">
        Відкрийте запрошення на телефоні
      </p>
    </div>
    <main>
    
      <Greeting :style="greetingHidden ? { visibility: 'hidden' } : {}" />
      <div ref="overlapRef" class="overlap">
        <Invite />
        <Location />
      </div>
      <Timing :style="timingVisible && !timingHidden ? { visibility: 'visible' } : {}" />
      <div ref="overlapSecondRef" class="overlap overlap--second">
        <Dresscode />
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
const overlapSecondRef = ref<HTMLElement | null>(null);
const greetingHidden = ref(false);
const timingVisible = ref(false);
const timingHidden = ref(false);

// Hysteresis buffer (px) to prevent flickering at scroll threshold boundaries
const HYSTERESIS = 50;

function onScroll() {
  if (overlapRef.value) {
    const rect = overlapRef.value.getBoundingClientRect();

    // Greeting: hide once overlap's top edge reaches viewport top (Greeting fully covered)
    if (rect.top <= 0) {
      greetingHidden.value = true;
    } else if (rect.top > HYSTERESIS) {
      greetingHidden.value = false;
    }

    // Timing: show once overlap has fully scrolled out of the viewport (bottom edge exits)
    if (rect.bottom <= window.innerHeight - HYSTERESIS) {
      timingVisible.value = true;
    } else if (rect.bottom > window.innerHeight) {
      timingVisible.value = false;
    }
  }

  if (overlapSecondRef.value) {
    const rect2 = overlapSecondRef.value.getBoundingClientRect();

    // Timing: hide once overlap-second's top edge reaches viewport top (Timing fully covered)
    if (rect2.top <= 0) {
      timingHidden.value = true;
    } else if (rect2.top > HYSTERESIS) {
      timingHidden.value = false;
    }
  }
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
    top: 230dvh;
  }
}
</style>
