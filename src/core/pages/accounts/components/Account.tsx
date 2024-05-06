import React from 'react';
import styles from './Account.module.scss';
import Image from 'next/image';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

interface AccountProps {
  account: any; // Define a proper type for the account object
}

function Account({ account }: AccountProps) {
  const router = useRouter();
  function openDetails(uid: string) {
    router.push(`/accounts/${uid}`);
  }

  return (
    <div className={styles.accountRow}>
      <div className={styles.dbIndex}>{account.dbIndex}</div>
      <div className={styles.photoAndName}>
        <div className={styles.accountPhoto}>
          <Image width={100} height={100} src={account.photoURL || "https://d3g5ywftkpzr0e.cloudfront.net/wp-content/uploads/2023/07/13220529/Artificial-Intelligence-in-Indonesia-The-current-state-and-its-opportunities.jpeg"} alt='Account Photo' />
        </div>
        <div className={styles.username}>
          {account.username}
        </div>
      </div>
      <div className={styles.phoneNumber}>
        <i className="material-icons-outlined">contact_mail</i>
        <a href={account.phoneNumber}>{account.phoneNumber}</a>
      </div>
      <div className={styles.role}>
        <p>{(account.role.role).toUpperCase()}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={()=>{openDetails(account.uid)}}>
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
  );
}

export default Account;
