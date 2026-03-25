<template>
  <section id="location" class="location bg-cream mx-auto py-20">
    <div class="location__header">
      <img :src="locationBg" alt="Локація" class="location__bg" />
      <img :src="locationIcon" alt="Місце" class="location__icon" />
    </div>
    <div class="location__content pt-20">
      <h2 class="location__title capitalize text-xl sm:text-2xl text-green mb-4">
        Будемо чекати вас за адресою:
      </h2>
      <p class="location__address text-md text-green mb-4">
        {{ address }}
      </p>
      <div class="location__cta">
        <a
          :href="`https://maps.google.com/?q=${encodeURIComponent(address)}`"
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
