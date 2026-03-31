<template>
  <section id="info" class="relative py-20 px-6 overflow-hidden bg-cream">
    <div class="relative z-10 max-w-3xl mx-auto text-center">
      <h2
        class="info-title relative z-10 pb-4 md:mb-mx-auto text-center font-script text-7xl md:text-8xl text-green leading-none"
      >
        Додаткова інформація
      </h2>
      <p class="text-center font-serif text-md text-green mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam minus
        iste cupiditate repellendus porro reiciendis dignissimos voluptates
        illo.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam minus
        iste cupiditate repellendus porro reiciendis dignissimos voluptates
        illo.
      </p>
      <div class="mt-6">
        <a
          href="https://drive.google.com/file/d/1mhx5i_zviODrCanyxNh59yJyofIU4jJc/view"
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
