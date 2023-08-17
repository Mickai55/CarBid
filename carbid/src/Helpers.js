const carExample = {
  id: 1,
  brand: "Ford",
  model: "Focus",
  fabricationYear: "2013",
  fuelType: "diesel",
  transmissionType: "automatic",
  mileage: "210000 km",
  power: "120 kW (163 Hp)",
  engineSize: "1,995 cc",
  bodyType: "hatchback",
  description: "",
  pictures: [],
  numberOfSeats: 5,
  color: "Grey",
  biddingInfo: {
    startingPrice: 5000,
    currentPrice: 6000,
    currency: "$",
    numberOfBids: 7,
    listingTime: "2023-07-22",
    sellingTime: "2023-07-28",
  },
};


export const popularCarCompanies = [
  "Toyota",
  "Ford",
  "Honda",
  "Volkswagen",
  "Chevrolet",
  "Nissan",
  "Hyundai",
  "BMW",
  "Mercedes-Benz",
  "Audi",
];
export const currencies = ["$", "€", "RON", "฿"];

export function formatTime(sellingDate) {
  const seconds = Math.floor((new Date(sellingDate).getTime() - Date.now()) / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}