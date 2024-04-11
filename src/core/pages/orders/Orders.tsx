"use client"
import OrderRow from "./components/OrderRow";


const randomOrders = [
    {
        id: "AB23CD45",
        username: "Alice",
        date: "08 March 2023",
        restaurant: "Pizza Palace",
        status: "Preparing",
        dispatchRider: "Michael"
    },
    {
        id: "FG78HI90",
        username: "Bob",
        date: "21 February 2024",
        restaurant: "Noodle Nirvana",
        status: "Delivered",
        dispatchRider: "Sarah"
    },
    {
        id: "JK12LM34",
        username: "Charlie",
        date: "15 October 2022",
        restaurant: "Burger Barn",
        status: "Cancelled",
        dispatchRider: "unassigned"
    },
    {
        id: "MN56OP78",
        username: "David",
        date: "10 April 2024", // Today's date!
        restaurant: "Taco Fiesta",
        status: "Received",
        dispatchRider: "unassigned"
    },
    {
        id: "PQ90RS12",
        username: "Eve",
        date: "12 January 2024",
        restaurant: "Sushi Delight",
        status: "Out for Delivery",
        dispatchRider: "Emily"
    },
    {
        id: "TU12VW34",
        username: "Frank",
        date: "03 December 2023",
        restaurant: "Falafel Frenzy",
        status: "Completed",
        dispatchRider: "John"
    },
    {
        id: "WX34YZ56",
        username: "Grace",
        date: "17 September 2023",
        restaurant: "Indian Curry House",
        status: "Payment Pending",
        dispatchRider: "unassigned"
    },
    {
        id: "ZA56BC78",
        username: "Henry",
        date: "01 June 2023",
        restaurant: "Coffee Corner",
        status: "Preparing",
        dispatchRider: "unassigned"
    },
    {
        id: "CD89EF01",
        username: "Isla",
        date: "25 November 2023",
        restaurant: "Healthy Bowls",
        status: "Delivered",
        dispatchRider: "David"
    },
    {
        id: "EF01GH23",
        username: "Jack",
        date: "04 March 2024",
        restaurant: "Pasta Paradise",
        status: "Confirmed",
        dispatchRider: "unassigned"
    }
];


export default function Orders() {
    return (
        <div>
            {
                randomOrders.map((order) => {
                    return (
                            <OrderRow order={order} />
                    )
                })
            }
        </div>
    )
}