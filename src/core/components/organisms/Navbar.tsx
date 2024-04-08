"use client"
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../atoms/Logo";
interface NavbarProps {
}

function Navbar({}: NavbarProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unseenNotificationsCount, setUnseenNotificationsCount] = useState<number>(0);

  useEffect(()=>{
    async function getNotifications() {}
    getNotifications()
  },[])

  return (
    <div className={styles.navbarmain}>
      <div className={styles.navlogosection}>
        <Logo />
      </div>
      <div className={styles.detailssection}>
        <div className={styles.notificationicon}>
          {unseenNotificationsCount > 0 ? <div className={styles.notificationdot} /> : ''}
          <i className="material-icons-outlined">notifications</i>
        </div>
        <Link href={"/app/profile"}>
          <div className={styles.accountcircle}>
            
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
