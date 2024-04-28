// Types
export type DeliveryAddress = {
    createdAt: string;
    id: string;
    isApproved: boolean;
    latitude: number;
    locationName: string;
    longitude: number;
    phone: string;
    user_id: string;
    restaurantId: string;
};

export type Meal = {
    category: string;
    created_at: string;
    currency: string;
    description: string;
    extras: any[]; // You can define a type for extras if needed
    id: string;
    imageUrl: string;
    name: string;
    price: string;
    quantity: number;
};

export type Restaurant = {
    closingTime: string;
    costPerKm: number;
    country: {
        currencyCode: string;
        currencyName: string;
        flag: string;
        name: string;
        created_at: string;
        description: string;
        email: string;
        id: string;
        imageUrl: string;
        isOpened: boolean;
        location: {
            createdAt: string;
            id: string;
            isApproved: boolean;
            latitude: number;
            locationName: string;
            longitude: number;
            phone: string;
            user_id: string;
            name: string;
            openingTime: string;
            restaurantId: string;
            status: string;
            updated_at: string;
            userId: string;
        };
    };
};

export type PickUpAddress = {
    createdAt: string;
    id: string;
    isApproved: boolean;
    latitude: number;
    locationName: string;
    longitude: number;
    phone: string;
    user_id: string;
    restaurantId: string;
};

type OrderStatus = string[];

export type User = {
    imageUrl: string;
    name: string;
    phone: string;
    userId: string;
};

// Data
export const order = {
    canDispatch: true,
    created_at: "March 28, 2024 at 12:20:55 PM UTC+1",
    currentStatus: "confirmed",
    deliveryAddress: {
        createdAt: "2024-01-10T21:07:25.642410",
        id: "df7bf2a0-aff3-11ee-aea3-7baf3befdbed",
        isApproved: false,
        latitude: 4.065076599999999,
        locationName: "École Publique de Deïdo, Douala, Cameroon",
        longitude: 9.7161262,
        phone: "+237670912935",
        user_id: "cae86510-9ab5-11ee-a8ad-656bb54b20f3",
        restaurantId: "ef82f92a-61a2-4f5a-b262-934c81508ec2"
    } as DeliveryAddress,
    meals: [
        {
            category: "Snacks",
            created_at: "March 28, 2024 at 12:20:45 PM UTC+1",
            currency: "FCFA",
            description: "Burger and one bottle of D'jino",
            extras: [], // Fill this with actual data if needed
            id: "672bbe70-b0c5-11ee-9651-49e408f00ad0",
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/chopapp-563fb.appspot.com/o/meals%2F672bbe70-b0c5-11ee-9651-49e408f00ad0?alt=media&token=0ffd879a-9d5f-4318-a303-5cbf94b0bd57",
            name: "Burger",
            price: "2000",
            quantity: 1
        } as Meal,
        // Add other meal objects here
    ],
    pickUpAddress: {
        createdAt: "2024-01-10T21:07:25.642410",
        id: "df7bf2a0-aff3-11ee-aea3-7baf3befdbed",
        isApproved: false,
        latitude: 4.065076599999999,
        locationName: "École Publique de Deïdo, Douala, Cameroon",
        longitude: 9.7161262,
        phone: "+237670912935",
        user_id: "cae86510-9ab5-11ee-a8ad-656bb54b20f3",
        restaurantId: "ef82f92a-61a2-4f5a-b262-934c81508ec2"
    } as PickUpAddress,
    status: ["pending", "confirmed"] as OrderStatus,
    totalPrice: "5,000",
    updated_at: "March 28, 2024 at 12:22:11 PM UTC+1",
    user: {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/chopapp-563fb.appspot.com/o/users%2FkOb5MfdVRMRrjgTu8yrG6mBTm6X2?alt=media&token=3a76d2b2-3ae7-41cc-bfdc-11190e9d283e",
        name: "yunwen",
        phone: "+237670912936",
        userId: "kOb5MfdVRMRrjgTu8yrG6mBTm6X2"
    } as User
};
