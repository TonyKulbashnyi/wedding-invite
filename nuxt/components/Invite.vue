<template>
  <section id="invite" class="invite bg-cream mx-auto">
    <div class="invite__header">
      <p
        class="invite-title px-6 relative z-10 pt-4 md:mb-mx-auto text-center font-script text-7xl md:text-8xl md:text-6xl text-green leading-none"
      >
        {{ displayInviteTitle }}
      </p>
      <h2
        class="px-6 text-center uppercase font-serif text-2xl sm:text-3xl text-green mb-6 md:mb-8">
        <template v-if="allGuestNames.length">
          <template v-for="(name, i) in allGuestNames" :key="name">
            <template v-if="i > 0"> &amp; </template>{{ name }}
          </template>
          <template v-if="displaySharedSurname">&nbsp;{{ displaySharedSurname }}</template>
        </template>
        <template v-else>дорогі гості</template>
      </h2>

      <p class="px-6 text-center font-serif text-md text-green mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam minus
        iste cupiditate repellendus porro reiciendis dignissimos voluptates
        illo.
      </p>
    </div>
    <div class="invite__info">
      <div class="invite__info-image">
        <img :src="invitePhoto" alt="Весілля" class="invite__info-img" />
      </div>
      <div class="invite__info-text px-3">
        <div class="invite__info-text-inner">
          <p
            class="invite__info-script-date font-script text-6xl  md:text-8xl text-green leading-none"
          >
            09.09.2026
          </p>
          <p
            class="invite__info-script-tagline text-xl sm:text-2xl  text-green/90 leading-tight"
          >
            День, коли ми станемо сім'єю
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useGuestStore } from "~/stores/guestStore";
import invitePhoto from "~/assets/img/8.jpeg";

const guestStore = useGuestStore();
const {
  displayName,
  displayPartnerName,
  displayThirdName,
  displayFourthName,
  displayInviteTitle,
  hasTwoGuests,
  displaySharedSurname,
} = storeToRefs(guestStore);

const allGuestNames = computed(() =>
  [displayName.value, displayPartnerName.value, displayThirdName.value, displayFourthName.value]
    .filter(n => n && n !== 'дорогі гості')
);

const hasMultipleGuests = computed(() => allGuestNames.value.length > 1);
</script>

<style lang="scss" scoped>
.invite {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  min-height: 0;
  overflow: hidden;
  box-sizing: border-box;

  &__header {
    flex-shrink: 0;
    padding-top: 2rem;
    padding-bottom: 0.5rem;
    color: theme("colors.green");
  }

  &__info {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }

  &__info-image {
    position: relative;
    flex: 0 0 50%;
    height: 100%;
    min-height: 0;
    align-self: stretch;
    overflow: hidden;
    border-radius: 2px;
  }

  &__info-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__info-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 0;
    min-height: 0;
  }

  &__info-text-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .invite__info-script-date,
  .invite__info-script-tagline {
    margin: 0;
  }
}
</style>
