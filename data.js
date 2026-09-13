// ============================================================
// DATOS DEL VIAJE — Fuengirola ⇄ Algarve, 13–15 sept 2026
// Edita aquí si cambia algo del plan.
// ============================================================

const TRIP = {
  title: "Fuengirola ⇆ Algarve",
  subtitle: "Escapada de lunes y martes",
  startDate: "2026-09-13T22:00:00+02:00", // salida domingo noche
};

// Waze helper: construye enlace de navegación
function wazeUrl(lat, lng) {
  return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes&zoom=17`;
}
function mapsUrl(lat, lng, label) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}${label ? `(${encodeURIComponent(label)})` : ""}`;
}

// ---- Puntos de interés (comer / ver) por parada ----
const POIS = {
  tavira: [
    { type: "comer", name: "Borda D'Água Gastrobar", note: "Vistas al puente romano, cataplana muy recomendada.", rating: 4.6, phone: "+351931050597", lat: 37.1273559, lng: -7.6502069 },
    { type: "comer", name: "O Coreto", note: "Cataplana tradicional, raciones grandes, ambiente local.", rating: 4.6, phone: "+351281326244", lat: 37.1257795, lng: -7.6492336 },
    { type: "ver", name: "Castelo de Tavira", note: "Jardines dentro de las murallas, vistas al casco antiguo. Entrada libre.", rating: 4.3, lat: 37.1253967, lng: -7.6512641 },
  ],
  olhao: [
    { type: "comer", name: "Taberna D'Olhão", note: "Ostras y marisco muy fresco, reservar si es posible.", rating: 4.8, phone: "+351918579321", lat: 37.0248566, lng: -7.8407983 },
    { type: "comer", name: "Novo Oceano", note: "Pescado a la brasa a muy buen precio, menú completo ~16€.", rating: 4.5, phone: "+351289108682", lat: 37.0308777, lng: -7.8366817 },
  ],
  faro: [
    { type: "comer", name: "Cantinho", note: "Terraza en el casco viejo, pulpo y pescado muy recomendados.", rating: 4.5, phone: "+351911013101", lat: 37.0134529, lng: -7.9332922 },
    { type: "comer", name: "À do Pinto", note: "Cocina portuguesa tradicional, buena carta de vinos.", rating: 4.7, phone: "+351911766000", lat: 37.0161684, lng: -7.9327012 },
    { type: "ver", name: "Arco da Vila", note: "Entrada a la Cidade Velha, con las cigüeñas en lo alto.", rating: 4.4, lat: 37.0146777, lng: -7.9348433 },
    { type: "ver", name: "Catedral de Faro", note: "Subida a la torre, las mejores vistas de la Ria Formosa. ~5€.", rating: 4.4, lat: 37.0133079, lng: -7.9349382 },
  ],
  alvor: [
    { type: "comer", name: "A Lota de Alvor", note: "Pescado fresco elegido en vitrina, algo de gama alta.", rating: 4.6, phone: "+351282458444", lat: 37.1302631, lng: -8.5960454 },
    { type: "comer", name: "Sabores da Esquina", note: "Casero, buena relación calidad-precio, trato muy cercano.", rating: 4.9, phone: "+351961876204", lat: 37.1289657, lng: -8.591571 },
    { type: "ver", name: "Passadiços de Alvor", note: "Paseo de madera por la ría, llano y muy tranquilo.", rating: 4.7, lat: 37.1263906, lng: -8.5960445 },
    { type: "ver", name: "Praia dos Três Irmãos", note: "Playa de acantilados con cuevas y calas pequeñas.", rating: 4.8, lat: 37.1193055, lng: -8.5804099 },
  ],
  lagos: [
    { type: "comer", name: "DON GULL", note: "Cocina de fusión, muy valorado; conviene reservar.", rating: 4.8, phone: "+351910076434", lat: 37.1066037, lng: -8.6784608 },
    { type: "comer", name: "Casa do Prego", note: "Tapas y bocatas de calidad, suele haber cola a partir de las 19h.", rating: 4.6, phone: "+351913505038", lat: 37.0998851, lng: -8.6720907 },
    { type: "ver", name: "Ponta da Piedade", note: "Acantilados y cuevas, imprescindible. Entrada libre.", rating: 4.8, lat: 37.0798758, lng: -8.6685911 },
  ],
};

