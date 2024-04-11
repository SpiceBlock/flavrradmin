import React from 'react';
import styles from './AppWrapper.module.scss'
import Navbar from '../components/organisms/Navbar';
import Sidebar from '../components/organisms/Sidebar';


let viewHeight: string

if (typeof window !== "undefined") {
  viewHeight = `calc(${window.innerHeight}px - 10px)`
} else {
  viewHeight = `calc(100vh - 10px)`
}

const AppWrapper = (Page: any, title: string): any => {
  async function AppPage() {

    return (
      <div className={styles.mainApp} style={{ height: viewHeight }}>
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