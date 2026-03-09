<template>
  <section id="invite" class="bg-cream py-16 px-6">
    <div class="max-w-2xl mx-auto">
      <p class="text-xs tracking-[0.3em] uppercase text-taupe mb-3">
        Запрошення
      </p>
      <h2 class="font-serif text-2xl sm:text-3xl text-charcoal mb-6">
        Дорогий(а) {{ guestName }},
      </h2>
      <p class="text-sm sm:text-base text-charcoal/85 leading-relaxed mb-8">
        Ми щиро запрошуємо вас розділити з нами урочистий день нашого
        весілля. Нехай 9 вересня 2026 року стане для всіх нас теплим святом
        любові, радості та світлих спогадів.
      </p>

      <div class="rounded-3xl border border-birch bg-stone/40 p-5 shadow-sm">
        <p class="font-serif text-center text-lg text-charcoal mb-4">
          Вересень 2026
        </p>
        <div class="grid grid-cols-7 gap-1 text-xs text-center">
          <span class="text-[0.65rem] tracking-widest text-taupe">ПН</span>
          <span class="text-[0.65rem] tracking-widest text-taupe">ВТ</span>
          <span class="text-[0.65rem] tracking-widest text-taupe">СР</span>
          <span class="text-[0.65rem] tracking-widest text-taupe">ЧТ</span>
          <span class="text-[0.65rem] tracking-widest text-taupe">ПТ</span>
          <span class="text-[0.65rem] tracking-widest text-taupe">СБ</span>
          <span class="text-[0.65rem] tracking-widest text-taupe">НД</span>

          <span></span>
          <span></span>
          <span class="calendar-day">1</span>
          <span class="calendar-day">2</span>
          <span class="calendar-day">3</span>
          <span class="calendar-day">4</span>
          <span class="calendar-day">5</span>
          <span class="calendar-day">6</span>
          <span class="calendar-day">7</span>
          <span class="calendar-day">8</span>
          <span class="calendar-day calendar-day--highlight">9</span>
          <span class="calendar-day">10</span>
          <span class="calendar-day">11</span>
          <span class="calendar-day">12</span>
          <span class="calendar-day">13</span>
          <span class="calendar-day">14</span>
          <span class="calendar-day">15</span>
          <span class="calendar-day">16</span>
          <span class="calendar-day">17</span>
          <span class="calendar-day">18</span>
          <span class="calendar-day">19</span>
          <span class="calendar-day">20</span>
          <span class="calendar-day">21</span>
          <span class="calendar-day">22</span>
          <span class="calendar-day">23</span>
          <span class="calendar-day">24</span>
          <span class="calendar-day">25</span>
          <span class="calendar-day">26</span>
          <span class="calendar-day">27</span>
          <span class="calendar-day">28</span>
          <span class="calendar-day">29</span>
          <span class="calendar-day">30</span>
        </div>
        <p class="mt-4 text-xs text-center text-taupe">
          9 вересня — день нашого свята
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGuestStore } from '~/stores/guestStore';

const guestStore = useGuestStore();
const { displayName } = storeToRefs(guestStore);

const guestName = displayName;
</script>

<style scoped>
.calendar-day {
  @apply w-8 h-8 mx-auto flex items-center justify-center rounded-full text-[0.75rem] text-charcoal/85;
}

.calendar-day--highlight {
  @apply bg-lichen text-forest font-semibold shadow-sm;
}
</style>

