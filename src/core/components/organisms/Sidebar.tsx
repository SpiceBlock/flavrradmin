"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.scss";
import { SideBarItemInterface, items } from "@/core/constants/sidebaritems";

interface SideBarProps {}

async function shouldShowdot() {

}

function SideBarItem({ title, icon, link }: SideBarItemInterface) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [shouldShowDot, setShouldShowDot] = useState(false)

  useEffect(() => {
    setActive(!!window.location.href.includes(link));
  }, [window.location.href]);

  function action() {
    router.push(link);
  }

  return (
    <div
      className={`${styles.sidebaritem} ${active && styles.sidebaritemactive}`}
      onClick={action}
    >
      {shouldShowDot && <div className={styles.notificationdot} />}
      <div className={styles.sidebaritemicon}>
        <i className="material-icons-outlined">{icon}</i>
      </div>
      <div className={styles.sidebaritemtitle}>{title}</div>
    </div>
  );
}

function SideBar() {
  return (
    <div className={styles.sidebarmain}>
      {items.map((item, index) => {
        return (
          <SideBarItem
            title={item.title}
            icon={item.icon}
            link={item.link}
            adminItem={item.adminItem}
          />
        );
      }) 
    }
    </div>
  );
}

export default SideBar;
