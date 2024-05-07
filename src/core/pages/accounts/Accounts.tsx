'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input, Spin } from 'antd'; // Import the Input component from antd
import Account from './components/Account';
import { getListFrom } from '@/core/services/utils';

interface User {
    dbIndex: number;
    created_at: string;
    email: string | null;
    emailVerified: boolean | null;
    last_signIn: string;
    otpCode: string | null;
    password: string | null;
    phoneNumber: string;
    photoURL: string | null;
    providerId: string;
    role: {
        role: string;
        value: string;
    };
    token: string;
    uid: string;
    username: string;
}

function Accounts() {
    const [users, setUsers] = useState<any>([]);
    const [filteredUsers, setFilteredUsers] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            const userList = await getListFrom('users');
            setUsers(userList);
            setFilteredUsers(userList);
            setLoading(false) // Initialize filtered users with the fetched data
        };
        fetchUsers();
    }, []);

    if(loading) {
        return (
            <Spin tip="Loading..." />
        )
    }

    // Search functionality
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = users.filter((user:any) => 
            user.username.toLowerCase().includes(term) ||
            user.email?.toLowerCase().includes(term) ||
            user.phoneNumber.includes(term) ||
            user.role.role.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
    };

    return (
        <div>
            <Input
                type="text"
                placeholder="Search by username, email, phone number, or role"
                value={searchTerm}
                onChange={handleSearch}
            />
            {filteredUsers.map((user:any) => (
                <Account key={user.uid} account={user} />
            ))}
        </div>
    );
}

export default Accounts;
