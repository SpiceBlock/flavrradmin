import React from 'react';
import styles from './AppWrapper.module.scss'
import Navbar from '../components/organisms/Navbar';
import Sidebar from '../components/organisms/Sidebar';
import { redirect } from 'next/navigation';
import { useAuth } from '../hooks/AuthContext';
import { auth } from '../firebase/firebase';



const AppWrapper = (Page: any, title: string): any => {
  const currentUser = auth.onAuthStateChanged((user) => {return user})
    console.log(currentUser)
    if (!currentUser) {
      redirect('/login');
    } 
  async function AppPage() {
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