const baseUrl = "http://localhost:5050";

const getCars = async () => {
  try {
    const response = await fetch(`${baseUrl}/cars`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    window.alert(error);
    return null;
  }
}

const addCar = async (car) => {
  await fetch(`${baseUrl}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  }).catch((error) => {
    window.alert(error);
    return;
  });
};

export { getCars, addCar };
