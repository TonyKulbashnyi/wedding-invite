<template>
  <section id="location" class="bg-stone/40 py-16 px-6">
    <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
      <div>
        <p class="text-xs tracking-[0.3em] uppercase text-taupe mb-3">
          Локація
        </p>
        <h2 class="font-serif text-2xl sm:text-3xl text-charcoal mb-4">
          Вечір весілля
        </h2>
        <p class="text-sm sm:text-base text-charcoal/85 mb-4">
          Ресторан «Лісова тераса»<br />
          вул. Затишна, 9, Київ
        </p>
        <p class="text-sm text-charcoal/75 mb-6">
          Простора зала з терасою, що виходить у зелений сад, де ми зможемо
          насолодитися затишною атмосферою, музикою та теплими розмовами до
          пізнього вечора.
        </p>
        <a
          class="inline-flex items-center justify-center rounded-full bg-forest text-cream px-6 py-3 text-sm font-medium shadow-md hover:bg-moss transition-colors"
          href="https://www.google.com/maps/dir/?api=1&destination=50.4501,30.5234"
          target="_blank"
          rel="noopener noreferrer"
        >
          Прокласти маршрут
        </a>
      </div>

      <div class="rounded-3xl overflow-hidden shadow-md">
        <iframe
          class="w-full h-64 md:h-80"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.8479152436126!2d30.516682!3d50.449245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDI2JzU3LjMiTiAzMMKwMzEnMDEuMiJF!5e0!3m2!1suk!2sua!4v1700000000000"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

