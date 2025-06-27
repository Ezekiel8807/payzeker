import axios from "axios";

export const payWithPaystack = async (email: string, amount: number) => {
  try {
    const response = await axios.post("/api/paystack/initialize", {
      email,
      amount,
    });

    if (!response.data?.data?.authorization_url)
      return {
        error: true,
        msg: "Failed to start transaction!",
      };

    window.location.href = response.data.data.authorization_url;

    //
  } catch (error) {
    console.error(error);
    alert("Payment error occurred.");
  }
};
