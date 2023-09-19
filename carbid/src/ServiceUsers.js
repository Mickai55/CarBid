const baseUrl = "http://localhost:5050";

export const login = async (username, password) => {
  try {
    const url = `${baseUrl}/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password })
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
}