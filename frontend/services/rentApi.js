//For renting Property
const API = "http://localhost:5000/api/rent";

export const applyForRent = async (data) => {
  const res = await fetch(`${API}/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to submit application");
  }

  return res.json();
};
