<template>
  <section
    id="info"
    class="relative py-20 px-6 overflow-hidden bg-cream"
  >
    <div
      class="absolute inset-0 bg-center bg-cover will-change-transform"
      :style="parallaxStyle"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-cream/85 via-cream/90 to-cream/98"
    ></div>

    <div class="relative z-10 max-w-3xl mx-auto text-center">
      <p class="text-xs tracking-[0.3em] uppercase text-taupe mb-3">
        Додаткова інформація
      </p>
      <h2 class="font-serif text-2xl sm:text-3xl text-charcoal mb-4">
        Подарунки та проживання
      </h2>
      <p class="text-sm sm:text-base text-charcoal/85 mb-4 leading-relaxed">
        Найбільшим подарунком для нас буде ваша присутність у цей день. Якщо ж ви
        все ж хочете привітати нас особистим подарунком, ми будемо вдячні за
        конверт або сертифікат — так ми зможемо здійснити одну з наших спільних
        мрій.
      </p>
      <p class="text-sm sm:text-base text-charcoal/85 leading-relaxed">
        Для гостей з інших міст ми з радістю допоможемо з вибором готелю поблизу
        локації. Напишіть нам, якщо вам потрібні варіанти проживання або
        трансфер.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const parallaxStyle = computed(() => {
  const offset = scrollY.value * 0.18;
  return {
    transform: `translate3d(0, ${offset}px, 0)`,
    backgroundImage:
      'url(https://images.pexels.com/photos/3952033/pexels-photo-3952033.jpeg?auto=compress&cs=tinysrgb&w=1200)',
  };
});
</script>

