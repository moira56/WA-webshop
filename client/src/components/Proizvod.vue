<template>
  <div v-if="proizvod" class="bg-white">
    <div class="pt-6">
      <nav aria-label="Breadcrumb">
        <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <li>
            <div class="flex items-center">
              <router-link to="/" class="mr-2 text-sm font-medium text-gray-900">Odjeća</router-link>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li class="text-sm">
            <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">{{ proizvod.naziv }}</a>
          </li>
        </ol>
      </nav>

      <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div class="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
          <img :src="proizvod.slike[0]" alt="Proizvod slika" class="h-full w-full object-cover object-center" />
        </div>
        <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div class="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img :src="proizvod.slike[1]" alt="Proizvod slika" class="h-full w-full object-cover object-center" />
          </div>
          <div class="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img :src="proizvod.slike[2]" alt="Proizvod slika" class="h-full w-full object-cover object-center" />
          </div>
        </div>
        <div class="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg lg:row-span-2">
          <img :src="proizvod.slike[3]" alt="Proizvod slika" class="h-full w-full object-cover object-center" />
        </div>
      </div>

      <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ proizvod.naziv }}</h1>
        </div>

        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <h2 class="sr-only">Product information</h2>
          <p class="text-3xl tracking-tight text-gray-900">{{ proizvod.cijena }}€</p>

          
          <div class="mt-6">
            <h3 class="text-sm font-medium text-gray-900">Boje</h3>
            <fieldset aria-label="Choose a color" class="mt-4">
              <div class="flex items-center space-x-3">
                <label 
                  v-for="(boja, index) in proizvod.dostupne_boje" 
                  :key="index" 
                  class="relative flex items-center justify-center cursor-pointer"
                >
                  <input 
                    type="radio" 
                    name="color-choice" 
                    :value="boja" 
                    v-model="odabrana_boja"
                    class="sr-only" 
                  />
                  <span 
                    class="h-8 w-8 rounded-full border border-gray-300" 
                    :style="{ backgroundColor: boja }"
                    :class="{ 'ring-2 ring-black': odabrana_boja === boja }"
                  ></span>
                </label>
              </div>
            </fieldset>
            <div v-if="odabrana_boja" class="mt-2">
              <p class="text-sm text-gray-600">Odabrana boja: <span :style="{ color: odabrana_boja }">{{ odabrana_boja }}</span></p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Veličina</h3>
            <fieldset class="mt-4">
              <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                <label
                  v-for="(velicina, index) in proizvod.velicine"
                  :key="index"
                  class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none"
                  :class="{
                    'bg-gray-200': odabrana_velicina === velicina, 
                    'border-black': odabrana_velicina === velicina,
                    'font-semibold': odabrana_velicina === velicina
                  }"
                  @click="odabrana_velicina = velicina" 
                >
                  <input type="radio" name="size-choice" :value="velicina" class="sr-only" />
                  <span>{{ velicina }}</span>
                </label>
              </div>
            </fieldset>
          </div>

          <button 
            type="submit" 
            class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            @click="dodaj_handler"
          >
            Dodaj u košaricu
          </button>
        </div>

        <!-- Description and details -->
        <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <div class="space-y-6">
            <p class="text-base text-gray-900">{{ proizvod.opis }}</p>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Karakteristike</h3>
            <ul class="list-disc space-y-2 pl-4 text-sm">
              <li v-for="(karakteristika, index) in proizvod.karakteristike" :key="index" class="text-gray-600">{{ karakteristika }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { dodaj } from '../kosarica.js';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

let proizvod = ref({
  naziv: '',
  cijena: 0,
  velicine: [],
  dostupne_boje: [],
  slike: [],
  opis: '',
  karakteristike: []
});

const odabrana_velicina = ref(null);
const odabrana_boja = ref(null);

onMounted(async () => {
  const id = route.params.id;
  try {
    const response = await axios.get(`http://localhost:3059/proizvodi/${id}`);
    proizvod.value = response.data;
  } catch (error) {
    console.error('Greška u dohvatu podataka:', error);
  }
});

const dodaj_handler = () => {
  if (!odabrana_boja.value) {
    alert("Molimo odaberite boju.");
    return;
  }

  if (!odabrana_velicina.value) {
    alert("Molimo odaberite veličinu.");
    return;
  }

  const proizvod_kosarica = {
    id: proizvod.value.id,
    naziv: proizvod.value.naziv,
    cijena: proizvod.value.cijena,
    velicina: odabrana_velicina.value,
    boja: odabrana_boja.value,
    kolicina: 1,
  };

  dodaj(proizvod_kosarica);
  alert("Proizvod je dodan u košaricu!");
  router.push('/'); // Preusmjeravanje nakon dodavanja
};
</script>
