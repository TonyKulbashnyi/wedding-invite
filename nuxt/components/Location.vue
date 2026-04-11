<template>
  <section id="location" class="location bg-cream mx-auto py-20">
    <div class="location__header">
      <img :src="locationBg" alt="Локація" class="location__bg" />
      <img :src="locationIcon" alt="Місце" class="location__icon" />
    </div>
    <div class="location__content pt-20">
      <h2 class="location__title text-xl sm:text-2xl text-green mb-4">
        З нетерпінням чекатимемо за адресою:
      </h2>
      <p class="location__address text-md text-green mb-4">
        {{ address }}
      </p>
      <div class="location__cta">
        <a
          href="https://www.google.com/maps/place/Forrest+Club/@50.5295355,30.4541032,18z/data=!3m1!4b1!4m6!3m5!1s0x40d4cda1d90ffbf3:0xe8a07d3ec2b2c57f!8m2!3d50.5295345!4d30.4548941!16s%2Fg%2F11x99r8h_?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          class="location__btn"
        >
          Подивитися адресу
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import locationBg from '~/assets/img/location.png';
import locationIcon from '~/assets/img/location-icon.png';

const address = 'м. Київ, проспект Литовський, 20а';
</script>

<style lang="scss" scoped>
.location {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  box-sizing: border-box;

  &__header {
    position: relative;
    width: 100%;

    @media (min-width: theme('screens.md')) {
      height: 40vh;
    }
  }

  &__bg {
    display: block;
    width: 100%;
    height: auto;

    @media (min-width: theme('screens.md')) {
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__btn {
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

  &__icon {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: auto;

    @media (min-width: theme('screens.md')) {
      width: 50%;
      
    }
  }
}
</style>
