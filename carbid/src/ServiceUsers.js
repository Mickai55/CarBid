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

export const apiGetUsers = async () => {
  try {
    const url = `${baseUrl}/users`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
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

export const apiIsAdmin = async () => {
  try {
    const url = `${baseUrl}/admin`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
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

export const apiUpdateUserRole = async (id, role) => {
  try {
    const url = `${baseUrl}/update`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        id,
        role
      }),
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

export const apiDeleteUser = async (id) => {
  try {
    const url = `${baseUrl}/delete`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        id
      }),
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
