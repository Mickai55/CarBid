const baseUrl = "http://localhost:5050/auth";

export const apiRegister = async (username, password) => {
  try {
    const url = `${baseUrl}/register`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    window.alert(error);
    return null;
  }
}

export const apiLogin = async (username, password) => {
  try {
    const url = `${baseUrl}/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    window.alert(error);
    return null;
  }
}