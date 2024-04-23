"use client"
import React, { useEffect, useState } from 'react'
import Account from '../accounts/components/Account';
import { firestore } from '@/core/firebase/firebase';
function DispatchRiders () {
    const [users, setUsers] = useState<any>([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const usersCollection = firestore.collection('users');
          const snapshot = await usersCollection.get();
          const usersData = snapshot.docs.map((doc, index) => ({ dbIndex: index+1, id: doc.id, ...doc.data() }));
          setUsers(usersData.filter((user: any)=> {return user.role.role === 'dispatcher'}));
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
export default DispatchRiders