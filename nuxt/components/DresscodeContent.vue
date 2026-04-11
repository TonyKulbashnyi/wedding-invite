<template>
  <section
    id="dresscode-content"
    class="dresscode-content bg-cream mx-auto pb-20"
    :class="{ 'dresscode-content--visible': visible }"
  >
    <div
      class="dresscode-content__swatches flex flex-col align-left flex-wrap gap-4"
    >
      <div
        v-for="swatch in swatches"
        :key="swatch.hex"
        class="dresscode-content__item"
        :style="{ backgroundColor: swatch.hex, border: `2px solid ${swatch.color}`, color: swatch.color }"
      >
        <span class="mt-1">{{ swatch.label }}</span>
      </div>
    </div>
    <div class="dresscode-content__image">
      <img
        :src="Dresscode"
        alt="Dresscode"
        class="dresscode-content__image-img"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import Dresscode from "~/assets/img/dresscode.png";

defineProps<{ visible?: boolean }>();

interface Swatch {
  label: string;
  hex: string;
  color?: string;
}

const swatches: Swatch[] = [
  { label: "Хвоя", hex: "#3b421d" },
  { label: "Мох", hex: "#646940" },
  { label: "Шавлія", hex: "#a8ae85" },
  { label: "Графіт", hex: "#4a4a48" },
  { label: "Береза", hex: "#cac7c1" },
  { label: "Тауп", hex: "#9c8f7a" },
  { label: "Травентин", hex: "#d5cbb8" },
  { label: "Земля", hex: "#71614a" },
];
</script>
<style lang="scss" scoped>
.dresscode {
  &-content {
    transform: translateY(60px);
    opacity: 0;
    transition: transform 1.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.5s ease;

    &--visible {
      transform: translateY(0);
      opacity: 1;
    }
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 4rem;

    @media (min-width: theme("screens.md")) {
      align-items: flex-start;
    }

    &__swatches {
      flex: 0 0 35%;
      width: 35%;

      @media (min-width: theme("screens.md")) {
        width: 40%;
        flex: 0 0 40%;
      }

      @media (min-width: theme("screens.lg")) {
        width: 60%;
        flex: 0 0 60%;
      }
    }

    &__image {
      flex: 1;
      display: flex;
      align-items: flex-end;

      @media (min-width: theme("screens.md")) {
        align-items: flex-start;
      }
    }

    &__item {
      display: flex;
      height: 40px;
      width: 100%;
      align-items: center;
      justify-content: center;
      color: #fff;
    }

    &__image-img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
      object-position: bottom;

      @media (min-width: theme("screens.md")) {
        object-position: top;
      }
    }
  }
}
</style>
