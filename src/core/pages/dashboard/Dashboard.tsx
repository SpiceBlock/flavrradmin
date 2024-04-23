'use client'
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import styles from './Dashboard.module.scss'; // Import Sass file for styling
import { firestore } from '@/core/firebase/firebase';
import CountCard from './components/CountCard';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<number>(0);
  const [orderData, setOrderData] = useState<number>(0);
  const [ordersData, setOrdersData] = useState([]);
  const [restaurantData, setRestaurantData] = useState<number>(0);
  const [dispatchRiderData, setDispatchRiderData] = useState<number>(0);
  let userChart: Chart;

  useEffect(() => {
    // Fetch data for the number of users
    firestore.collection('users').get().then(snapshot => {
      const users = snapshot.docs.map(doc => doc.data());
      const totalUsers = users.length;
      const totalDispatchRiders = users.filter(user => user.role.role === "dispatcher").length;

      setUserData(totalUsers);
      setDispatchRiderData(totalDispatchRiders);
    });

    // Fetch data for the number of orders
    firestore.collection('orders').get().then(snapshot => {
      setOrderData(snapshot.size);
    });

    // Fetch data for the number of restaurants
    firestore.collection('restaurants').get().then(snapshot => {
      setRestaurantData(snapshot.size);
    });
  }, []);

  const prepareChartData = () => {
    const data = [['Date', 'Number of Orders']];
    // Process orders and aggregate them by date
    const ordersByDate: any = {};
    ordersData.forEach((order: any) => {
      const timeOfOrder = order.created_at.toDate()
      const date = timeOfOrder.toISOString().split('T')[0]; // Get date string (YYYY-MM-DD)
      console.log(order)
      if (!ordersByDate[date]) {
        ordersByDate[date] = 1;
      } else {
        ordersByDate[date]++;
      }
    });
    // Convert aggregated data to array format suitable for the chart
    Object.keys(ordersByDate).forEach(date => {
      data.push([date, ordersByDate[date]]);
    });
    return data;
  };


  return (
    <div className={styles.dashboard_container}>
      <div className={styles.countCards}>
        <CountCard name='Orders' icon='shopping_cart' count={orderData} />
        <CountCard name='Users' icon='group' count={userData} />
        <CountCard name='Restaurants' icon='restaurant' count={restaurantData} />
        <CountCard name='Dispatch Riders' icon='local_shipping' count={dispatchRiderData} />
      </div>
      <div className={styles.charts}>
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Role', 'Number of Users'],
            ['Customers', userData - dispatchRiderData],
            ['Dispatch Riders', dispatchRiderData],
          ]}
          options={{
            title: 'User Roles',
          }}
        />
            
      </div>
    </div>
  );
};

export default Dashboard;