// ---- Ruta / itinerario ----
const ROUTE = [
  {
    id: "dom",
    dayLabel: "Domingo 13",
    dayShort: "DOM",
    title: "Salida hacia Tavira",
    stops: [
      {
        name: "Salida de Fuengirola",
        time: "22:00 – 23:00",
        note: "Unas 3h de coche hasta Tavira. Contad con parada de gasolina/café por el camino.",
        lat: 36.5421095, lng: -4.6238731,
        poiKey: null,
      },
      {
        name: "Llegada y check-in en Tavira",
        time: "~01:00 – 02:00",
        note: "Residencial Marés. Confirmar con el hotel el check-in tardío (ver pestaña Dormir).",
        lat: 37.125088, lng: -7.646271,
        poiKey: null,
      },
    ],
  },
  {
    id: "lun",
    dayLabel: "Lunes 14",
    dayShort: "LUN",
    title: "Tavira → Olhão → Faro → Alvor",
    stops: [
      {
        name: "Tavira",
        time: "Mañana",
        note: "Parada fija. Paseo tranquilo, castillo y casco antiguo junto al río.",
        lat: 37.1335906, lng: -7.6430019,
        poiKey: "tavira",
      },
      {
        name: "Olhão",
        time: "Mediodía",
        note: "Opcional (20 min de Tavira). Mercado y casco antiguo de casas cúbicas.",
        lat: 37.0273193, lng: -7.839969,
        poiKey: "olhao",
      },
      {
        name: "Faro — Cidade Velha",
        time: "Tarde",
        note: "Recomendado aunque vayáis cortos de tiempo: con 1h se ve bien lo esencial.",
        lat: 37.0164626, lng: -7.9351983,
        poiKey: "faro",
      },
      {
        name: "Traslado a Alvor",
        time: "Atardecer",
        note: "~1h20 desde Faro. Sin prisa, parada libre si os apetece.",
        lat: 37.130505, lng: -8.5935063,
        poiKey: null,
      },
      {
        name: "Check-in en Alvor",
        time: "Noche",
        note: "Alvor House Lagoon. El propio pueblo merece un paseo nocturno por el puerto.",
        lat: 37.1297714, lng: -8.5953272,
        poiKey: "alvor",
      },
    ],
  },
  {
    id: "mar",
    dayLabel: "Martes 15",
    dayShort: "MAR",
    title: "Alvor (y Lagos opcional) → Fuengirola",
    stops: [
      {
        name: "Alvor",
        time: "Mañana",
        note: "Parada fija. Playa o ría, sin necesidad de mover el coche.",
        lat: 37.130505, lng: -8.5935063,
        poiKey: "alvor",
      },
      {
        name: "Lagos",
        time: "Mediodía",
        note: "Opcional, 25 min desde Alvor. Ponta da Piedade es lo más espectacular.",
        lat: 37.1027881, lng: -8.6730275,
        poiKey: "lagos",
      },
      {
        name: "Salida hacia Fuengirola",
        time: "14:00 – 14:30",
        note: "~4h15 de vuelta. Margen de sobra para llegar sobre las 19:00.",
        lat: 37.130505, lng: -8.5935063,
        poiKey: null,
      },
      {
        name: "Llegada a Fuengirola",
        time: "~19:00",
        note: "Fin del viaje.",
        lat: 36.5421095, lng: -4.6238731,
        poiKey: null,
      },
    ],
  },
];

// ---- Alojamiento: hoteles ----
const HOTELS = [
  {
    name: "Residencial Marés",
    location: "Tavira",
    dates: "13 → 14 septiembre",
    price: "65 €/noche",
    phone: "+351968446108",
    lat: 37.125088, lng: -7.646271,
    note: "Llamar para confirmar check-in de madrugada (llegada prevista ~01:00–02:00).",
  },
  {
    name: "Alvor House Lagoon",
    location: "Alvor",
    dates: "14 → 15 septiembre",
    price: "—",
    phone: "+351282045138",
    lat: 37.1297714, lng: -8.5953272,
    note: "Confirmar hora de check-in tras la ruta del lunes.",
  },
];

