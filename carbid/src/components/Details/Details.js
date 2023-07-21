import React from "react";
import ImageGallery from "react-image-gallery";
import "./Details.css";

const Details = (props) => {
  return (
    <>
      <h3>
        {car.fabricationYear} {car.brand} {car.type}
      </h3>
      <div className="album">
        {/* <img
          src="https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg"
          className="image"
        ></img> */}
        <MyGallery />
      </div>
    </>
  );
};

const images = [
  {
    original: "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
    thumbnail: "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
  },
  {
    original: "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
    thumbnail: "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
  },
  {
    original: "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
    thumbnail: "https://ruswagen.ro/wp-content/uploads/2023/03/331535315_130289899726177_8514068368407989318_n-876x535.jpg",
  },
];

class MyGallery extends React.Component {
  render() {
    return <ImageGallery items={images} />;
  }
}

const car = {
  id: 1,
  brand: "Ford",
  type: "Focus",
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
    listingTime: "17.07.2023 18:00:00",
    timeLeftSeconds: 10000,
  },
};

export default Details;
