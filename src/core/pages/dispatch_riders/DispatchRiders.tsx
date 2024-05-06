"use client"
import React, { useEffect, useState } from 'react'
import Account from '../accounts/components/Account';
import { getListFrom } from '@/core/services/utils';
function DispatchRiders () {
    const [dispatchRiders, setDispatchRiders] = useState<any>([])
  
    useEffect(() => {
      const fetchUsers = async () => {
       const dR = await getListFrom('users')
       setDispatchRiders(dR.filter((user: any)=> {return user.role.role === 'dispatcher'}));
      }
      fetchUsers();
    }, []);
  
    return (
      <div>
        {dispatchRiders.map((user: any) => (
          <Account key={user.id} account={user} />
        ))}
      </div>
    );
}
export default DispatchRiders