import React from "react";
import styles from "./RestaurantCard.module.scss";
import { Card, Typography, Divider } from "antd";

interface RestaurantProps {
  restaurant: any;
}

const { Title, Text } = Typography;

const RestaurantCard: React.FC<RestaurantProps> = ({ restaurant }) => {
  const isOpen = restaurant.isOpened;

  const openingTime = new Date(restaurant.openingTime?.toDate());
  const closingTime = new Date(restaurant.closingTime?.toDate());

  return (
    <Card className={styles.restaurantCard}>
      <div className={styles.restaurantDetails}>
        <Title level={4}>{restaurant.name}</Title>
        <Divider />
        <Text strong>Location:</Text>
        <Text> {restaurant.location.locationName}</Text>
        <Divider />
        <Text strong>Opening Hours:</Text>
        <Text> {formatTime(openingTime)} - {formatTime(closingTime)}</Text>
        <Divider />
        <Text strong>Phone Number:</Text>
        <Text>  {restaurant.phone}</Text>
        <Divider />
        <Text strong>Status:</Text>
        <Text className={isOpen ? styles.openStatus : styles.closedStatus}>
          {isOpen ? " OPEN" : " CLOSED"}
        </Text>
      </div>
    </Card>
  );
};

const formatTime = (time: Date) => {
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default RestaurantCard;
