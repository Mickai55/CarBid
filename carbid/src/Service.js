const baseUrl = "http://localhost:5050";

const getCars = async (searchParams) => {
  try {
    const queryString = Object.keys(searchParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`,
      )
      .join("&");

    const url = `${baseUrl}/cars?${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    window.alert(error);
    return null;
  }
};

const addCar = async (car) => {
  try {
    const response = await fetch(`${baseUrl}/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    window.alert(error);
    return null;
  }
};

const getCar = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/cars/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    window.alert(error);
    return null;
  }
};

const editCar = async (car) => {
  try {
    const response = await fetch(`${baseUrl}/cars/${car.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    window.alert(error);
    return null;
  }
};

const deleteCar = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/cars/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    window.alert(error);
    return null;
  }
};

const getFilters = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/cars/filters/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    window.alert(error);
    return null;
  }
};

export { getCars, addCar, getCar, editCar, deleteCar, getFilters };
