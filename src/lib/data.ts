export type Interest =
  | "Tribal Culture"
  | "Beaches"
  | "Trekking"
  | "Wildlife"
  | "Heritage"
  | "Cuisine"
  | "Waterfalls"
  | "Eco-tourism";

export type Budget = "₹" | "₹₹" | "₹₹₹";
export type Difficulty = "Easy" | "Moderate" | "Challenging";

export type Destination = {
  id: string;
  name: string;
  district: string;
  tagline: string;
  description: string;
  image: string;
  emoji: string;
  tags: Interest[];
  duration: string;
  budget: Budget;
  difficulty: Difficulty;
  bestSeason: string;
  highlights: string[];
  essentials: {
    transport: string[];
    stays: string[];
    food: string[];
    amenities: string[];
  };
  lat: number;
  lng: number;
  hostIds: string[];
};

export type Host = {
  id: string;
  name: string;
  type: "Homestay" | "Guide" | "Transport" | "Vendor";
  location: string;
  verified: boolean;
  bio: string;
  avatar: string;
};

export type Package = {
  id: string;
  destinationId: string;
  hostId: string;
  title: string;
  price: number;
  duration: string;
  groupSize: string;
  includes: string[];
  itinerary: { day: number; title: string; activities: string[] }[];
  rating: number;
  reviews: number;
};

export const hosts: Host[] = [
  { id: "h1", name: "Koraput Trails Homestay", type: "Homestay", location: "Koraput", verified: true, bio: "Family-run tribal homestay near Deomali with home-cooked meals.", avatar: "🏡" },
  { id: "h2", name: "Similipal Eco Guides", type: "Guide", location: "Baripada", verified: true, bio: "Certified naturalists for Similipal tiger reserve safaris.", avatar: "🧭" },
  { id: "h3", name: "Chilika Boat Collective", type: "Transport", location: "Satapada", verified: true, bio: "Local boatmen association for lake tours & dolphin spotting.", avatar: "🚤" },
  { id: "h4", name: "Daringbadi Coffee Stays", type: "Homestay", location: "Daringbadi", verified: true, bio: "Coffee estate homestay in the 'Kashmir of Odisha'.", avatar: "☕" },
  { id: "h5", name: "Bhitarkanika Creek Tours", type: "Transport", location: "Rajnagar", verified: false, bio: "Mangrove creek boat tours & crocodile spotting.", avatar: "🐊" },
  { id: "h6", name: "Rayagada Tribal Hosts", type: "Homestay", location: "Rayagada", verified: true, bio: "Immersive Dongria Kondh village homestay experience.", avatar: "🛖" },
  { id: "h7", name: "Satkosia Nature Camp", type: "Homestay", location: "Angul", verified: true, bio: "Riverside eco-camp on the Mahanadi gorge.", avatar: "⛺" },
];

