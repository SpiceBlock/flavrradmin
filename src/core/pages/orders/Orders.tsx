"use client"
import { useEffect, useState } from "react";
import OrderRow from "./components/OrderRow";
import { firestore } from "@/core/firebase/firebase";

// Define the type for the order object
interface Order {
  id: string; // Change the type of id to string
  username: string;
  date: string;
  restaurant: string;
  status: string;
  dispatchRider: string;
  location: string
}

export default function Orders() {
    const [formattedOrders, setFormattedOrders] = useState<Order[]>([]);

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const ordersSnapshot = await firestore.collection('orders').get();
          const ordersData = ordersSnapshot.docs.map(doc => {
            const orderData = doc.data();
            return {
              id: doc.id, // Use Firestore document ID as the id
              username: orderData.user.name,
              date: orderData.created_at.toDate().toLocaleString(),
              restaurant: orderData.meals[0].restaurantName,
              status: orderData.currentStatus,
              dispatchRider: orderData.dispatchRider,
              location: orderData.pickUpAddress.locationName
            };
          });
  
          setFormattedOrders(ordersData);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
  
      fetchOrders();
    }, []);

    return (
        <div>
            {
                formattedOrders.map((order) => {
                    return (
                            <OrderRow key={order.id} order={order} />
                    )
                })
            }
        </div>
    )
}
