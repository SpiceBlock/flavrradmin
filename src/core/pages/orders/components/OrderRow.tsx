import React from "react";
import styles from "./OrderRow.module.scss";
import Link from "next/link";

interface OrderProps {
  order: any
}

function OrderRow({ order }: OrderProps) {
  return (
    <Link href={`/orders/${order.id}`}>
      <div className={styles.order}>
        <div className={styles.marker} style={{background: status === "Pending" ? 'red' : 'rgb(96, 23, 255)'}}/>
        <div className={styles.orderTitle}>
         {order.id}
        </div>
        <div className={styles.orderCategory}>
          <i className="material-icons-outlined">restaurant</i>
          <span>{order.restaurant}</span>
        </div>
        <div className={styles.requesterDetail}>
          <i className="material-icons-outlined">contact_mail</i>
          <span>{order.username}</span>
        </div>
        <div className={styles.dateAndTime}>
          <i className="material-icons-outlined">calendar_month</i>
          <span>{order.date}</span>
        </div>
        <div className={styles.location}>
          <i className="material-icons-outlined">location_on</i>
          <span>{order.restaurant}</span>
        </div>
        <div className={styles.reportTag}>
          {order.status}
        </div>
        <div className={styles.hashtag}>{order.dispatchRider}</div>
      </div>
    </Link>
  );
}

export default OrderRow;
