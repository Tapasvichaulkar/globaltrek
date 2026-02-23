// Comprehensive guides data organized by categories
const guidesData = [
  // 🏖️ BEACHES - GOA
  {
    id: 1,
    name: "Rohan D'Souza",
    place: "Goa - Baga Beach",
    category: "Beaches",
    price: 1800,
    about: "Water sports expert and nightlife guide. Knows all the best beach shacks and party spots in North Goa.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713359/boy1_j6g8bi.avif",
    rating: 4.8,
    languages: ["English", "Hindi", "Konkani"],
    experience: "8 years"
  },
  {
    id: 2,
    name: "Maria Fernandes",
    place: "Goa - Calangute Beach",
    category: "Beaches",
    price: 1600,
    about: "Family-friendly beach guide specializing in dolphin watching and safe swimming spots for kids.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713360/girl2_uyja0t.webp",
    rating: 4.9,
    languages: ["English", "Hindi", "Portuguese"],
    experience: "6 years"
  },
  {
    id: 3,
    name: "Alex Pereira",
    place: "Goa - Anjuna Beach",
    category: "Beaches",
    price: 2000,
    about: "Hippie market expert and beach party organizer. Perfect for experiencing Goa's bohemian culture.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713359/boy2_zh1vd8.jpg",
    rating: 4.7,
    languages: ["English", "Russian", "Hindi"],
    experience: "10 years"
  },
  {
    id: 4,
    name: "Sanjay Naik",
    place: "Goa - South Goa Beaches",
    category: "Beaches",
    price: 1900,
    about: "Peaceful beach retreat specialist. Knows hidden gems in Palolem, Agonda, and Butterfly Beach.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713357/boy3_uyiwsc.jpg",
    rating: 4.8,
    languages: ["English", "Hindi", "Marathi"],
    experience: "7 years"
  },

  // 🏖️ BEACHES - KERALA
  {
    id: 5,
    name: "Arun Krishna",
    place: "Kerala - Varkala Beach",
    category: "Beaches",
    price: 1700,
    about: "Cliff beach expert with knowledge of Ayurveda centers and yoga retreats near Varkala.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713357/boy4_k0neht.webp",
    rating: 4.9,
    languages: ["English", "Hindi", "Malayalam"],
    experience: "9 years"
  },
  {
    id: 6,
    name: "Deepa Nair",
    place: "Kerala - Kovalam Beach",
    category: "Beaches",
    price: 1650,
    about: "Lighthouse beach specialist. Offers sunrise/sunset tours and traditional Kerala cuisine recommendations.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713360/girl3_pwneh0.avif",
    rating: 4.7,
    languages: ["English", "Malayalam", "Tamil"],
    experience: "5 years"
  },
  {
    id: 7,
    name: "Suresh Kumar",
    place: "Kerala - Marari Beach",
    category: "Beaches",
    price: 1800,
    about: "Village life and fishing culture expert. Perfect for authentic Kerala coastal experience.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713356/bpy5_frqxz2.webp",
    rating: 4.8,
    languages: ["English", "Malayalam", "Hindi"],
    experience: "11 years"
  },

  // 🏖️ BEACHES - TAMIL NADU
  {
    id: 8,
    name: "Karthik Raman",
    place: "Tamil Nadu - Marina Beach",
    category: "Beaches",
    price: 1400,
    about: "Chennai's iconic beach expert. Knows best street food spots and morning walk routes.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.6,
    languages: ["English", "Tamil", "Hindi"],
    experience: "4 years"
  },
  {
    id: 9,
    name: "Priya Selvam",
    place: "Tamil Nadu - Mahabalipuram",
    category: "Beaches",
    price: 1850,
    about: "Beach and heritage combo specialist. Combines shore temple visits with beach activities.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713363/girl1_hg28vq.avif",
    rating: 4.9,
    languages: ["English", "Tamil", "French"],
    experience: "8 years"
  },
  {
    id: 10,
    name: "Anand Kumar",
    place: "Tamil Nadu - Pondicherry Beach",
    category: "Beaches",
    price: 1750,
    about: "French quarter and beach promenade expert. Perfect for photography and French cuisine tours.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713354/boy6_vbch9i.webp",
    rating: 4.7,
    languages: ["English", "Tamil", "French"],
    experience: "6 years"
  },

  // 🏖️ BEACHES - MAHARASHTRA
  {
    id: 11,
    name: "Rahul Patil",
    place: "Maharashtra - Alibaug",
    category: "Beaches",
    price: 2200,
    about: "Weekend getaway specialist from Mumbai. Knows best beach resorts and water sports activities.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713354/boy8_dp3fve.jpg",
    rating: 4.8,
    languages: ["English", "Hindi", "Marathi"],
    experience: "7 years"
  },
  {
    id: 12,
    name: "Sneha Deshmukh",
    place: "Maharashtra - Ganpatipule",
    category: "Beaches",
    price: 1950,
    about: "Temple beach specialist. Combines Swayambhu Ganpati temple visit with pristine beach experience.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713359/girl4_h1fqph.jpg",
    rating: 4.9,
    languages: ["English", "Marathi", "Hindi"],
    experience: "5 years"
  },

  // 🏖️ BEACHES - KARNATAKA
  {
    id: 13,
    name: "Vishwas Rao",
    place: "Karnataka - Gokarna",
    category: "Beaches",
    price: 1850,
    about: "Hippie beach and temple town expert. Knows secret Om Beach caves and cliff diving spots.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713354/boy7_ypa8f5.jpg",
    rating: 4.8,
    languages: ["English", "Kannada", "Hindi"],
    experience: "9 years"
  },
  {
    id: 14,
    name: "Lakshmi Hegde",
    place: "Karnataka - Malpe Beach",
    category: "Beaches",
    price: 1600,
    about: "St. Mary's Island tour specialist. Organizes boat trips and seafood restaurant tours.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713347/girl7_aamg2w.webp",
    rating: 4.7,
    languages: ["English", "Kannada", "Tulu"],
    experience: "6 years"
  },

  // 🏖️ BEACHES - ANDAMAN
  {
    id: 15,
    name: "Rajesh Sharma",
    place: "Andaman - Radhanagar Beach",
    category: "Beaches",
    price: 3500,
    about: "Asia's best beach expert. Scuba diving certified guide with knowledge of coral reefs.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713353/boy9_dqcpfm.avif",
    rating: 5.0,
    languages: ["English", "Hindi", "Bengali"],
    experience: "12 years"
  },
  {
    id: 16,
    name: "Maya Joseph",
    place: "Andaman - Havelock Island",
    category: "Beaches",
    price: 3800,
    about: "Marine life specialist. Certified diver offering underwater photography tours.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713348/girl6_ie0wl5.jpg",
    rating: 4.9,
    languages: ["English", "Hindi", "Tamil"],
    experience: "10 years"
  },

  // 🏔️ MOUNTAINS - HIMACHAL PRADESH
  {
    id: 17,
    name: "Vikram Singh",
    place: "Himachal - Shimla",
    category: "Mountains",
    price: 2200,
    about: "Colonial architecture and Mall Road expert. Perfect for heritage walks and toy train experiences.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713351/boy13_j4rus3.jpg",
    rating: 4.8,
    languages: ["English", "Hindi", "Punjabi"],
    experience: "10 years"
  },
  {
    id: 18,
    name: "Neha Thakur",
    place: "Himachal - Manali",
    category: "Mountains",
    price: 2400,
    about: "Adventure sports specialist. Paragliding, river rafting, and Solang Valley expert.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713347/girl8_rj8r66.jpg",
    rating: 4.9,
    languages: ["English", "Hindi", "Pahari"],
    experience: "8 years"
  },
  {
    id: 19,
    name: "Amit Chauhan",
    place: "Himachal - Dharamshala",
    category: "Mountains",
    price: 2100,
    about: "Tibetan culture and Buddhism expert. Knows all monasteries and Dalai Lama temple protocols.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713348/boy20_djtotx.jpg",
    rating: 4.8,
    languages: ["English", "Hindi", "Tibetan"],
    experience: "7 years"
  },
  {
    id: 20,
    name: "Pooja Verma",
    place: "Himachal - Kasol",
    category: "Mountains",
    price: 1900,
    about: "Trekking and camping specialist. Kheerganga and Tosh village expert for backpackers.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713347/girl5_mim9fd.webp",
    rating: 4.7,
    languages: ["English", "Hindi", "Hebrew"],
    experience: "6 years"
  },

  // 🏔️ MOUNTAINS - UTTARAKHAND
  {
    id: 21,
    name: "Harish Rawat",
    place: "Uttarakhand - Nainital",
    category: "Mountains",
    price: 2000,
    about: "Lake district expert with boating and nature walk specialization. Snow View point guide.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713353/boy10_khhykq.jpg",
    rating: 4.8,
    languages: ["English", "Hindi", "Kumaoni"],
    experience: "11 years"
  },
  {
    id: 22,
    name: "Anjali Bisht",
    place: "Uttarakhand - Mussoorie",
    category: "Mountains",
    price: 2100,
    about: "Queen of Hills specialist. Kempty Falls and Gun Hill cable car expert with photography skills.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    languages: ["English", "Hindi", "Garhwali"],
    experience: "9 years"
  },
  {
    id: 23,
    name: "Ramesh Negi",
    place: "Uttarakhand - Auli",
    category: "Mountains",
    price: 2800,
    about: "Skiing instructor and winter sports expert. Knows best slopes for beginners and pros.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713351/boy11_leigpz.jpg",
    rating: 4.9,
    languages: ["English", "Hindi", "Garhwali"],
    experience: "15 years"
  },

  // 🏔️ MOUNTAINS - KASHMIR
  {
    id: 24,
    name: "Aamir Khan",
    place: "Kashmir - Gulmarg",
    category: "Mountains",
    price: 3200,
    about: "Gondola and skiing specialist. Knows best photography spots and authentic Kashmiri cuisine.",
    image: "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770713347/boy22_jpxsml.jpg",
    rating: 5.0,
    languages: ["English", "Hindi", "Kashmiri", "Urdu"],
    experience: "14 years"
  },
  {
    id: 25,
    name: "Fatima Begum",
    place: "Kashmir - Pahalgam",
    category: "Mountains",
    price: 3000,
    about: "Betaab Valley and Aru Valley expert. Organizes pony rides and riverside camping.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4.9,
    languages: ["English", "Urdu", "Kashmiri"],
    experience: "8 years"
  },
  {
    id: 26,
    name: "Zahid Malik",
    place: "Kashmir - Srinagar",
    category: "Mountains",
    price: 2900,
    about: "Dal Lake shikara and houseboat specialist. Mughal gardens and local crafts expert.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4.8,
    languages: ["English", "Hindi", "Kashmiri", "Urdu"],
    experience: "12 years"
  },

  // 🏔️ MOUNTAINS - DARJEELING
  {
    id: 27,
    name: "Dorjee Sherpa",
    place: "West Bengal - Darjeeling",
    category: "Mountains",
    price: 2300,
    about: "Tea garden and toy train specialist. Tiger Hill sunrise expert with Kanchenjunga views.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 4.9,
    languages: ["English", "Hindi", "Nepali", "Bengali"],
    experience: "13 years"
  },
  {
    id: 28,
    name: "Lhamo Tamang",
    place: "West Bengal - Kalimpong",
    category: "Mountains",
    price: 2100,
    about: "Monastery and orchid sanctuary expert. Knows authentic Tibetan restaurants and viewpoints.",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 4.8,
    languages: ["English", "Hindi", "Nepali"],
    experience: "7 years"
  },

  // 🏔️ MOUNTAINS - SIKKIM
  {
    id: 29,
    name: "Tashi Bhutia",
    place: "Sikkim - Gangtok",
    category: "Mountains",
    price: 2600,
    about: "MG Marg and Tsomgo Lake specialist. Knows permit procedures for Nathula Pass visits.",
    image: "https://randomuser.me/api/portraits/men/71.jpg",
    rating: 4.9,
    languages: ["English", "Hindi", "Nepali", "Sikkimese"],
    experience: "10 years"
  },
  {
    id: 30,
    name: "Pemba Lepcha",
    place: "Sikkim - Pelling",
    category: "Mountains",
    price: 2500,
    about: "Kanchenjunga sunrise viewpoint expert. Pemayangtse monastery and waterfall specialist.",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
    rating: 4.8,
    languages: ["English", "Hindi", "Nepali"],
    experience: "9 years"
  },

  // 🏔️ MOUNTAINS - KERALA
  {
    id: 31,
    name: "Babu Thomas",
    place: "Kerala - Munnar",
    category: "Mountains",
    price: 2200,
    about: "Tea plantation and spice garden expert. Knows best trekking routes and wildlife spotting areas.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4.9,
    languages: ["English", "Malayalam", "Tamil"],
    experience: "11 years"
  },
  {
    id: 32,
    name: "Geetha Menon",
    place: "Kerala - Wayanad",
    category: "Mountains",
    price: 2100,
    about: "Wildlife sanctuary and tribal culture specialist. Organizes jungle safaris and zip-lining.",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
    rating: 4.8,
    languages: ["English", "Malayalam", "Hindi"],
    experience: "8 years"
  },

  // 🏔️ MOUNTAINS - COORG
  {
    id: 33,
    name: "Prasad Gowda",
    place: "Karnataka - Coorg",
    category: "Mountains",
    price: 2000,
    about: "Coffee plantation and Abbey Falls expert. Knows Kodava culture and authentic homestays.",
    image: "https://randomuser.me/api/portraits/men/48.jpg",
    rating: 4.8,
    languages: ["English", "Kannada", "Kodava"],
    experience: "10 years"
  },
  {
    id: 34,
    name: "Sowmya Rao",
    place: "Karnataka - Madikeri",
    category: "Mountains",
    price: 1950,
    about: "Raja's Seat and Dubare Elephant Camp specialist. Bird watching and nature walk expert.",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
    rating: 4.7,
    languages: ["English", "Kannada", "Hindi"],
    experience: "6 years"
  },

  // 🏔️ MOUNTAINS - OOTY
  {
    id: 35,
    name: "Murali Krishna",
    place: "Tamil Nadu - Ooty",
    category: "Mountains",
    price: 2100,
    about: "Nilgiri Mountain Railway and botanical garden expert. Knows best view points and tea factories.",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 4.8,
    languages: ["English", "Tamil", "Malayalam"],
    experience: "12 years"
  },
  {
    id: 36,
    name: "Divya Rao",
    place: "Tamil Nadu - Kodaikanal",
    category: "Mountains",
    price: 2000,
    about: "Lake and waterfall specialist. Coaker's Walk and Pine Forest expert for romantic getaways.",
    image: "https://randomuser.me/api/portraits/women/54.jpg",
    rating: 4.9,
    languages: ["English", "Tamil", "Hindi"],
    experience: "7 years"
  },

  // 🛕 TEMPLES - TIRUPATI
  {
    id: 37,
    name: "Venkatesh Iyer",
    place: "Andhra Pradesh - Tirupati Balaji",
    category: "Temples",
    price: 2500,
    about: "Tirumala darshan specialist. Knows VIP darshan procedures and accommodation booking secrets.",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    rating: 4.9,
    languages: ["English", "Telugu", "Tamil", "Hindi"],
    experience: "15 years"
  },
  {
    id: 38,
    name: "Lakshmi Devi",
    place: "Andhra Pradesh - Tirupati",
    category: "Temples",
    price: 2300,
    about: "Temple rituals and prasadam expert. Organizes efficient darshan with minimal wait times.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.8,
    languages: ["Telugu", "Tamil", "Hindi"],
    experience: "10 years"
  },

  // 🛕 TEMPLES - VARANASI
  {
    id: 39,
    name: "Pandit Ramesh Shukla",
    place: "Uttar Pradesh - Kashi Vishwanath",
    category: "Temples",
    price: 2200,
    about: "Ancient temples and ghats expert. Performs authentic Ganga Aarti and puja rituals.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5.0,
    languages: ["Hindi", "English", "Sanskrit"],
    experience: "20 years"
  },
  {
    id: 40,
    name: "Meera Tripathi",
    place: "Uttar Pradesh - Varanasi Ghats",
    category: "Temples",
    price: 2000,
    about: "Boat ride and sunrise ceremony specialist. Knows stories behind 84 ghats of Varanasi.",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    rating: 4.9,
    languages: ["Hindi", "English", "Bhojpuri"],
    experience: "12 years"
  },
  {
    id: 41,
    name: "Aditya Pandey",
    place: "Uttar Pradesh - Sarnath",
    category: "Temples",
    price: 1900,
    about: "Buddhist heritage and Dhamek Stupa expert. Connects Varanasi Hindu-Buddhist history.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 4.8,
    languages: ["Hindi", "English", "Japanese"],
    experience: "8 years"
  },

  // 🛕 TEMPLES - UTTARAKHAND (CHAR DHAM)
  {
    id: 42,
    name: "Swami Prakash",
    place: "Uttarakhand - Kedarnath",
    category: "Temples",
    price: 3500,
    about: "High altitude temple trekking specialist. Knows weather patterns and safety protocols.",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    rating: 4.9,
    languages: ["Hindi", "English", "Garhwali"],
    experience: "18 years"
  },
  {
    id: 43,
    name: "Raghav Joshi",
    place: "Uttarakhand - Badrinath",
    category: "Temples",
    price: 3400,
    about: "Char Dham yatra expert. Manages complete pilgrimage with accommodation and puja arrangements.",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    rating: 4.8,
    languages: ["Hindi", "English", "Sanskrit"],
    experience: "16 years"
  },

  // 🛕 TEMPLES - GUJARAT
  {
    id: 44,
    name: "Kalpesh Shah",
    place: "Gujarat - Somnath Temple",
    category: "Temples",
    price: 1800,
    about: "Jyotirlinga and coastal temple specialist. Knows the history of temple destruction and rebuilding.",
    image: "https://randomuser.me/api/portraits/men/63.jpg",
    rating: 4.9,
    languages: ["Gujarati", "Hindi", "English"],
    experience: "11 years"
  },
  {
    id: 45,
    name: "Nita Patel",
    place: "Gujarat - Dwarkadhish Temple",
    category: "Temples",
    price: 1900,
    about: "Krishna temple and Bet Dwarka expert. Organizes boat trips to submerged city ruins.",
    image: "https://randomuser.me/api/portraits/women/51.jpg",
    rating: 4.8,
    languages: ["Gujarati", "Hindi", "English"],
    experience: "9 years"
  },

  // 🛕 TEMPLES - TAMIL NADU
  {
    id: 46,
    name: "Sundaram Pillai",
    place: "Tamil Nadu - Meenakshi Temple",
    category: "Temples",
    price: 2100,
    about: "Dravidian architecture and temple sculpture expert. Explains gopuram carvings in detail.",
    image: "https://randomuser.me/api/portraits/men/69.jpg",
    rating: 5.0,
    languages: ["Tamil", "English", "Hindi"],
    experience: "22 years"
  },
  {
    id: 47,
    name: "Kavitha Subramanian",
    place: "Tamil Nadu - Madurai",
    category: "Temples",
    price: 2000,
    about: "Temple city specialist with focus on evening Aarti and local street food tours.",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    rating: 4.9,
    languages: ["Tamil", "English", "Malayalam"],
    experience: "10 years"
  },

  // 🛕 TEMPLES - ODISHA
  {
    id: 48,
    name: "Bibhuti Das",
    place: "Odisha - Jagannath Temple",
    category: "Temples",
    price: 2200,
    about: "Puri Rath Yatra and Mahaprasad specialist. Expert in temple rituals and Odissi culture.",
    image: "https://randomuser.me/api/portraits/men/73.jpg",
    rating: 4.9,
    languages: ["Odia", "Hindi", "English"],
    experience: "14 years"
  },
  {
    id: 49,
    name: "Sarita Mohanty",
    place: "Odisha - Konark Sun Temple",
    category: "Temples",
    price: 2000,
    about: "Archaeological marvel expert. Explains temple astronomy and erotic sculptures sensitively.",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    rating: 4.8,
    languages: ["Odia", "English", "Hindi"],
    experience: "9 years"
  },

  // 🛕 TEMPLES - PUNJAB
  {
    id: 50,
    name: "Gurmeet Singh",
    place: "Punjab - Golden Temple",
    category: "Temples",
    price: 2100,
    about: "Sikh history and langar service expert. Provides insights into community kitchen operations.",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    rating: 5.0,
    languages: ["Punjabi", "Hindi", "English"],
    experience: "13 years"
  },
  {
    id: 51,
    name: "Jasleen Kaur",
    place: "Punjab - Amritsar",
    category: "Temples",
    price: 1900,
    about: "Golden Temple and Jallianwala Bagh specialist. Wagah border ceremony organizer.",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    rating: 4.9,
    languages: ["Punjabi", "Hindi", "English"],
    experience: "8 years"
  },

  // 🛕 TEMPLES - AYODHYA
  {
    id: 52,
    name: "Ravi Shankar Mishra",
    place: "Uttar Pradesh - Ram Mandir",
    category: "Temples",
    price: 2400,
    about: "Newly built temple complex specialist. Expert in Ramayana stories and pilgrimage circuit.",
    image: "https://randomuser.me/api/portraits/men/59.jpg",
    rating: 4.8,
    languages: ["Hindi", "English", "Awadhi"],
    experience: "15 years"
  },
  {
    id: 53,
    name: "Sita Devi",
    place: "Uttar Pradesh - Ayodhya",
    category: "Temples",
    price: 2200,
    about: "Ancient temples and Saryu river Aarti specialist. Connects mythology with history.",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    rating: 4.9,
    languages: ["Hindi", "Awadhi", "English"],
    experience: "11 years"
  },

  // 🏰 FORTS - DELHI
  {
    id: 54,
    name: "Akbar Khan",
    place: "Delhi - Red Fort",
    category: "Forts",
    price: 1800,
    about: "Mughal architecture and sound & light show expert. Narrates Red Fort's independence history.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 4.8,
    languages: ["Hindi", "English", "Urdu"],
    experience: "12 years"
  },
  {
    id: 55,
    name: "Priyanka Sharma",
    place: "Delhi - Qutub Minar",
    category: "Forts",
    price: 1700,
    about: "Indo-Islamic architecture specialist. Explains iron pillar mystery and inscriptions.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 4.9,
    languages: ["Hindi", "English", "Punjabi"],
    experience: "8 years"
  },

  // 🏰 FORTS - RAJASTHAN (JAIPUR)
  {
    id: 56,
    name: "Rajendra Singh Rathore",
    place: "Rajasthan - Amber Fort",
    category: "Forts",
    price: 2300,
    about: "Royal Rajput heritage expert. Organizes elephant rides and Sheesh Mahal photography tours.",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    rating: 4.9,
    languages: ["Hindi", "English", "Rajasthani"],
    experience: "16 years"
  },
  {
    id: 57,
    name: "Padmini Kumari",
    place: "Rajasthan - Jaipur City Palace",
    category: "Forts",
    price: 2200,
    about: "Pink City and royal lifestyle specialist. Knows secret passages and puppet show venues.",
    image: "https://randomuser.me/api/portraits/women/62.jpg",
    rating: 4.8,
    languages: ["Hindi", "English", "Marwari"],
    experience: "10 years"
  },

  // 🏰 FORTS - RAJASTHAN (JODHPUR)
  {
    id: 58,
    name: "Bhavani Singh",
    place: "Rajasthan - Mehrangarh Fort",
    category: "Forts",
    price: 2400,
    about: "Blue City and fort museum expert. Photography specialist with zip-lining arrangements.",
    image: "https://randomuser.me/api/portraits/men/70.jpg",
    rating: 5.0,
    languages: ["Hindi", "English", "Marwari"],
    experience: "14 years"
  },
  {
    id: 59,
    name: "Madhavi Rathore",
    place: "Rajasthan - Jodhpur",
    category: "Forts",
    price: 2200,
    about: "Clock tower and old city bazaar specialist. Combines fort visit with shopping tours.",
    image: "https://randomuser.me/api/portraits/women/49.jpg",
    rating: 4.8,
    languages: ["Hindi", "English", "Rajasthani"],
    experience: "9 years"
  },

  // 🏰 FORTS - RAJASTHAN (JAISALMER)
  {
    id: 60,
    name: "Girdhari Lal",
    place: "Rajasthan - Jaisalmer Fort",
    category: "Forts",
    price: 2600,
    about: "Living fort and desert safari specialist. Organizes camel rides and folk music evenings.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 4.9,
    languages: ["Hindi", "English", "Marwari"],
    experience: "18 years"
  },
  {
    id: 61,
    name: "Rukmini Devi",
    place: "Rajasthan - Jaisalmer Dunes",
    category: "Forts",
    price: 2500,
    about: "Sam sand dunes and desert camping expert. Knows authentic Rajasthani cuisine spots.",
    image: "https://randomuser.me/api/portraits/women/61.jpg",
    rating: 4.8,
    languages: ["Hindi", "English", "Rajasthani"],
    experience: "11 years"
  },

  // 🏰 FORTS - RAJASTHAN (CHITTORGARH)
  {
    id: 62,
    name: "Maharana Pratap Singh",
    place: "Rajasthan - Chittorgarh Fort",
    category: "Forts",
    price: 2300,
    about: "Rani Padmini and Jauhar history expert. Knows every tower and palace inside massive fort.",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 4.9,
    languages: ["Hindi", "English", "Mewari"],
    experience: "15 years"
  },
  {
    id: 63,
    name: "Kirti Singh",
    place: "Rajasthan - Chittorgarh",
    category: "Forts",
    price: 2100,
    about: "Victory tower and sacrifice stories specialist. Dramatic storytelling of Rajput bravery.",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    rating: 4.8,
    languages: ["Hindi", "English", "Rajasthani"],
    experience: "10 years"
  },

  // 🏰 FORTS - MADHYA PRADESH
  {
    id: 64,
    name: "Vikramaditya Tomar",
    place: "Madhya Pradesh - Gwalior Fort",
    category: "Forts",
    price: 2000,
    about: "Man Singh Palace and Teli ka Mandir expert. Classical music history specialist.",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 4.8,
    languages: ["Hindi", "English"],
    experience: "13 years"
  },
  {
    id: 65,
    name: "Shobha Scindia",
    place: "Madhya Pradesh - Gwalior",
    category: "Forts",
    price: 1900,
    about: "Jai Vilas Palace and museum expert. Combines fort with city heritage walk.",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    rating: 4.7,
    languages: ["Hindi", "English"],
    experience: "8 years"
  },

  // 🏰 FORTS - TELANGANA
  {
    id: 66,
    name: "Qutub Shahi",
    place: "Telangana - Golconda Fort",
    category: "Forts",
    price: 2100,
    about: "Acoustics and diamond history expert. Organizes evening sound & light shows.",
    image: "https://randomuser.me/api/portraits/men/61.jpg",
    rating: 4.9,
    languages: ["Telugu", "Hindi", "English", "Urdu"],
    experience: "12 years"
  },
  {
    id: 67,
    name: "Zainab Begum",
    place: "Telangana - Hyderabad Forts",
    category: "Forts",
    price: 2000,
    about: "Qutb Shahi tombs and Charminar specialist. Combines forts with biryani food tours.",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
    rating: 4.8,
    languages: ["Telugu", "Urdu", "Hindi", "English"],
    experience: "9 years"
  },

  // 🏰 FORTS - MAHARASHTRA
  {
    id: 68,
    name: "Shivaji Bhosale",
    place: "Maharashtra - Raigad Fort",
    category: "Forts",
    price: 2200,
    about: "Maratha Empire and Chhatrapati Shivaji coronation specialist. Ropeway tour expert.",
    image: "https://randomuser.me/api/portraits/men/72.jpg",
    rating: 5.0,
    languages: ["Marathi", "Hindi", "English"],
    experience: "17 years"
  },
  {
    id: 69,
    name: "Tanaji Malusare",
    place: "Maharashtra - Sinhagad Fort",
    category: "Forts",
    price: 1900,
    about: "Battle of Sinhagad specialist. Knows trekking routes and local food stalls.",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 4.9,
    languages: ["Marathi", "Hindi", "English"],
    experience: "11 years"
  },

  // 🏰 FORTS - KERALA
  {
    id: 70,
    name: "Shivarama Menon",
    place: "Kerala - Bekal Fort",
    category: "Forts",
    price: 1850,
    about: "Coastal fort and Arabian Sea viewpoint expert. Bollywood movie location specialist.",
    image: "https://randomuser.me/api/portraits/men/49.jpg",
    rating: 4.8,
    languages: ["Malayalam", "Kannada", "English"],
    experience: "10 years"
  },
  {
    id: 71,
    name: "Radha Nair",
    place: "Kerala - Bekal",
    category: "Forts",
    price: 1750,
    about: "Fort beach and backwater combination tours. Photography and sunset view specialist.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 4.7,
    languages: ["Malayalam", "English", "Hindi"],
    experience: "7 years"
  },

  // 🏛️ HERITAGE SITES - TAJ MAHAL
  {
    id: 72,
    name: "Zaheer Ahmed",
    place: "Uttar Pradesh - Taj Mahal",
    category: "Heritage Sites",
    price: 2800,
    about: "Mughal architecture and Shah Jahan love story expert. Sunrise photography specialist.",
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    rating: 5.0,
    languages: ["Hindi", "English", "Urdu", "French"],
    experience: "20 years"
  },
  {
    id: 73,
    name: "Mumtaz Begum",
    place: "Uttar Pradesh - Agra Fort",
    category: "Heritage Sites",
    price: 2600,
    about: "Agra heritage circuit specialist. Combines Taj, Agra Fort, and Fatehpur Sikri tours.",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 4.9,
    languages: ["Hindi", "English", "Urdu"],
    experience: "15 years"
  },

  // 🏛️ HERITAGE SITES - MAHARASHTRA
  {
    id: 74,
    name: "Ashok Patil",
    place: "Maharashtra - Ajanta Caves",
    category: "Heritage Sites",
    price: 2400,
    about: "Buddhist art and ancient frescoes specialist. Explains painting techniques and history.",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    rating: 4.9,
    languages: ["Marathi", "Hindi", "English"],
    experience: "16 years"
  },
  {
    id: 75,
    name: "Vaishali Deshmukh",
    place: "Maharashtra - Ellora Caves",
    category: "Heritage Sites",
    price: 2500,
    about: "Rock-cut architecture expert. Kailasa temple carving specialist with audio guides.",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    rating: 5.0,
    languages: ["Marathi", "Hindi", "English"],
    experience: "14 years"
  },

  // 🏛️ HERITAGE SITES - KARNATAKA
  {
    id: 76,
    name: "Krishna Deva Raya",
    place: "Karnataka - Hampi",
    category: "Heritage Sites",
    price: 2600,
    about: "Vijayanagara Empire ruins specialist. Knows every temple chariot and bazaar story.",
    image: "https://randomuser.me/api/portraits/men/74.jpg",
    rating: 5.0,
    languages: ["Kannada", "Hindi", "English"],
    experience: "18 years"
  },
  {
    id: 77,
    name: "Tungabhadra Devi",
    place: "Karnataka - Hampi Bazaar",
    category: "Heritage Sites",
    price: 2400,
    about: "Boulder climbing and coracle boat ride specialist. Hippie island expert.",
    image: "https://randomuser.me/api/portraits/women/56.jpg",
    rating: 4.8,
    languages: ["Kannada", "English", "Telugu"],
    experience: "12 years"
  },

  // 🏛️ HERITAGE SITES - MADHYA PRADESH
  {
    id: 78,
    name: "Chandela Rajput",
    place: "Madhya Pradesh - Khajuraho",
    category: "Heritage Sites",
    price: 2500,
    about: "Temple sculptures and erotic art historian. Explains Kamasutra carvings tastefully.",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 4.9,
    languages: ["Hindi", "English", "Bundeli"],
    experience: "15 years"
  },
  {
    id: 79,
    name: "Devika Sharma",
    place: "Madhya Pradesh - Khajuraho",
    category: "Heritage Sites",
    price: 2300,
    about: "Light & sound show and village culture specialist. Combines temples with tribal tours.",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    rating: 4.8,
    languages: ["Hindi", "English"],
    experience: "10 years"
  },

  // 🏛️ HERITAGE SITES - GUJARAT
  {
    id: 80,
    name: "Udaybhan Vav",
    place: "Gujarat - Rani ki Vav",
    category: "Heritage Sites",
    price: 2000,
    about: "Stepwell architecture and water management expert. Photography tour specialist.",
    image: "https://randomuser.me/api/portraits/men/53.jpg",
    rating: 4.9,
    languages: ["Gujarati", "Hindi", "English"],
    experience: "11 years"
  },
  {
    id: 81,
    name: "Rupal Shah",
    place: "Gujarat - Patan",
    category: "Heritage Sites",
    price: 1900,
    about: "Patola saree weaving and heritage craft specialist. Combines Vav with textile tours.",
    image: "https://randomuser.me/api/portraits/women/40.jpg",
    rating: 4.8,
    languages: ["Gujarati", "Hindi", "English"],
    experience: "8 years"
  },

  // 💦 WATERFALLS - KARNATAKA
  {
    id: 82,
    name: "Lingaraj Rao",
    place: "Karnataka - Jog Falls",
    category: "Waterfalls",
    price: 2000,
    about: "Sharavati river and monsoon waterfall expert. Knows best viewpoints and trekking trails.",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    rating: 4.9,
    languages: ["Kannada", "Hindi", "English"],
    experience: "12 years"
  },
  {
    id: 83,
    name: "Sharada Bhat",
    place: "Karnataka - Jog Falls",
    category: "Waterfalls",
    price: 1900,
    about: "Nature photography and bird watching specialist. Organizes sunrise waterfall tours.",
    image: "https://randomuser.me/api/portraits/women/43.jpg",
    rating: 4.8,
    languages: ["Kannada", "English", "Tulu"],
    experience: "9 years"
  },

  // 💦 WATERFALLS - GOA
  {
    id: 84,
    name: "Francis D'Cruz",
    place: "Goa - Dudhsagar Falls",
    category: "Waterfalls",
    price: 2200,
    about: "Jeep safari and spice plantation tour specialist. Knows railway track trekking routes.",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    rating: 4.9,
    languages: ["English", "Hindi", "Konkani"],
    experience: "11 years"
  },
  {
    id: 85,
    name: "Monica Pereira",
    place: "Goa - Dudhsagar",
    category: "Waterfalls",
    price: 2100,
    about: "Wildlife spotting and waterfall swimming expert. Bhagwan Mahavir sanctuary guide.",
    image: "https://randomuser.me/api/portraits/women/37.jpg",
    rating: 4.8,
    languages: ["English", "Hindi", "Konkani"],
    experience: "8 years"
  },

  // 💦 WATERFALLS - KERALA
  {
    id: 86,
    name: "Mohanan Nair",
    place: "Kerala - Athirappilly Falls",
    category: "Waterfalls",
    price: 2100,
    about: "Rainforest and endemic species specialist. Film shooting location expert.",
    image: "https://randomuser.me/api/portraits/men/57.jpg",
    rating: 4.9,
    languages: ["Malayalam", "Hindi", "English"],
    experience: "13 years"
  },
  {
    id: 87,
    name: "Bindu George",
    place: "Kerala - Vazhachal Falls",
    category: "Waterfalls",
    price: 2000,
    about: "Chalakudy river and forest department permit specialist. Bird watching expert.",
    image: "https://randomuser.me/api/portraits/women/46.jpg",
    rating: 4.8,
    languages: ["Malayalam", "English", "Tamil"],
    experience: "9 years"
  },

  // 💦 WATERFALLS - MEGHALAYA
  {
    id: 88,
    name: "Daphimon Kharkongor",
    place: "Meghalaya - Nohkalikai Falls",
    category: "Waterfalls",
    price: 2400,
    about: "Living root bridges and wettest place specialist. Local folklore storyteller.",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
    rating: 5.0,
    languages: ["English", "Khasi", "Hindi"],
    experience: "10 years"
  },
  {
    id: 89,
    name: "Grace Lyngdoh",
    place: "Meghalaya - Cherrapunji",
    category: "Waterfalls",
    price: 2300,
    about: "Seven Sisters Falls and double-decker root bridge expert. Cave exploration guide.",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    rating: 4.9,
    languages: ["English", "Khasi", "Hindi"],
    experience: "8 years"
  },

  // 💦 WATERFALLS - HIMACHAL PRADESH
  {
    id: 90,
    name: "Mohan Thakur",
    place: "Himachal Pradesh - Bhagsu Falls",
    category: "Waterfalls",
    price: 1800,
    about: "McLeod Ganj and Bhagsu Nag temple expert. Cafe culture and waterfall trek specialist.",
    image: "https://randomuser.me/api/portraits/men/43.jpg",
    rating: 4.8,
    languages: ["Hindi", "English", "Pahari"],
    experience: "7 years"
  },

  // 💦 WATERFALLS - UTTARAKHAND
  {
    id: 91,
    name: "Dinesh Bhatt",
    place: "Uttarakhand - Kempty Falls",
    category: "Waterfalls",
    price: 1900,
    about: "Mussoorie falls and colonial walking trails expert. Family-friendly picnic spot guide.",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    rating: 4.7,
    languages: ["Hindi", "English", "Garhwali"],
    experience: "10 years"
  },

  // 💦 WATERFALLS - TAMIL NADU
  {
    id: 92,
    name: "Senthil Kumar",
    place: "Tamil Nadu - Hogenakkal Falls",
    category: "Waterfalls",
    price: 1850,
    about: "Coracle boat ride and fish spa specialist. Cauvery river bathing expert.",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    rating: 4.8,
    languages: ["Tamil", "Kannada", "English"],
    experience: "11 years"
  },
  {
    id: 93,
    name: "Malathi Devi",
    place: "Tamil Nadu - Courtallam Falls",
    category: "Waterfalls",
    price: 1800,
    about: "Spa of South India specialist. Knows medicinal properties of different waterfall sections.",
    image: "https://randomuser.me/api/portraits/women/53.jpg",
    rating: 4.9,
    languages: ["Tamil", "Malayalam", "English"],
    experience: "9 years"
  },

  // 🌍 FAMOUS TOURIST PLACES - JAIPUR
  {
    id: 94,
    name: "Arjun Singh Rathore",
    place: "Rajasthan - Jaipur City",
    category: "Famous Places",
    price: 2400,
    about: "Pink City heritage and royal palaces expert. Hawa Mahal and Jantar Mantar specialist.",
    image: "https://randomuser.me/api/portraits/men/79.jpg",
    rating: 4.9,
    languages: ["Hindi", "English", "Rajasthani"],
    experience: "14 years"
  },
  {
    id: 95,
    name: "Gayatri Devi",
    place: "Rajasthan - Jaipur",
    category: "Famous Places",
    price: 2300,
    about: "Shopping and jewelry bazaar expert. Albert Hall Museum and light show guide.",
    image: "https://randomuser.me/api/portraits/women/69.jpg",
    rating: 4.8,
    languages: ["Hindi", "English", "Marwari"],
    experience: "10 years"
  },

  // 🌍 FAMOUS TOURIST PLACES - UDAIPUR
  {
    id: 96,
    name: "Maharana Lakshman",
    place: "Rajasthan - Udaipur",
    category: "Famous Places",
    price: 2600,
    about: "City of Lakes and romantic boat rides specialist. Lake Palace and sunset view expert.",
    image: "https://randomuser.me/api/portraits/men/80.jpg",
    rating: 5.0,
    languages: ["Hindi", "English", "Mewari"],
    experience: "16 years"
  },
  {
    id: 97,
    name: "Padmavati Rajput",
    place: "Rajasthan - Udaipur",
    category: "Famous Places",
    price: 2500,
    about: "City Palace and crystal gallery specialist. Monsoon Palace viewpoint expert.",
    image: "https://randomuser.me/api/portraits/women/71.jpg",
    rating: 4.9,
    languages: ["Hindi", "English", "Rajasthani"],
    experience: "12 years"
  },

  // 🌍 FAMOUS TOURIST PLACES - LADAKH
  {
    id: 98,
    name: "Tsering Namgyal",
    place: "Ladakh - Leh",
    category: "Famous Places",
    price: 3500,
    about: "High altitude acclimatization expert. Pangong Lake and Nubra Valley specialist.",
    image: "https://randomuser.me/api/portraits/men/81.jpg",
    rating: 5.0,
    languages: ["English", "Hindi", "Ladakhi", "Tibetan"],
    experience: "15 years"
  },
  {
    id: 99,
    name: "Stanzin Dolma",
    place: "Ladakh - Leh-Ladakh",
    category: "Famous Places",
    price: 3400,
    about: "Monastery circuit and Buddhist culture expert. Bike tour organizer for Khardung La.",
    image: "https://randomuser.me/api/portraits/women/73.jpg",
    rating: 4.9,
    languages: ["English", "Hindi", "Ladakhi"],
    experience: "12 years"
  },

  // 🌍 FAMOUS TOURIST PLACES - RANN OF KUTCH
  {
    id: 100,
    name: "Bharat Ahir",
    place: "Gujarat - Rann of Kutch",
    category: "Famous Places",
    price: 2700,
    about: "White desert and full moon festival expert. Handicraft village and tribal culture guide.",
    image: "https://randomuser.me/api/portraits/men/82.jpg",
    rating: 4.9,
    languages: ["Gujarati", "Hindi", "English", "Kutchi"],
    experience: "13 years"
  },
  {
    id: 101,
    name: "Kavita Rabari",
    place: "Gujarat - Rann Utsav",
    category: "Famous Places",
    price: 2600,
    about: "Desert camping and folk music specialist. Knows authentic embroidery artisan villages.",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    rating: 4.8,
    languages: ["Gujarati", "Hindi", "English"],
    experience: "9 years"
  },

  // 🌍 FAMOUS TOURIST PLACES - RISHIKESH
  {
    id: 102,
    name: "Yogi Anand",
    place: "Uttarakhand - Rishikesh",
    category: "Famous Places",
    price: 2100,
    about: "Yoga capital and Ganga Aarti specialist. River rafting and bungee jumping coordinator.",
    image: "https://randomuser.me/api/portraits/men/83.jpg",
    rating: 4.9,
    languages: ["Hindi", "English", "Sanskrit"],
    experience: "11 years"
  },
  {
    id: 103,
    name: "Sakshi Sharma",
    place: "Uttarakhand - Rishikesh",
    category: "Famous Places",
    price: 2000,
    about: "Beatles ashram and cafe culture expert. Laxman Jhula and Ram Jhula walking tour guide.",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    rating: 4.8,
    languages: ["Hindi", "English"],
    experience: "7 years"
  },

  // 🌍 FAMOUS TOURIST PLACES - MYSURU
  {
    id: 104,
    name: "Jayaram Wodeyar",
    place: "Karnataka - Mysuru",
    category: "Famous Places",
    price: 2200,
    about: "Mysore Palace and royal heritage expert. Dasara festival celebration specialist.",
    image: "https://randomuser.me/api/portraits/men/84.jpg",
    rating: 4.9,
    languages: ["Kannada", "Hindi", "English"],
    experience: "14 years"
  },
  {
    id: 105,
    name: "Chamundi Rao",
    place: "Karnataka - Mysuru",
    category: "Famous Places",
    price: 2100,
    about: "Chamundi Hills and silk saree shopping expert. Zoo and botanical garden guide.",
    image: "https://randomuser.me/api/portraits/women/76.jpg",
    rating: 4.8,
    languages: ["Kannada", "English", "Tamil"],
    experience: "10 years"
  },

  // 🌍 FAMOUS TOURIST PLACES - KOLKATA
  {
    id: 106,
    name: "Sourav Chatterjee",
    place: "West Bengal - Kolkata",
    category: "Famous Places",
    price: 2000,
    about: "City of Joy and colonial architecture expert. Victoria Memorial and street food guide.",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    rating: 4.8,
    languages: ["Bengali", "Hindi", "English"],
    experience: "12 years"
  },
  {
    id: 107,
    name: "Rina Banerjee",
    place: "West Bengal - Kolkata",
    category: "Famous Places",
    price: 1900,
    about: "Durga Puja and cultural festival specialist. Howrah Bridge and riverside tour expert.",
    image: "https://randomuser.me/api/portraits/women/77.jpg",
    rating: 4.9,
    languages: ["Bengali", "Hindi", "English"],
    experience: "9 years"
  },

  // 🌍 FAMOUS TOURIST PLACES - MUMBAI
  {
    id: 108,
    name: "Ashish Mehta",
    place: "Maharashtra - Mumbai",
    category: "Famous Places",
    price: 2600,
    about: "Gateway of India and Marine Drive specialist. Bollywood studio tour organizer.",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 4.9,
    languages: ["Hindi", "Marathi", "English", "Gujarati"],
    experience: "13 years"
  },
  {
    id: 109,
    name: "Prerna Joshi",
    place: "Maharashtra - Mumbai",
    category: "Famous Places",
    price: 2500,
    about: "Local train culture and street food tour expert. Elephanta Caves specialist.",
    image: "https://randomuser.me/api/portraits/women/78.jpg",
    rating: 4.8,
    languages: ["Hindi", "Marathi", "English"],
    experience: "10 years"
  }
];

export default guidesData;