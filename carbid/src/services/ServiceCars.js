import { url } from "Helpers";

const baseUrl = url + "/cars";

export const apiGetCars = async (searchParams) => {
  try {
    const queryString = Object.keys(searchParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`,
      )
      .join("&");

    const url = `${baseUrl}?${queryString}`;

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

export const apiGetCarsCount = async (searchParams) => {
  try {
    const url = `${baseUrl}/count`;

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

export const apiAddCar = async (car) => {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });

    if (!response.ok) {
      throw new Error("Failed to add car");
    }
  } catch (error) {
    window.alert(error);
    return null;
  }
};

export const apiGetCar = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
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

export const apiEditCar = async (car) => {
  try {
    const response = await fetch(`${baseUrl}/${car.id}`, {
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

export const apiDeleteCar = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
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

export const apiGetFilters = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/filters/all`, {
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
