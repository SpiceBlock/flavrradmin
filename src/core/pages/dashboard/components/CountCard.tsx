import React, { ReactHTMLElement } from 'react'
import styles from './CountCard.module.scss'

interface countCardProps {
    name: string
    count: number
    icon: string
}

function CountCard({name, count, icon}: countCardProps) {
  return (
        <div className={styles.card}>
            <div className={styles.boxIconDiv}>
            <i className="material-icons-outlined">{icon}</i>
            </div>
            <div className={styles.boxTextDiv}>
              <div className={styles.boxtitle}>{name.toUpperCase()}</div>
              <div className={styles.boxcount}>{count}</div>
            </div>
        </div>
  )
}

export default CountCard