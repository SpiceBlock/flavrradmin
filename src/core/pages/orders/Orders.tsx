"use client"

import { useEffect, useState } from "react";
import { Input } from "antd";
import OrderRow from "./components/OrderRow";
import { fetchOrders } from "@/core/services/Orders";

export default function Orders() {
    const [orders, setOrders] = useState<any>([]);
    const [filteredOrders, setFilteredOrders] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchOrdersData = async () => {
            const ordersData = await fetchOrders();
            setOrders(ordersData);
            setFilteredOrders(ordersData);
        };
    
        fetchOrdersData();
    }, []);

    // Search functionality
    useEffect(() => {
        const filtered = orders.filter((order:any) => {
            const searchableAttributes = [
                order.username,
                order.date,
                order.restaurant,
                order.status,
                order.locationName,
                order.phone,
                order.deliveryAddress?.locationName,
                order.pickUpAddress?.locationName,
                order.user?.name,
                order.user?.phone
            ];
            return searchableAttributes.some(attr => attr?.toLowerCase().includes(searchTerm.toLowerCase()));
        });
        setFilteredOrders(filtered);
    }, [searchTerm, orders]);

    return (
        <div>
            <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {
                filteredOrders.map((order: any) => (
                    <OrderRow key={order.id} order={order} />
                ))
            }
        </div>
    );
}
