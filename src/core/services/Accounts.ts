import { firestore } from "../firebase/firebase";

export const getUserById = async (id: string): Promise<any | null> => {
    try {
        const userDoc = await firestore.collection('users').doc(id).get();
        if (userDoc.exists) {
            return userDoc.data();
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
    return null;
};