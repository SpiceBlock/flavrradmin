'use client'
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from './Dashboard.module.scss'; // Import Sass file for styling
import { firestore } from '@/core/firebase/firebase';
import CountCard from './components/CountCard';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<number>(0);
  const [orderData, setOrderData] = useState<number>(0);
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

  useEffect(() => {
    // Create charts using Chart.js
    const userChartCtx = document.getElementById('userChart') as HTMLCanvasElement;


    if (userChart) {
      userChart.destroy();
    }

    userChart = new Chart(userChartCtx, {
      type: 'bar',
      data: {
        labels: ['Users', 'Orders', 'Restaurants', 'Dispatch Riders'],
        datasets: [{
          label: 'Data',
          data: [userData, orderData, restaurantData, dispatchRiderData],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      userChart.destroy();
    };
  }, [userData, orderData, restaurantData, dispatchRiderData]);

  return (
    <div className={styles.dashboard_container}>
      <div className={styles.countCards}>
      <CountCard name='Orders' icon='shopping_cart' count={orderData} />
      <CountCard name='Users' icon='group' count={userData} />
      <CountCard name='Restaurants' icon='restaurant' count={restaurantData} />
      <CountCard name='Dispatch Riders' icon='local_shipping' count={dispatchRiderData} />
      </div>
      <canvas id="userChart" className='canvas'></canvas>
    </div>
  );
};

export default Dashboard;
