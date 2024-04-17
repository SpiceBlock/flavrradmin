import React from 'react'
import styles from './Account.module.scss'
import Image from 'next/image'

function Account() {
  return (
    <div className={styles.accountRow}>
      <div className={styles.dbIndex}>1</div>
      <div className={styles.photoAndName}>
        <div className={styles.accountPhoto}>
          <Image width={100} height={100} src={"https://d3g5ywftkpzr0e.cloudfront.net/wp-content/uploads/2023/07/13220529/Artificial-Intelligence-in-Indonesia-The-current-state-and-its-opportunities.jpeg"} alt='Account Photo' />
        </div>
        <div className={styles.username}>
          clintanimbom
        </div>
      </div>
      <div className={styles.phoneNumber}>
        <i className="material-icons-outlined">contact_mail</i>
        <a href='679845'>680612360</a>
      </div>
      <div className={styles.role}>
        Admin
      </div>
      <div className={styles.actions}>
        <button>
          <i className="material-icons-outlined">
            visibility
          </i>
        </button>
        <button>
          <i className="material-icons-outlined">
            delete
          </i>
        </button>
        <button>
          <i className="material-icons-outlined">
            edit
          </i>
        </button>
      </div>
    </div>
  )
}

export default Account