export const destinations: Destination[] = [
  {
    id: "d1", name: "Deomali Peak", district: "Koraput",
    tagline: "Odisha's highest peak & tribal heartland",
    description: "Trek to Odisha's tallest summit (1672m) through Dongria Kondh villages, coffee plantations and misty valleys. A raw, crowd-free Himalayan feel in the Eastern Ghats.",
    image: "/odisha/deomali.jpg", emoji: "⛰️",
    tags: ["Trekking", "Tribal Culture", "Eco-tourism"],
    duration: "2-3 days", budget: "₹₹", difficulty: "Moderate", bestSeason: "Oct-Feb",
    highlights: ["Sunrise summit trek", "Tribal market (haat)", "Coffee tasting", "Waterfalls en route"],
    essentials: {
      transport: ["Bus from Koraput (2hr)", "Shared jeep to Pottangi", "Local taxi hire"],
      stays: ["Koraput Trails Homestay", "Forest rest house Pottangi", "Tent camping (permit)"],
      food: ["Mandia jau (ragi porridge)", "Bamboo chicken", "Local coffee", "Pakhala bhata"],
      amenities: ["ATM at Koraput town", "Basic medical at Pottangi", "Patchy Jio/Airtel", "No fuel beyond Koraput"],
    },
    lat: 18.66, lng: 82.98, hostIds: ["h1"],
  },
  {
    id: "d2", name: "Duduma Waterfall", district: "Koraput",
    tagline: "The 'Matsya Tirtha' twin falls",
    description: "A spectacular 175m waterfall on the Machkund river, sacred to locals. Best viewed during monsoon; combines with a visit to the Machkund hydro project.",
    image: "/odisha/waterfall.jpg", emoji: "💧",
    tags: ["Waterfalls", "Tribal Culture"],
    duration: "1 day", budget: "₹", difficulty: "Easy", bestSeason: "Jul-Nov",
    highlights: ["Twin cascades", "Machkund temple", "Tribal haat nearby", "Photography"],
    essentials: {
      transport: ["Bus Koraput-Lamtaput", "Auto to Duduma (12km)"],
      stays: ["Koraput Trails Homestay", "Lamtaput guest house"],
      food: ["Pakhala bhata", "Local fish curry", "Chai stalls"],
      amenities: ["No ATM nearby (carry cash)", "Basic clinic Lamtaput", "Weak network"],
    },
    lat: 18.82, lng: 82.76, hostIds: ["h1"],
  },
  {
    id: "d3", name: "Chilika Lake (Nalabana)", district: "Puri / Ganjam",
    tagline: "Asia's largest brackish lagoon & bird paradise",
    description: "Spot Irrawaddy dolphins at Satapada and migratory birds at Nalabana island. A serene boat ride through fishing villages and floating weed beds.",
    image: "/odisha/lake.jpg", emoji: "🦩",
    tags: ["Wildlife", "Eco-tourism", "Beaches"],
    duration: "1-2 days", budget: "₹₹", difficulty: "Easy", bestSeason: "Nov-Feb",
    highlights: ["Dolphin spotting", "Nalabana bird sanctuary", "Kalijai temple", "Sunset cruise"],
    essentials: {
      transport: ["Bus Bhubaneswar-Satapada (3hr)", "Boat hire at jetty"],
      stays: ["OTDC Panthanivas Satapada", "Local homestays"],
      food: ["Chilika crab", "Prawn malai curry", "Fresh fish fry"],
      amenities: ["ATM Satapada", "Pharmacy", "Good 4G", "Fuel at Khurda"],
    },
    lat: 19.72, lng: 85.32, hostIds: ["h3"],
  },
  {
    id: "d4", name: "Satkosia Gorge", district: "Angul",
    tagline: "Mahanadi's dramatic gorge & tiger country",
    description: "Where the Mahanadi cuts through the Eastern Ghats forming a 22km gorge. Crocodile sanctuary, gharial breeding centre, and jungle camps.",
    image: "/odisha/river.jpg", emoji: "🐊",
    tags: ["Wildlife", "Eco-tourism", "Trekking"],
    duration: "2 days", budget: "₹₹", difficulty: "Moderate", bestSeason: "Oct-Mar",
    highlights: ["Gorge boat safari", "Gharial centre", "Jungle camp", "Birdwatching"],
    essentials: {
      transport: ["Bus Angul-Tikarpada", "Jeep to camp"],
      stays: ["Satkosia Nature Camp", "Forest rest house"],
      food: ["Dalma", "Local fish", "Tribal cuisine on request"],
      amenities: ["ATM Angul", "Medical Angul (40km)", "Weak network in gorge"],
    },
    lat: 20.47, lng: 84.83, hostIds: ["h7"],
  },
  {
    id: "d5", name: "Similipal Biosphere", district: "Mayurbhanj",
    tagline: "Tiger reserve with India's tallest waterfall",
    description: "Dense sal forests, Barehipani (399m) & Joranda waterfalls, and Santhal/Munda tribal villages. A UNESCO biosphere reserve still off the tourist radar.",
    image: "/odisha/forest.jpg", emoji: "🐯",
    tags: ["Wildlife", "Waterfalls", "Tribal Culture", "Trekking"],
    duration: "3-4 days", budget: "₹₹₹", difficulty: "Moderate", bestSeason: "Nov-Mar",
    highlights: ["Barehipani waterfall", "Jungle safari", "Tribal haat", "Orchidarium"],
    essentials: {
      transport: ["Train to Baripada", "Jeep safari (permit required)"],
      stays: ["Similipal Eco Guides camps", "Forest lodges (book ahead)"],
      food: ["Santhali cuisine", "Dal-roti", "Local honey"],
      amenities: ["ATM Baripada", "Medical Baripada", "No network inside reserve"],
    },
    lat: 21.67, lng: 86.33, hostIds: ["h2"],
  },
  {
    id: "d6", name: "Daringbadi", district: "Kandhamal",
    tagline: "The 'Kashmir of Odisha'",
    description: "Hill station at 915m with pine forests, coffee & pepper plantations, and occasional winter frost. A cool, quiet escape with tribal Kondh culture.",
    image: "/odisha/hills.jpg", emoji: "🌲",
    tags: ["Heritage", "Cuisine", "Eco-tourism"],
    duration: "2-3 days", budget: "₹₹", difficulty: "Easy", bestSeason: "Nov-Feb (frost)",
    highlights: ["Pine forest walks", "Coffee estate tour", "Hill View Park", "Tribal museum"],
    essentials: {
      transport: ["Bus Berhampur-Daringbadi (5hr)", "Taxi from Phulbani"],
      stays: ["Daringbadi Coffee Stays", "OTDC Panthanivas"],
      food: ["Kandhamal turmeric dishes", "Local coffee", "Millet roti", "Honey"],
      amenities: ["ATM Daringbadi (limited)", "CHC Daringbadi", "BSNL/Airtel patchy"],
    },
    lat: 19.93, lng: 84.15, hostIds: ["h4"],
  },
  {
    id: "d7", name: "Khandadhar Waterfall", district: "Sundargarh",
    tagline: "Odisha's 2nd highest waterfall (244m)",
    description: "A horsetail waterfall plunging through dense forest. Sacred to Pauri Bhuiyan tribe; requires a forest trek. Best in monsoon, dramatic and uncrowded.",
    image: "/odisha/waterfall.jpg", emoji: "🌊",
    tags: ["Waterfalls", "Tribal Culture", "Trekking"],
    duration: "1-2 days", budget: "₹", difficulty: "Moderate", bestSeason: "Jul-Nov",
    highlights: ["Horsetail falls", "Pauri Bhuiyan villages", "Forest trek", "Birding"],
    essentials: {
      transport: ["Train to Rourkela", "Bus to Bonaigarh", "Jeep to base"],
      stays: ["Forest rest house", "Rourkela hotels (base)"],
      food: ["Pakhala bhata", "Local chicken", "Mahua drink (seasonal)"],
      amenities: ["ATM Rourkela", "Medical Rourkela", "No network at falls"],
    },
    lat: 21.78, lng: 84.85, hostIds: [],
  },
  {
    id: "d8", name: "Bhitarkanika Mangroves", district: "Kendrapara",
    tagline: "India's 2nd largest mangrove & croc country",
    description: "Boat through creeks to see saltwater crocodiles, monitor lizards, and nesting olive ridley turtles. A quieter Sundarbans-like experience.",
    image: "/odisha/forest.jpg", emoji: "🌿",
    tags: ["Wildlife", "Eco-tourism", "Beaches"],
    duration: "2 days", budget: "₹₹", difficulty: "Easy", bestSeason: "Oct-Mar (turtles Nov-Dec)",
    highlights: ["Crocodile sanctuary", "Mangrove boat ride", "Turtle nesting", "Birding"],
    essentials: {
      transport: ["Bus Kendrapara-Rajnagar", "Boat from Gupti"],
      stays: ["Bhitarkanika Creek Tours cottages", "Forest rest house"],
      food: ["Crab curry", "Prawn dishes", "Coconut water"],
      amenities: ["ATM Rajnagar", "Medical Kendrapara", "Patchy network"],
    },
    lat: 20.75, lng: 86.87, hostIds: ["h5"],
  },
  {
    id: "d9", name: "Taptapani Hot Springs", district: "Ganjam",
    tagline: "Sulphur springs & Saora tribal art",
    description: "Natural hot springs in a forested valley, paired with Saora tribal wall paintings and nearby Chandragiri Tibetan settlement.",
    image: "/odisha/hills.jpg", emoji: "♨️",
    tags: ["Heritage", "Tribal Culture"],
    duration: "1-2 days", budget: "₹", difficulty: "Easy", bestSeason: "Oct-Mar",
    highlights: ["Hot spring bath", "Saora tribal art", "Chandragiri monastery", "Forest walks"],
    essentials: {
      transport: ["Bus Berhampur-Taptapani (2hr)", "Taxi"],
      stays: ["OTDC Panthanivas Taptapani", "Local lodges"],
      food: ["Pakhala bhata", "Local fish", "Tibetan momos (Chandragiri)"],
      amenities: ["ATM Berhampur", "Medical Mohana", "Good 4G"],
    },
    lat: 19.50, lng: 84.40, hostIds: [],
  },
  {
    id: "d10", name: "Hirakud Dam & Reservoir", district: "Sambalpur",
    tagline: "World's longest earthen dam",
    description: "A 25km dam creating a vast reservoir with islands (Cattle Island). Boat rides, Gandhi Minar views, and Sambalpuri weaving villages nearby.",
    image: "/odisha/river.jpg", emoji: "🏗️",
    tags: ["Heritage", "Eco-tourism"],
    duration: "1-2 days", budget: "₹", difficulty: "Easy", bestSeason: "Oct-Feb",
    highlights: ["Dam viewpoint", "Cattle Island boat", "Gandhi Minar", "Weaving villages"],
    essentials: {
      transport: ["Train/flight to Sambalpur", "Local taxi"],
      stays: ["Sambalpur hotels", "OTDC"],
      food: ["Sambalpuri thali", "Chhena poda", "Local fish"],
      amenities: ["ATM Sambalpur", "Medical Sambalpur", "Good 4G"],
    },
    lat: 21.53, lng: 83.87, hostIds: [],
  },
  {
    id: "d11", name: "Putsil / Minajhola", district: "Rayagada",
    tagline: "Dongria Kondh tribal heartland",
    description: "Immersive experience in Dongria Kondh villages of Niyamgiri foothills. Traditional markets, millet farming, and sacred mountain views.",
    image: "/odisha/village.jpg", emoji: "🛖",
    tags: ["Tribal Culture", "Eco-tourism", "Trekking"],
    duration: "2-3 days", budget: "₹₹", difficulty: "Moderate", bestSeason: "Oct-Mar",
    highlights: ["Tribal haat", "Village homestay", "Niyamgiri views", "Millet cuisine"],
    essentials: {
      transport: ["Train to Rayagada", "Bus/jeep to villages"],
      stays: ["Rayagada Tribal Hosts homestay"],
      food: ["Mandia (ragi) dishes", "Bamboo rice", "Local honey"],
      amenities: ["ATM Rayagada", "Medical Rayagada", "No network in villages"],
    },
    lat: 19.32, lng: 83.42, hostIds: ["h6"],
  },
  {
    id: "d12", name: "Gandhamardan Hills", district: "Bargarh / Balangir",
    tagline: "Medicinal mountain & ancient caves",
    description: "Mythical mountain from Ramayana, rich in medicinal plants, with Nrusinghanath temple and ancient caves. A pilgrimage + trek combo.",
    image: "/odisha/temple.jpg", emoji: "🛕",
    tags: ["Heritage", "Trekking", "Tribal Culture"],
    duration: "1-2 days", budget: "₹", difficulty: "Moderate", bestSeason: "Oct-Mar",
    highlights: ["Nrusinghanath temple", "Medicinal plant trails", "Ancient caves", "Panoramic views"],
    essentials: {
      transport: ["Bus Bargarh-Paikmal", "Taxi to base"],
      stays: ["Dharamshala Nrusinghanath", "Paikmal lodges"],
      food: ["Prasad meals", "Local thali"],
      amenities: ["ATM Paikmal", "Medical Paikmal", "Patchy network"],
    },
    lat: 20.87, lng: 82.90, hostIds: [],
  },
];

