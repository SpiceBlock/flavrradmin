import React from 'react';
import styles from './AppWrapper.module.scss'
import Navbar from '../components/organisms/Navbar';
import Sidebar from '../components/organisms/Sidebar';
import { auth } from '../firebase/firebase';
import { redirect } from 'next/navigation';



const AppWrapper = (Page: any, title: string): any => {
  async function AppPage() {

    // Server-side authentication 
    const currentUser = await new Promise((resolve) => {
      auth.onAuthStateChanged((user) => resolve(user));
    });

    return (
      <div className={styles.mainApp}  >
        <Navbar />
        <Sidebar />
        <div className={styles.page}>
          <h1 className={styles.headertitle}>{title}</h1>
          <Page />
        </div>
      </div>
    )
  }
  return AppPage;
}

export default AppWrapper