import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface GuestState {
  rawName: string | null;
}

export const useGuestStore = defineStore('guest', () => {
  const rawName = ref<string | null>(null);

  const displayName = computed(() => rawName.value ?? 'дорогі гості');

  function initFromUrl() {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name');
    if (nameParam) {
      rawName.value = nameParam.replace(/\+/g, ' ');
    }
  }

  function setName(name: string) {
    rawName.value = name;
  }

  return {
    rawName,
    displayName,
    initFromUrl,
    setName,
  };
});

