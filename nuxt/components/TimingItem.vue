<template>
  <div class="relative flex gap-4 items-start">
    <div class="flex flex-col items-center -ml-[13px] mr-1">
      <div
        class="w-6 h-6 rounded-full bg-cream border-2 border-lichen flex items-center justify-center shadow-sm"
      >
        <div class="w-2 h-2 rounded-full bg-lichen"></div>
      </div>
    </div>
    <div class="pb-2">
      <p class="text-xs tracking-[0.25em] uppercase text-taupe mb-1">
        {{ time }}
      </p>
      <h3 class="font-serif text-lg text-charcoal mb-1">
        {{ title }}
      </h3>
      <p class="text-sm text-charcoal/80">
        <slot />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  time: string;
  title: string;
}

defineProps<Props>();
</script>

