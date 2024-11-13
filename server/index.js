const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3007;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express server is running');
});

app.get('/proizvodi', (req, res) => {
  res.status(200).json(proizvodi);
});

app.get('/proizvodi/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const proizvod = proizvodi.find(p => p.id === id);
  if (proizvod) {
    res.status(200).json(proizvod);
  } else {
    res.status(404).send('Proizvod nije pronađen');
  }
});

app.post('/narudzba', (req, res) => {
  const { naruceni_proizvodi } = req.body;

  if (!Array.isArray(naruceni_proizvodi) || naruceni_proizvodi.length === 0) {
    return res.status(400).json({ message: 'Nema podataka o narudžbi' });
  }

  const novaNarudzba = new Narudzba(narudzbe.length + 1, naruceni_proizvodi);
  narudzbe.push(novaNarudzba);

  res.status(201).json({
    message: 'Narudžba uspješno stvorena',
    ukupnaCijena: novaNarudzba.ukupnaCijena,
    narudzba: novaNarudzba
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

class Proizvod {
  constructor(id, naziv, cijena, velicine, dostupne_boje = [], slike = [], opis = '', karakteristike = []) {
    this.id = id;
    this.naziv = naziv;
    this.cijena = cijena;
    this.velicine = velicine;
    this.dostupne_boje = dostupne_boje;
    this.slike = slike;
    this.opis = opis;
    this.karakteristike = karakteristike;
  }
}

const proizvodi = [
  new Proizvod(
    1,
    'Obična crna majica',
    80,
    ['XS', 'S', 'M', 'L'],['#000000', '#FFFFFF', '#1E3A8A'],[
      'https://shop.vogue.com/cdn/shop/products/VogueBlackteetonallogo.png?v=1679068936&width=800',
      'https://example.com/slika2.jpg',
      'https://example.com/slika3.jpg',
      'https://example.com/slika4.jpg'
    ],
    'Otkrijte ultimativni spoj udobnosti i stila s našom premium crnom majicom kratkih rukava. Idealna za sve prilike i sve stilove.',
    [
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
      'doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto',
      'beatae vitae dicta sunt explicabo',
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit'
    ]
  ),
  new Proizvod(
    2,
    "Levi's 501 traperice",
    110,
    ['S', 'M', 'L'],
    ['#FFFFFF'],
    ['https://m.media-amazon.com/images/I/81Zt42ioCgL._AC_UL1500_.jpg'],
    'Klasične traperice koje nikada ne izlaze iz mode.',
    ['Pamuk', 'Iznimno izdržljive', 'Lako se održavaju']
  ),
  new Proizvod(
    3,
    'Zimska kapa',
    40,
    ['onesize'],
    ['#FF0000'],
    ['https://m.media-amazon.com/images/I/71c8IVPgsNL._AC_UL1500_.jpg'],
    'Topla zimska kapa koja će vas grijati tijekom hladnih dana.',
    ['Mekani materijal', 'Dostupna u crvenoj boji']
  ),
  new Proizvod(
    4,
    'Čarape Adidas',
    20,
    ['34-36', '37-39', '40-42'],
    ['#FFFFFF', '#000000'],
    ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cf4d458d0a7f4f1290a3abdb010f81e0_9366/Performance_Crew_Socks_6_Pairs_Multicolor_DZ9355_21_model.jpg'],
    'Udobne sportske čarape za svakodnevnu upotrebu.',
    ['Pamuk', 'Dostupne u bijeloj i crnoj boji']
  ),
  new Proizvod(
    5,
    'Tenisice Nike',
    200,
    ['38', '39', '40', '41', '42', '43', '44', '45'],
    ['#FFFFFF', '#0000FF'],
    ['https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/47a5241c-d1a0-4599-b951-8ae394850497/air-force-1-07-shoe-FM2kz5.png'],
    'Kvalitetne sportske tenisice za sve sportske aktivnosti.',
    ['Izdržljive', 'Dostupne u bijeloj i plavoj boji']
  )
];

class Narudzba {
  constructor(id, naruceni_proizvodi) {
    this.id = id;
    this.naruceni_proizvodi = naruceni_proizvodi;
  }

  get ukupnaCijena() {
    return this.naruceni_proizvodi.reduce((suma, proizvodNarudzba) => {
      const proizvod = proizvodi.find(p => p.id === proizvodNarudzba.id);
      return proizvod ? suma + (proizvod.cijena * proizvodNarudzba.kolicina) : suma;
    }, 0);
  }
}

const narudzbe = [];
