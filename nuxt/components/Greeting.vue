<template>
  <section class="greeting bg-cream relative py-16 px-6 flex flex-col items-center justify-between min-h-[100dvh] overflow-hidden">
    <div class="slideshow">
      <div
        v-for="(img, i) in images"
        :key="i"
        class="slide"
        :class="{
          active: i === currentIndex,
          'slide--zoom-in': i % 2 === 1,
          'slide--zoom-out': i % 2 === 0
        }"
        :style="{ backgroundImage: `url(${img})` }"
      />
    </div>

    <div class="greeting-logo-wrap relative z-10 w-full md:w-[70vw] lg:w-[50vw] pt-4">
      <img :src="logoImg" alt="Logo" class="greeting-logo" />
    </div>
    <p class="greeting-date relative z-10 text-cream text-lg sm:text-xl tracking-widest pb-4">09/09/26</p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import logoImg from '~/assets/img/logo.png'
import img1 from '~/assets/img/greeting/1.png'
import img2 from '~/assets/img/greeting/2.png'
import img3 from '~/assets/img/greeting/3.png'


const images = [img1, img2, img3]

const currentIndex = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (images.length <= 1) return
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 3000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style lang="scss" scoped>
.greeting {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;


  &-logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &-date {
    font-family: 'Roboto Flex', sans-serif;
    font-size: 4.25rem;
    font-weight: 200;
  }
}

.slideshow {
  position: absolute;
  inset: 0;
}

.slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  transform: scale(1);

}

.slide.active.slide--zoom-in {
  opacity: 1;
  animation: slide-scale-in 3s ease-out forwards;
}

.slide.active.slide--zoom-out {
  opacity: 1;
  animation: slide-scale-out 3s ease-out forwards;
}

@keyframes slide-scale-in {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.06);
  }
}

@keyframes slide-scale-out {
  from {
    transform: scale(1.06);
  }
  to {
    transform: scale(1);
  }
}


</style>

