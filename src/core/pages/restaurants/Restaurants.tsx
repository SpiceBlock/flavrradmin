"use client"
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input } from 'antd';
import RestaurantCard from './components/RestaurantCard';
import { getRestaurants } from '@/core/services/Restaurant';

interface Restaurant {
    id: string;
    name: string;
    locationName: string;
    openingTime: string;
    closingTime: string;
    phone: string;
    isOpened: boolean;
}

const Restaurants: React.FC = () => {
    const [restaurants, setRestaurants] = useState<any>([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchRestaurantsData = async () => {
            const restaurantData = await getRestaurants();
            setRestaurants(restaurantData);
            setFilteredRestaurants(restaurantData); // Initialize filtered restaurants with the fetched data
        };
        fetchRestaurantsData();
    }, []);

    // Search functionality
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = restaurants.filter((restaurant: any) =>
            restaurant.name.toLowerCase().includes(term) ||
            restaurant.location.locationName.toLowerCase().includes(term) ||
            (restaurant.isOpened ? 'open' : 'closed').includes(term)
        );
        setFilteredRestaurants(filtered);
    };


    return (
        <div>
            <Input
                type="text"
                placeholder="Search by name or location"
                value={searchTerm}
                onChange={handleSearch}
            />
            <br />
            <br />
            {filteredRestaurants.map((restaurant: any) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
    );
};

export default Restaurants;
