import { firestore } from "../firebase/firebase";

export const getListFrom = async (collection: string) => {
    try {
        const snapshot = await firestore.collection(collection).get();
        const data = snapshot.docs.map((doc, index) => ({ dbIndex: index + 1, id: doc.id, ...doc.data() }));
        return data
    } catch (error) {
        console.error('Error Fetching Data')
        return []
    }
}

export const fetchUserData = async () => {
  const snapshot = await firestore.collection('users').get();
  const users = snapshot.docs.map(doc => doc.data());
  const totalUsers = users.length;
  const totalDispatchRiders = users.filter(user => user.role.role === "dispatcher").length;
  return { totalUsers, totalDispatchRiders };
};

export const fetchOrderData = async () => {
  const snapshot = await firestore.collection('orders').get();
  return snapshot.size;
};

export const fetchConfirmedOrders = async () => {
  const snapshot = await firestore.collection('orders').where('currentStatus', '==', 'confirmed').get();
  return snapshot.size;
};

export const fetchUnconfirmedOrders = async () => {
  const snapshot = await firestore.collection('orders').where('currentStatus', '==', 'unconfirmed').get();
  return snapshot.size;
};

export const fetchRestaurantData = async () => {
  const snapshot = await firestore.collection('restaurants').get();
  return snapshot.size;
};
