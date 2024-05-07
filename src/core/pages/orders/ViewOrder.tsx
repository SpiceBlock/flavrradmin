"use client"
import React, { useEffect, useState } from 'react';
import { Descriptions, Spin, Image, Tag, Badge, Card, List } from 'antd';
import moment from 'moment';
import { getOrderById } from '@/core/services/Orders';

function ViewOrder() {
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pathname = window.location.pathname;
        const id = pathname.split('/').pop();

        const fetchOrder = async () => {
            try {
                const orderData = id && await getOrderById(id);

                setOrder(orderData);
                
                console.log(orderData);
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, []);

    if (loading) {
        return <Spin tip="Loading..." />;
    }

    if (!order) {
        return <div>Order not found.</div>;
    }

    const timeAgo = moment(order.created_at.toDate()).fromNow();
    const convertFirestoreTimestampToDate = (timestamp: any) => {
        if (!timestamp || !timestamp.seconds) return '';
        const { seconds, nanoseconds } = timestamp;
        const date = new Date(seconds * 1000 + nanoseconds / 1000000)
        return `${date}`;
    };


    const calculateTotalPrice = () => {
        let totalPrice = 0;
        order.meals.forEach((meal: any) => {
            totalPrice += parseInt(meal.price);
            if (meal.extras) {
                totalPrice += meal.extras.reduce(
                    (acc: any, extra: any) => acc + parseInt(extra.price),
                    0
                );
            }
        });
        return totalPrice;
    };

    return (<div className="order-details">
        <Descriptions bordered column={2} layout="vertical">
            <Descriptions.Item label="Order ID">
                {order.id}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
                <Tag color={order.currentStatus === 'confirmed' ? 'green' : 'warning'}>
                    {order.currentStatus}
                </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Delivery Address">
                {order.deliveryAddress.locationName}
            </Descriptions.Item>
            <Descriptions.Item label="Delivery Fee">
                {order.deliveryFee} {order.meals[0].currency}
            </Descriptions.Item>
            <Descriptions.Item label="Delivery Phone">
                {order.deliveryAddress.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Dispatcher Phone">
                {order.dispatcherPhone ? order.dispatcherPhone : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Total Price">
                {calculateTotalPrice()} {order.meals[0].currency}
            </Descriptions.Item>
            <Descriptions.Item label="Time Ago">
                {timeAgo}
            </Descriptions.Item>
            <Descriptions.Item label="Date And Time" span={2}>
                {convertFirestoreTimestampToDate(order.created_at)}
            </Descriptions.Item>
            <Descriptions.Item label="Customer Details" span={2}>
                <Card title="Customer Information">
                    <p>Username: <Tag color='blue'>{order.user.name}</Tag> </p>
                    <p>Phone Number: {order.user.phone}</p>
                    {/* Add more customer details if available in the order structure */}
                </Card>
            </Descriptions.Item>
            <Descriptions.Item label="Meals" span={2}>
                <List
                    itemLayout="horizontal"
                    dataSource={order.meals}
                    renderItem={(meal: any) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Image src={meal.imageUrl} alt={meal.name} width={100} />}
                                title={<span className="meal-name">{meal.name}</span>}
                                description={
                                    <div className="meal-info">
                                        <p className="meal-description">{meal.description}</p>
                                        <p className="meal-price">
                                            {meal.currency} {meal.price}
                                        </p>
                                        {meal.extras && meal.extras.length > 0 && (
                                            <div className="extras">
                                                <h4>Extras:</h4>
                                                <ul>
                                                    {meal.extras.map((extra: any) => (
                                                        <li key={extra.id}>
                                                            <span>{extra.name}</span> - {extra.price} FCFA
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        <p>Restaurant: {meal.restaurant.name}</p>
                                        <p>Location: {meal.restaurant.location.locationName}</p>
                                        <p>Phone Number: {meal.restaurant.location.phone}</p>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Descriptions.Item>
        </Descriptions>
    </div>
    );
}

export default ViewOrder;
