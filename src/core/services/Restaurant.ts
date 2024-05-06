import { firestore } from '@/core/firebase/firebase';

export const getRestaurants = async () => {
  try {
    const snapshot = await firestore.collection('restaurants').get();
    const restaurants = snapshot.docs.map((doc) => doc.data());
    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};