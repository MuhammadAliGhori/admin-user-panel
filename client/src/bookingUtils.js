import axios from "axios";

export const getAdminKey = async (bookingId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/getbooking/${bookingId}`);
      const booking = response.data; 
      return booking.adminKey;
    } catch (error) {
      console.error("Error fetching admin key:", error);
      return null;
    }
  };
  