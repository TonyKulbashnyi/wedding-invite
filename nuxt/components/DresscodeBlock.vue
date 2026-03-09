<template>
  <section id="dresscode" class="bg-stone/30 py-16 px-6">
    <div class="max-w-3xl mx-auto">
      <p class="text-xs tracking-[0.3em] uppercase text-taupe mb-3">
        Дрес-код
      </p>
      <h2 class="font-serif text-2xl sm:text-3xl text-charcoal mb-4">
        Елегантна вечірка в природних тонах
      </h2>
      <p class="text-sm sm:text-base text-charcoal/80 mb-6 leading-relaxed">
        Ми будемо раді, якщо ви оберете для свого образу спокійні природні
        відтінки кремового, бежевого, оливкового та графітового. Уникаймо
        яскравих неонових кольорів та надто контрастних принтів — нехай
        палітра вечора буде мʼякою та гармонійною.
      </p>

      <div class="flex flex-wrap gap-4 items-center justify-start">
        <div
          v-for="swatch in swatches"
          :key="swatch.hex"
          class="flex flex-col items-center text-xs text-charcoal/70"
        >
          <div
            class="w-12 h-12 rounded-full shadow-sm border border-birch"
            :style="{ backgroundColor: swatch.hex }"
          ></div>
          <span class="mt-1">{{ swatch.label }}</span>
          <span class="text-[0.7rem] text-taupe uppercase tracking-wide">
            {{ swatch.hex }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Swatch {
  label: string;
  hex: string;
}

const swatches: Swatch[] = [
  { label: 'Charcoal', hex: '#4a4a48' },
  { label: 'Taupe', hex: '#9c8f7a' },
  { label: 'Stone', hex: '#d5cbb8' },
  { label: 'Cream', hex: '#f5f2e6' },
  { label: 'Birch', hex: '#cac7c1' },
  { label: 'Lichen', hex: '#a8ae85' },
];
</script>

