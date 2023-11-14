import { url } from "Helpers";

const baseUrl = url + "/bids";

export const apiGetBids = async (user) => {
  try {
    const url = `${baseUrl}/${user}`;

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

export const apiAddBid = async (bid) => {
  try {
    const url = `${baseUrl}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(bid),
    });

    if (!response.ok) {
      throw new Error("Failed to add bid");
    }
  } catch (error) {
    window.alert(error);
    return null;
  }
};

export const apiRaiseBid = async (carId, price) => {
  try {
    const url = `${baseUrl}/raise`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({carId, price}),
    });

    if (!response.ok) {
      throw new Error("Failed to add bid");
    }
  } catch (error) {
    window.alert(error);
    return null;
  }
}