export const packages: Package[] = [
  {
    id: "p1", destinationId: "d1", hostId: "h1", title: "Deomali Sunrise & Tribal Haat",
    price: 4500, duration: "2 days / 1 night", groupSize: "2-6",
    includes: ["Homestay stay", "All meals", "Guide", "Transport from Koraput", "Haat visit"],
    itinerary: [
      { day: 1, title: "Arrival & Coffee Trail", activities: ["Pickup from Koraput", "Check-in homestay", "Coffee plantation walk", "Tribal dinner & stories"] },
      { day: 2, title: "Summit Sunrise", activities: ["4am summit trek", "Sunrise at 1672m", "Tribal haat visit", "Departure"] },
    ],
    rating: 4.8, reviews: 34,
  },
  {
    id: "p2", destinationId: "d5", hostId: "h2", title: "Similipal Jungle & Waterfall Safari",
    price: 8900, duration: "3 days / 2 nights", groupSize: "4-8",
    includes: ["Forest lodge", "All meals", "Jeep safari", "Guide", "Permits"],
    itinerary: [
      { day: 1, title: "Entry & Barehipani", activities: ["Baripada pickup", "Park entry", "Barehipani waterfall view", "Camp dinner"] },
      { day: 2, title: "Jungle Safari", activities: ["Dawn safari", "Chahala grasslands", "Orchidarium", "Tribal village visit"] },
      { day: 3, title: "Joranda & Exit", activities: ["Joranda waterfall", "Breakfast", "Exit & drop"] },
    ],
    rating: 4.9, reviews: 52,
  },
  {
    id: "p3", destinationId: "d3", hostId: "h3", title: "Chilika Dolphin & Bird Trail",
    price: 3200, duration: "1 day", groupSize: "2-10",
    includes: ["Boat ride", "Guide", "Breakfast", "Binoculars"],
    itinerary: [
      { day: 1, title: "Lake Day", activities: ["Satapada jetty", "Dolphin spotting", "Nalabana bird sanctuary", "Kalijai temple", "Sunset cruise"] },
    ],
    rating: 4.7, reviews: 89,
  },
  {
    id: "p4", destinationId: "d6", hostId: "h4", title: "Daringbadi Coffee & Frost Escape",
    price: 5500, duration: "2 days / 1 night", groupSize: "2-6",
    includes: ["Coffee estate stay", "Meals", "Estate tour", "Transport"],
    itinerary: [
      { day: 1, title: "Estate Arrival", activities: ["Pickup", "Check-in", "Coffee & pepper tour", "Bonfire dinner"] },
      { day: 2, title: "Hills & Frost", activities: ["Pine forest walk", "Hill View Park", "Tribal museum", "Departure"] },
    ],
    rating: 4.6, reviews: 27,
  },
  {
    id: "p5", destinationId: "d4", hostId: "h7", title: "Satkosia Gorge Riverside Camp",
    price: 6200, duration: "2 days / 1 night", groupSize: "4-10",
    includes: ["Riverside tent", "Meals", "Boat safari", "Guide", "Bonfire"],
    itinerary: [
      { day: 1, title: "Gorge Arrival", activities: ["Angul pickup", "Camp setup", "Mahanadi boat ride", "Bonfire"] },
      { day: 2, title: "Wildlife Morning", activities: ["Dawn birding", "Gharial centre visit", "Trek", "Departure"] },
    ],
    rating: 4.8, reviews: 41,
  },
  {
    id: "p6", destinationId: "d11", hostId: "h6", title: "Niyamgiri Tribal Immersion",
    price: 5000, duration: "2 days / 1 night", groupSize: "2-5",
    includes: ["Village homestay", "All meals", "Local guide", "Haat visit"],
    itinerary: [
      { day: 1, title: "Village Life", activities: ["Rayagada pickup", "Homestay welcome", "Millet farming demo", "Folk dance evening"] },
      { day: 2, title: "Haat & Hills", activities: ["Tribal haat", "Niyamgiri viewpoint", "Handicraft shopping", "Departure"] },
    ],
    rating: 4.9, reviews: 18,
  },
];

export const interestOptions: Interest[] = [
  "Tribal Culture", "Beaches", "Trekking", "Wildlife", "Heritage", "Cuisine", "Waterfalls", "Eco-tourism",
];

export function getDestination(id: string) { return destinations.find(d => d.id === id); }
export function getHost(id: string) { return hosts.find(h => h.id === id); }
export function getPackage(id: string) { return packages.find(p => p.id === id); }
export function getPackagesForDestination(id: string) { return packages.filter(p => p.destinationId === id); }
export function getHostsForDestination(d: Destination) { return d.hostIds.map(getHost).filter(Boolean) as Host[]; }