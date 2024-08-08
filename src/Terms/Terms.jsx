import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './terms.scss'
const Terms = () => {
  return (
    <>
      <Header />
      <div className="terms">
        <h1>PRAVILA I USLOVI</h1>
        <p>
          Dobrodošli na KEYCAP, platformu za povezivanje gamera i diskusijama o igrama. Korišćenjem našeg sajta, prihvatate sljedeće uslove korišćenja:</p>
        <h2>
          1. Prihvaćanje Uslova
        </h2>
        <p>
          Korišćenjem KEYCAP-a, slažete se sa ovim Pravilima i Uslovima. Ako se ne slažete sa bilo kojim dijelom ovih uslova, molimo vas da ne koristite naš sajt.
        </p>
        <h2>2. Registracija i Korisnički Nalozi</h2>
        <p>Obavezujete se da ćete pružiti tačne, potpune i ažurirane informacije tokom registracije.
          Vi ste odgovorni za sigurnost svog naloga i lozinke. KEYCAP nije odgovoran za bilo kakav gubitak ili štetu koja može nastati usled neovlašćene upotrebe vašeg naloga.</p>
        <h2>3. Forum</h2>
        <p>
          Korisnici su dužni da poštuju druge članove i da se pridržavaju osnovnih pravila pristojnosti.
          Zabranjeno je objavljivanje sadržaja koji je uvrijedljiv, neprikladan, nezakonit ili krši prava trećih strana.
          Administratori i moderatori imaju pravo da uklone ili izmijene bilo koji sadržaj koji krši pravila foruma.
        </p>
        <h2>4. Rankovi i Trade Offer-i</h2>
        <p> Plaćanje za rankove na KEYCAP-u vrši se putem Steam trade offer-a sa skinovima i drugim predmetima. Svi trade offer-i su finalni i nepovratni.</p>
        <h2>5. Korišćenje Sajta</h2>
        <p>Zabranjeno je koristiti sajt za bilo kakve nezakonite aktivnosti.
          Nije dozvoljeno koristiti automatizovane sisteme ili softver za prikupljanje informacija sa sajta.
          Bilo kakvo nepoštovanje ovih pravila može dovesti do trajnog ukidanja naloga.</p>
        <h2>
          6. Izmjene Uslova
        </h2>
        <p>
          KEYCAP zadržava pravo da u bilo kom trenutku izmijeni ove uslove. Nastavljanjem korišćenja sajta nakon izmjena uslova, slažete se sa novim uslovima.
        </p>
        <h2>7. Odricanje Odgovornosti</h2>
        <p>KEYCAP ne garantuje neprekidnu dostupnost ili funkcionalnost sajta.
          Ne snosimo odgovornost za bilo kakve direktne ili indirektne štete koje mogu nastati korišćenjem sajta.</p>
        <h2>8. Kontakt</h2>
        <p>Za sva pitanja ili nedoumice, kontaktirajte nas putem email-a na keycapsupport@gmail.com.</p>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Terms;
