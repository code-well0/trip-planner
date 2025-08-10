const data = [
  {
    id: 1,
    name: "Agra",
    region: "North",
    emoji: "🕌",
    moodTags: ["Relaxing", "Spiritual"],
    purposeTags: ["Family outing", "Weekend escape"],
    info: "Agra is a city in northern India, known for the iconic Taj Mahal.",
    longDescription:
      "Agra, home to the Taj Mahal, stands as a symbol of India's rich history. Famous for its Mughal architecture, it offers attractions like the Agra Fort and Fatehpur Sikri. The bustling streets are filled with local handicrafts, marble work, and delicious Mughlai food.",
    image: "https://cdn.thecodehelp.in/Agra.jpeg",
    gallery: [
      "https://cdn.thecodehelp.in/Agra.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4f/Agra_Fort_Inside_View.jpg"
    ],
    highlights: [
      "Taj Mahal – UNESCO World Heritage Site",
      "Agra Fort",
      "Local handicraft markets"
    ],
    price: "35,758",
  },
  {
    id: 2,
    name: "Jaipur",
    region: "North",
    emoji: "🏰",
    moodTags: ["Cultural", "Relaxing"],
    purposeTags: ["Family outing", "Weekend escape"],
    info: "Jaipur is the capital city of Rajasthan, known as the Pink City.",
    longDescription:
      "Jaipur boasts majestic palaces, vibrant bazaars, and rich traditions. Landmarks like Hawa Mahal, Amber Fort, and City Palace make it a favorite among travelers. It's also famous for gemstone jewelry, handicrafts, and colorful festivals.",
    image: "https://cdn.thecodehelp.in/Jaipur.jpeg",
    gallery: [
      "https://cdn.thecodehelp.in/Jaipur.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4b/Amber_Fort_Jaipur.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Hawa_Mahal_2011.jpg"
    ],
    highlights: [
      "Hawa Mahal",
      "Amber Fort",
      "Rajasthani cuisine"
    ],
    price: "82,560",
  },
  {
    id: 3,
    name: "Goa",
    region: "West",
    emoji: "🏖️",
    moodTags: ["Party", "Relaxing"],
    purposeTags: ["Weekend escape", "Solo detox"],
    info: "Goa is a small state on India's western coast, famous for its beaches.",
    longDescription:
      "Goa offers a perfect mix of sun, sand, and vibrant nightlife. From Portuguese heritage sites to shacks on Baga Beach, it’s a paradise for party lovers and peace seekers alike. Visitors also enjoy water sports, flea markets, and seafood delicacies.",
    image: "https://cdn.thecodehelp.in/Goa.jpeg",
    gallery: [
      "https://cdn.thecodehelp.in/Goa.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Baga_Beach_Goa.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d2/Se_Cathedral_Goa.jpg"
    ],
    highlights: [
      "Baga and Anjuna beaches",
      "Nightlife and shacks",
      "Portuguese heritage"
    ],
    price: "29,695",
  },
  {
    id: 4,
    name: "Varanasi",
    region: "North",
    emoji: "🕉️",
    moodTags: ["Spiritual", "Cultural"],
    purposeTags: ["Solo detox", "Spiritual journey"],
    info: "Varanasi is a holy city in northern India, on the banks of the Ganges.",
    longDescription:
      "Varanasi is one of the world's oldest living cities. Known for its ghats, temples, and rituals, it's a hub for spiritual seekers. Sunrise boat rides and evening Ganga Aarti are unforgettable experiences.",
    image: "https://cdn.thecodehelp.in/Varanasi.jpeg",
    gallery: [
      "https://cdn.thecodehelp.in/Varanasi.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/0/0f/Varanasi_Ghat.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/48/Kashi_Vishwanath_Temple.jpg"
    ],
    highlights: [
      "Ganga Aarti",
      "Kashi Vishwanath Temple",
      "Ghats of the Ganges"
    ],
    price: "31,095",
  },
  {
    id: 5,
    name: "Darjeeling",
    region: "East",
    emoji: "🏞️",
    moodTags: ["Relaxing", "Nature"],
    purposeTags: ["Nature walk", "Weekend escape"],
    info: "Darjeeling is a beautiful hill station in West Bengal.",
    longDescription:
      "Darjeeling, known as the 'Queen of Hills', offers panoramic views of the Himalayas and tea gardens. Visitors can ride the UNESCO-listed toy train, explore monasteries, and enjoy serene walks.",
    image: "https://cdn.thecodehelp.in/Darjeeling.jpeg",
    gallery: [
      "https://cdn.thecodehelp.in/Darjeeling.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/Darjeeling_Toy_Train.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/Tiger_Hill_Darjeeling.jpg"
    ],
    highlights: [
      "Darjeeling Himalayan Railway",
      "Tiger Hill sunrise",
      "Tea plantations"
    ],
    price: "78,595",
  },
  {
    id: 6,
    name: "Jaisalmer",
    region: "North",
    emoji: "🏜️",
    moodTags: ["Adventurous", "Cultural"],
    purposeTags: ["Nature walk", "Family outing"],
    info: "Jaisalmer is known for its golden sandstone architecture.",
    longDescription:
      "Known as the 'Golden City', Jaisalmer enchants visitors with its fort, desert safaris, and havelis. Camel rides in the Thar Desert offer unforgettable sunsets.",
    image: "https://cdn.thecodehelp.in/Jaisalmer.jpeg",
    gallery: [
      "https://cdn.thecodehelp.in/Jaisalmer.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/2/25/Jaisalmer_Fort.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e0/Sunset_Thar_Desert.jpg"
    ],
    highlights: [
      "Jaisalmer Fort",
      "Thar Desert safari",
      "Patwon Ki Haveli"
    ],
    price: "68,595",
  },
  {
    id: 7,
    name: "Udaipur",
    region: "North",
    emoji: "🏞️",
    moodTags: ["Romantic", "Relaxing"],
    purposeTags: ["Family outing", "Weekend escape"],
    info: "Udaipur is known as the City of Lakes.",
    longDescription:
      "Udaipur, with its shimmering lakes and palaces, is one of the most romantic cities in India. Popular spots include City Palace, Lake Pichola, and Jag Mandir.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Udaipur_5.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/c/c0/Udaipur_5.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/5b/City_Palace_Udaipur.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/Lake_Pichola_Udaipur.jpg"
    ],
    highlights: [
      "Lake Pichola boat ride",
      "City Palace",
      "Jag Mandir"
    ],
    price: "22,000",
  },
  {
    id: 8,
    name: "Rishikesh",
    region: "North",
    emoji: "🧘",
    moodTags: ["Spiritual", "Adventurous"],
    purposeTags: ["Solo detox", "Spiritual journey"],
    info: "Rishikesh is the Yoga capital of the world.",
    longDescription:
      "Rishikesh is famous for yoga, meditation, and adventure sports like rafting. Surrounded by hills and the Ganges, it attracts both peace seekers and thrill lovers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Rishikesh_India_%28183707211%29.jpeg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/Rishikesh_India_%28183707211%29.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/0/0f/Lakshman_Jhula_Rishikesh.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/White_Water_Rafting_Rishikesh.jpg"
    ],
    highlights: [
      "Yoga and meditation centers",
      "River rafting",
      "Lakshman Jhula"
    ],
    price: "10,000",
  },
  {
    id: 9,
    name: "Khajuraho",
    region: "North",
    emoji: "🛕",
    moodTags: ["Cultural", "Romantic"],
    purposeTags: ["Spiritual journey", "Couple trip"],
    info: "Famous for its UNESCO-listed group of temples.",
    longDescription:
      "Khajuraho is renowned for its intricate temple carvings and UNESCO heritage status. The sculptures depict various aspects of life, spirituality, and love.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Khajuraho_Dulhadeo_2010.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Khajuraho_Dulhadeo_2010.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/Kandariya_Mahadeva_Temple.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Khajuraho_Temples.jpg"
    ],
    highlights: [
      "Kandariya Mahadeva Temple",
      "UNESCO heritage site",
      "Intricate sculptures"
    ],
    price: "16,500",
  },
  {
    id: 10,
    name: "Munnar",
    region: "South",
    emoji: "🍃",
    moodTags: ["Relaxing", "Nature"],
    purposeTags: ["Nature walk", "Solo detox"],
    info: "A beautiful hill station in Kerala.",
    longDescription:
      "Munnar is a paradise of rolling tea plantations, misty hills, and wildlife sanctuaries. It's ideal for nature walks, trekking, and scenic drives.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Munnar_-_View_from_Grand_Plaza_Hotel.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Munnar_-_View_from_Grand_Plaza_Hotel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Munnar_Tea_Gardens.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Munnar_Mist_Morning.jpg"
    ],
    highlights: [
      "Tea plantations",
      "Eravikulam National Park",
      "Scenic viewpoints"
    ],
    price: "18,500",
  }
];

export default data;