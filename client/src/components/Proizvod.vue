<template>
  <div v-if="proizvod" class="bg-white">
    <div class="pt-6">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb">
        <ol class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <li><a href="#" class="mr-2 text-sm font-medium text-gray-900">Odjeća</a></li>
          <li class="text-sm font-medium text-gray-500 hover:text-gray-600">{{ proizvod.naziv }}</li>
        </ol>
      </nav>

      <!-- Image gallery -->
      <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div class="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
          <img :src="proizvod.slike[0]" alt="Proizvod slika" class="h-full w-full object-cover object-center" />
        </div>
        <div class="lg:grid lg:grid-cols-1 lg:gap-y-8">
          <img v-for="(slika, index) in proizvod.slike.slice(1)" :key="index" :src="slika" alt="Proizvod slika" class="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg h-full w-full object-cover object-center" />
        </div>
      </div>

      <!-- Product info -->
      <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ proizvod.naziv }}</h1>
          <p class="text-base text-gray-900 mt-4">{{ proizvod.opis }}</p>
        </div>

        <!-- Options -->
        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <p class="text-3xl tracking-tight text-gray-900">{{ proizvod.cijena }}€</p>
          <form class="mt-10">
            <!-- Colors -->
            <div>
              <h3 class="text-sm font-medium text-gray-900">Boje</h3>
              <fieldset class="mt-4">
                <div class="flex items-center space-x-3">
                  <span v-for="(boja, index) in proizvod.dostupne_boje" :key="index" class="h-8 w-8 rounded-full border border-black border-opacity-10" :style="{ backgroundColor: boja }"></span>
                </div>
              </fieldset>
            </div>
            <!-- Sizes -->
            <div class="mt-10">
              <h3 class="text-sm font-medium text-gray-900">Veličina</h3>
              <fieldset class="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                <label v-for="(velicina, index) in proizvod.velicine" :key="index" class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                  <input type="radio" name="size-choice" :value="velicina" class="sr-only" />
                  <span>{{ velicina }}</span>
                </label>
              </fieldset>
            </div>
            <button type="submit" class="mt-10 w-full flex items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700">Dodaj u košaricu</button>
          </form>
        </div>

        <!-- Description and details -->
        <div class="py-10 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8">
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
import axios from 'axios';

let proizvod = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3007/proizvodi/1');
    proizvod.value = response.data;
  } catch (error) {
    console.error('Greška u dohvatu podataka:', error);
  }
});
</script>
