// utils/wishlist.js
export const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const addToWishlist = (property) => {
  const wishlist = getWishlist();
  if (!wishlist.find(item => item.id === property._id)) {
    wishlist.unshift({
      id: property._id,
      title: property.title,
      image: property.images?.[0] || "/placeholder.png",
      price: property.price,
      type: property.type,
    });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
};

export const removeFromWishlist = (id) => {
  const wishlist = getWishlist().filter(item => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

export const isInWishlist = (id) => {
  return getWishlist().some(item => item.id === id);
};
