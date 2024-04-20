"use client"
import React, { useState, useEffect } from 'react';
import Account from './components/Account';
import { firestore } from '@/core/firebase/firebase';

function Accounts() {
    const [users, setUsers] = useState<any>([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const usersCollection = firestore.collection('users');
          const snapshot = await usersCollection.get();
          const usersData = snapshot.docs.map((doc, index) => ({ dbIndex: index+1, id: doc.id, ...doc.data() }));
          setUsers(usersData);
          console.log(usersData)
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    return (
      <div>
        {users.map((user: any) => (
          <Account key={user.id} account={user} />
        ))}
      </div>
    );
  }
  
  export default Accounts;
  