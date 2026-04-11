<template>
  <section id="timing" class="timing">
    <h2 class="timing__title invite-title px-6 relative z-10 pt-12 md:mb-mx-auto text-center font-script text-7xl md:text-8xl text-white leading-none pt-20 pb-24">
      Таймінг
    </h2>
    <div class="timing__slots container mx-auto text-white text-2xl md:text-4xl px-8 md:px-10 uppercase">
      <div v-for="slot in slots" :key="slot.time" class="timing__slot">
        <h3 class="timing__slot-title">
          <span class="timing__slot-time">{{ slot.title }}</span>
        </h3>
        <p class="timing__slot-description">
          {{ slot.time }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import timingBg from '~/assets/img/4.jpeg';

const slots = [
  {
    time: '13:00',
    title: 'Welcome',
  },
  {
    time: '14:00',
    title: 'Церемонія',
  },
  {
    time: '15:00',
    title: 'Банкет',
  },
  {
    time: '20:00',
    title: 'Торт',
  },
  {
    time: '22:00',
    title: 'Завершення вечора',
  },
];
</script>

<style lang="scss" scoped>
.timing {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  box-sizing: border-box;
  background-image: v-bind("'url(' + timingBg + ')'");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  


  &__slots {
    display: flex;
    flex-direction: column;
    gap: 3rem;

      @media (min-width: theme('screens.md')) {
      gap: 7vh;
    }
    
  }

  &__slot {
    display: flex;
    justify-content: space-between;
  }
}
</style>
