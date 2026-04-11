<template>
  <section id="dresscode" ref="sectionRef" class="dresscode bg-cream mx-auto">
    <div class="dresscode__header pt-12">
      <h2
        class="dresscode-title px-6 relative z-10 pb-2 pt-4 md:mb-mx-auto text-center font-script text-7xl md:text-8xl text-green leading-none"
      >
        Дресс-код
      </h2>

      <p class="px-6 text-center font-serif text-md text-green mb-8">
        Гармонія свята створюється у деталях. Будемо щиро вдячні за підтримку кольорової гами у святкових образах.
      </p>
    </div>
    <DresscodeContent :visible="isVisible" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
      }
    },
    { threshold: 0.8 }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style lang="scss" scoped>
.dresscode {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  min-height: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
