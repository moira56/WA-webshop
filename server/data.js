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
      'Adidas crna majica',
      80,
      ['XS', 'S', 'M', 'L'],
      ['#000000', '#FFFFFF', '#1E3A8A'],
      [
        '/images/majica.png',
        '/images/majica1.png',
        '/images/majica2.png',
        '/images/majica3.png',
      ],
      'Ova majica je savršena za svakodnevno nošenje uz visoku udobnost.',
      ['Pamuk 100%', 'Regular fit', 'Prati na 30°C']
    ),
    new Proizvod(
      2,
      'Hlače Adidas',
      110,
      ['S', 'M', 'L', 'XL'],
      ['#FFFFFF', '#B22222'],
      [
        '/images/hlace.png',
        '/images/hlace1.png',
        '/images/hlace2.png',
        '/images/hlace3.png',
      ],
      'Sportske hlače Adidas idealne su za treninge i svakodnevno nošenje.',
      ['70% pamuk, 30% poliester', 'Elastični struk s vezicom', 'Prozračan materijal', 'Dva praktična bočna džepa']
    ),
    new Proizvod(
      3,
      'Zimska kapa Adidas',
      40,
      ['One size'],
      ['#FF0000', '#000000'],
      [
        '/images/kapa.png',
        '/images/kapa1.png',
        '/images/kapa2.png',
        '/images/kapa3.png',
      ],
      'Topla i moderna zimska kapa Adidas pruža udobnost i zaštitu tijekom hladnih dana.',
      ['50% vuna, 50% akril', 'Podstava za dodatnu toplinu', 'Moderan dizajn s Adidas logotipom']
    ),
    new Proizvod(
      4,
      'Čarape Adidas',
      20,
      ['34-36', '37-39', '40-42', '43-45'],
      ['#FFFFFF', '#000000'],
      [
        '/images/carape.png',
        '/images/carape1.png',
        '/images/carape2.png',
        '/images/carape3.png',
      ],
      'Adidas čarape pružaju maksimalnu udobnost i potporu za svakodnevno nošenje.',
      ['70% pamuk, 20% poliester, 10% elastan', 'Ojačana peta i prsti za dugotrajnost', 'Elastičan i prilagodljiv materijal']
    ),
    new Proizvod(
      5,
      'Tenisice Adidas',
      200,
      ['38', '39', '40', '41', '42', '43', '44', '45'],
      ['#FFFFFF', '#0000FF', '#000000'],
      [
        '/images/patike.png',
        '/images/patike1.png',
        '/images/patike2.png',
        '/images/patike3.png',
      ],
      'Adidas sportske tenisice savršen su izbor za sve aktivnosti.',
      ['Gornji dio od mrežastog materijala za bolju prozračnost', 'Gumeni potplat za dodatnu izdržljivost', 'Udoban uložak s podrškom za luk stopala']
    ),
  ];
  
  module.exports = { Proizvod, proizvodi };
  