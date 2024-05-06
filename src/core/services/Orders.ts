// orderService.ts
import { firestore } from "@/core/firebase/firebase";

export const fetchOrders = async () => {
  try {
    const ordersSnapshot = await firestore.collection('orders').get();
    return ordersSnapshot.docs.map(doc => {
      const orderData = doc.data();
      return {
        id: doc.id,
        username: orderData.user.name,
        date: orderData.created_at.toDate().toLocaleString(),
        restaurant: orderData.meals[0].restaurantName,
        status: orderData.currentStatus,
        dispatchRider: orderData.dispatchRider,
        location: orderData.pickUpAddress.locationName
      };
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};
