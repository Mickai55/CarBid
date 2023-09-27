const baseUrl = "http://localhost:5050/auth";

export const apiRegister = async (username, password) => {
  try {
    const url = `${baseUrl}/register`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
};

export const apiLogin = async (username, password) => {
  try {
    const url = `${baseUrl}/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    localStorage.setItem("user", data.username);
    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    window.alert(error);
    return null;
  }
};

export const apiLogout = async () => {
  try {
    const url = `${baseUrl}/logout`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    return data;
  } catch (error) {
    window.alert(error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    const url = `${baseUrl}/users`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log(data);

    return data;
  } catch (error) {
    window.alert(error);
    return null;
  }
};