// ---- Alojamiento: furgonetas camper (Milanuncios) ----
const VANS = [
  {
    name: "Camper Van – Mc Louis Glamys Menfyx 3",
    price: "100 €",
    priceNote: "Málaga",
    location: "Málaga",
    contact: "Marta",
    phone: "635935747",
    description: "Alquiler de camper para 4 personas, diésel. Precio desde 100 € según temporada; conviene confirmar disponibilidad y si el precio es por día o por el total del viaje.",
    image: "https://images.milanuncios.com/api/v1/ma-ad-media-pro/images/004416a2-3ac8-44ae-8fda-b695e9bbb6a1?rule=detail_640x480",
    url: "https://www.milanuncios.com/furgonetas-de-segunda-mano/camper-van-mc-louis-glamys-menfyx-3-603912170.htm",
  },
  {
    name: "Alquiler furgonetas camper",
    price: "Consultar",
    priceNote: "Benalmádena",
    location: "Benalmádena",
    contact: "Carlos",
    phone: "611198122",
    description: "Camper recién estrenada: portabicicletas, placas solares, toldo, mesa y sillas exteriores, nevera grande, baño completo con ducha y WC fijo, calefacción, agua caliente. Homologada para 4. Precio según días y temporada — mejor preguntar por teléfono o WhatsApp.",
    image: "https://images.milanuncios.com/api/v1/ma-ad-media-pro/images/45abd6f8-6cf6-4680-b29f-e773b5f21520?rule=detail_640x480",
    url: "https://www.milanuncios.com/servicios-para-motor/alquiler-furgonetas-camper-387720914.htm",
  },
  {
    name: "Alquiler furgoneta camperizada",
    price: "70–80 €/día",
    priceNote: "Utrera, Sevilla",
    location: "Utrera (Sevilla)",
    contact: "AutoCamperSevilla",
    phone: "647424210",
    description: "Cama de 150×190 con colchón viscoelástico, nevera 12V, ducha y fregadero (40L), mosquiteras, menaje completo + gas, 3 sillas y mesa. Recogida en Utrera, bien comunicada con AVE. Desde 70 €/día para 7+ días, mínimo 3 días a 80 €/día. Fianza 500 €. Ojo: el mínimo de 3 días no encaja del todo con un viaje de 2 noches — merece la pena preguntar si hacen excepciones.",
    image: "https://images.milanuncios.com/api/v1/ma-ad-media-pro/images/639a5064-774e-4cc2-84ec-857f6f35c668?rule=detail_640x480",
    url: "https://www.milanuncios.com/alquiler-de-negocio/alquiler-furgoneta-camperizada-594067734.htm",
  },
];

// ---- Checklist ----
const CHECKLIST_ITEMS = [
  { id: "call-mares", text: "Llamar a Residencial Marés para avisar del check-in de madrugada" },
  { id: "call-alvor", text: "Llamar a Alvor House Lagoon para confirmar hora de check-in del lunes" },
  { id: "decide-alojamiento", text: "Decidir entre hoteles ya reservados o furgoneta camper" },
  { id: "call-van1", text: "Si furgoneta: llamar a Marta (Málaga) — confirmar precio por día/total" },
  { id: "call-van2", text: "Si furgoneta: llamar a Carlos (Benalmádena) — pedir precio para 2 noches" },
  { id: "call-van3", text: "Si furgoneta: llamar a AutoCamperSevilla — preguntar por excepción al mínimo de 3 días" },
  { id: "gasolina", text: "Revisar depósito / ruta con paradas de gasolina para el tramo nocturno" },
  { id: "reservas-restaurantes", text: "Reservar mesa en los restaurantes con más nota (DON GULL, Taberna D'Olhão, Borda D'Água)" },
];
