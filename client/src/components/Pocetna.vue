<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Odjeća</router-link>
        <div class="d-flex">
          <span class="navbar-text">Košarica: {{ brproizvoda_kosarica }} proizvoda</span>
        </div>
      </div>
    </nav>

    <div class="proizvodi-container">
      <div v-for="proizvod in proizvodi" :key="proizvod.id" class="proizvod-card">
        <router-link :to="`/proizvodi/${proizvod.id}`" class="proizvod-link">
          <img :src="proizvod.slike[0]" :alt="proizvod.naziv" class="proizvod-img" />
          <div class="proizvod-info">
            <h3 class="proizvod-naziv">{{ proizvod.naziv }}</h3>
            <p class="proizvod-cijena">{{ proizvod.cijena }}€</p>
          </div>
        </router-link>
      </div>
    </div>

    <div v-if="brproizvoda_kosarica > 0" class="button-container">
      <button @click="naruci" class="naruci-button">Naruči proizvode</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getKosaricu, ocisti } from '../kosarica.js';

const proizvodi = ref([]);
const brproizvoda_kosarica = ref(0);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3059/proizvodi');
    proizvodi.value = response.data;
  } catch (error) {
    alert('Greška prilikom dohvaćanja proizvoda. Pokušajte ponovno.');
  }

  brproizvoda_kosarica.value = getKosaricu().length;
});

const naruci = async () => {
  const kosarica = getKosaricu();

  if (kosarica.length === 0) {
    alert('Košarica je prazna. Dodajte proizvode prije naručivanja.');
    return;
  }

  const ukupnaCijena = kosarica.reduce((ukupno, proizvod) => ukupno + proizvod.cijena * proizvod.kolicina, 0);

  try {
    const response = await axios.post('http://localhost:3059/narudzbe', {
      narudzba: kosarica,
    });

    if (response.status === 201) {
      alert(`Narudžba uspješna! Ukupna cijena: ${ukupnaCijena}€`);
      ocisti();
      brproizvoda_kosarica.value = 0;
    } else {
      alert('Greška na poslužitelju prilikom obrade narudžbe. Pokušajte ponovno.');
    }
  } catch (error) {
    alert('Greška prilikom slanja narudžbe. Pokušajte ponovno.');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

.navbar {
  margin-bottom: 20px;
}

.navbar .navbar-brand {
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5em;
  margin-left: 30px;
}

.proizvodi-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.proizvod-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.proizvod-card:hover {
  transform: scale(1.05);
}

.proizvod-link {
  text-decoration: none;
}

.proizvod-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.proizvod-info {
  padding: 10px;
  background-color: #f9f9f9;
  text-align: center;
}

.proizvod-naziv {
  margin: 0;
  font-size: 1.2em;
  color: black; /* Crna boja za naslov proizvoda */
  font-weight: bold;
  text-transform: capitalize;
}

.proizvod-cijena {
  margin: 5px 0 0;
  font-size: 1em;
  color: #333;
}

.naruci-button {
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 0.9em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.naruci-button:hover {
  background-color: #4c51bf;
}
</style>
