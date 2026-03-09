<template>
  <section id="timing" class="bg-cream py-16 px-6">
    <div class="max-w-3xl mx-auto">
      <p class="text-xs tracking-[0.3em] uppercase text-taupe mb-3">
        Програма вечора
      </p>
      <h2 class="font-serif text-2xl sm:text-3xl text-charcoal mb-8">
        Розклад подій
      </h2>

      <div class="relative border-l border-birch pl-6 space-y-8">
        <TimelineItem time="15:00" title="Welcome drinks">
          Легкі напої, знайомства та перші спільні фото.
        </TimelineItem>
        <TimelineItem time="16:00" title="Церемонія">
          Урочиста церемонія під відкритим небом у колі найближчих.
        </TimelineItem>
        <TimelineItem time="18:00" title="Вечеря">
          Вишукана вечеря, тости та теплі слова.
        </TimelineItem>
        <TimelineItem time="20:00" title="Вечірка">
          Танці, музика та святковий настрій до пізньої ночі.
        </TimelineItem>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TimelineItem from '~/components/TimingItem.vue';
</script>

