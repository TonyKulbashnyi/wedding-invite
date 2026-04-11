<template>
  <section id="info" class="relative pt-10 pb-10 px-6 overflow-hidden bg-cream">
    <div class="relative z-10 max-w-3xl mx-auto text-center">
      <img :src="infoIcon" alt="Додаткова інформація" class="info__icon mb-5" />
      <p class="text-center font-serif text-md text-green mb-4 px-3">
        Ваші усмішки, теплі слова й святковий настрій — найцінніше для нас у цей день.
        <br><br>
        Якщо захочеться привітати нас додатково, будемо вдячні за побажання в конверті — такий подарунок стане приємним внеском у здійснення спільних мрій.   
        <br><br>
        Замість традиційних букетів чудовим компліментом стане «квіткова підписка», що ще довго нагадуватиме про це свято.
      </p>
      <div class="mt-6">
        <a
          href="https://drive.google.com/file/d/1AxfL_HmGGJZzxjTQLTms0GajEJHhSydk/view"
          target="_blank"
          rel="noopener noreferrer"
          class="info__btn"
        >
          Квіткова підписка
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import infoIcon from '~/assets/img/info-icon.png';

const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const parallaxStyle = computed(() => {
  const offset = scrollY.value * 0.18;
  return {
    transform: `translate3d(0, ${offset}px, 0)`,
    backgroundImage:
      "url(https://images.pexels.com/photos/3952033/pexels-photo-3952033.jpeg?auto=compress&cs=tinysrgb&w=1200)",
  };
});
</script>

<style lang="scss" scoped>
.info__icon {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
  height: auto;


  @media (min-width: theme('screens.md')) {
    width: 50%;
  }
}

.info__btn {
  display: inline-block;
  background-color: theme('colors.moss');
  color: #fff;
  padding: 0.75rem 1.75rem;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    opacity: 0.85;
  }
}
</style>
