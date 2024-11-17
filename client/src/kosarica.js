const kosarica = JSON.parse(localStorage.getItem('kosarica')) || [];

export const dodaj = (proizvod) => {
  kosarica.push(proizvod);
  localStorage.setItem('kosarica', JSON.stringify(kosarica));
};

export const getKosaricu = () => {
  return kosarica;
};

export const ukloni = (id) => {
  const index = kosarica.findIndex(proizvod => proizvod.id === id);
  if (index !== -1) {
    kosarica.splice(index, 1);
    localStorage.setItem('kosarica', JSON.stringify(kosarica));
  }
};

export const ocisti = () => {
  localStorage.removeItem('kosarica');
};