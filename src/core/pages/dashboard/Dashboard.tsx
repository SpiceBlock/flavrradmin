'use client'
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import styles from './Dashboard.module.scss'; // Import Sass file for styling
import { fetchUserData, fetchOrderData, fetchConfirmedOrders, fetchUnconfirmedOrders, fetchRestaurantData } from '../../services/utils'
import CountCard from './components/CountCard';
import Loading from '@/core/components/atoms/Loading';
import { Spin } from 'antd';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [confirmedOrderCount, setConfirmedOrderCount] = useState<number>(0);
  const [unconfirmedOrderCount, setUnconfirmedOrderCount] = useState<number>(0);
  const [restaurantCount, setRestaurantCount] = useState<number>(0);
  const [dispatchRiderCount, setDispatchRiderCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      setUserCount(userData.totalUsers);
      setDispatchRiderCount(userData.totalDispatchRiders);
      const orderData = await fetchOrderData();
      setOrderCount(orderData);
      const confirmedOrderData = await fetchConfirmedOrders();
      setConfirmedOrderCount(confirmedOrderData);
      const unconfirmedOrderData = await fetchUnconfirmedOrders();
      setUnconfirmedOrderCount(unconfirmedOrderData);
      const restaurantData = await fetchRestaurantData();
      setRestaurantCount(restaurantData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.dashboard_container}>
      {loading ? (
       <Spin tip="Loading..." />
      ) : (
        <>
          <div className={styles.countCards}>
            <Link href={"/orders"}>
            <CountCard name='Total Orders' icon='shopping_cart' count={orderCount} />
            </Link>
            <Link href={"/orders"}>
            <CountCard name='Confirmed Orders' icon='shopping_cart' count={confirmedOrderCount} />
            </Link>
            <Link href={"/orders"}>
            <CountCard name='Unconfirmed Orders' icon='shopping_cart' count={unconfirmedOrderCount} />
            </Link>
            <Link href={"/accounts"}> 
            <CountCard name='Users' icon='group' count={userCount} />
            </Link>
            <Link href={"restaurants"}>
            <CountCard name='Restaurants' icon='restaurant' count={restaurantCount} />
            </Link>
            <Link href={"dispatch-riders"}>
            <CountCard name='Dispatch Riders' icon='local_shipping' count={dispatchRiderCount} />
            </Link>
          </div>
          <div className={styles.charts}>
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Order Status', 'Number of Orders'],
                ['Confirmed', confirmedOrderCount],
                ['Unconfirmed', unconfirmedOrderCount],
              ]}
              options={{
                title: 'Order Status Distribution',
                hAxis: { title: 'Order Status', titleTextStyle: { color: '#333' } },
                vAxis: { minValue: 0 },
              }}
            />
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Role', 'Number of Users'],
                ['Customers', userCount - dispatchRiderCount],
                ['Dispatch Riders', dispatchRiderCount],
              ]}
              options={{
                title: 'User Roles',
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
