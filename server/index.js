const express = require('express');
const cors = require('cors');
const { proizvodi } = require('./data.js'); 

const app = express();
const PORT = 3059;

app.use(cors());
app.use(express.json());

const narudzbe = [];

class Narudzba {
  constructor(id, narudzba) {
    this.id = id;
    this.narudzba = narudzba;
    
  }

  get ukupnaCijena() {
    return this.narudzba.reduce((suma, proizvodNarudzba) => {
      const proizvod = proizvodi.find(p => p.id === proizvodNarudzba.id);
      return proizvod ? suma + (proizvod.cijena * proizvodNarudzba.kolicina) : suma;
    }, 0);
  }
}


app.get('/proizvodi', (req, res) => {
  res.status(200).json(proizvodi);
});


app.get('/proizvodi/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const proizvod = proizvodi.find(p => p.id === id);
  if (proizvod) {
    res.status(200).json(proizvod);
  } else {
    res.status(404).json({ message: 'Proizvod nije pronađen' });
  }
});


app.post('/narudzbe', (req, res) => {
  const { narudzba } = req.body; 

  if (!Array.isArray(narudzba) || narudzba.length === 0) {
    return res.status(400).json({ message: 'Nema podataka o narudžbi' });
  }

  const novaNarudzba = new Narudzba(narudzbe.length + 1, narudzba);
  narudzbe.push(novaNarudzba);

  res.status(201).json({
    message: 'Narudžba uspješno stvorena',
    ukupnaCijena: novaNarudzba.ukupnaCijena,
    narudzba: novaNarudzba,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
