'use client'
import React, { useEffect, useState } from 'react'; // Implement a function to fetch user details by ID
import styles from './ViewAccount.module.scss'; // Import module.scss file for styling
import { getUserById } from '@/core/services/Accounts';

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

const UserDetailPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const pathname = window.location.pathname;
        const id = pathname.split('/').pop();
        console.log('User ID:', id);
    
        // Fetch user details using the ID
        const fetchUser = async () => {
            const userData = await getUserById(id? id : '');
            setUser(userData);
        };
        fetchUser();
    }, []);

    if (!user) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles['user-detail-container']}>
            <div className={styles['user-header']}>
                <h2>User Details</h2>
                {user.photoURL && <img src={user.photoURL} alt="User" className={styles['user-avatar']} />}
            </div>
            <div className={styles['user-info']}>
                <h3>Basic Information</h3>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email || 'N/A'}</p>
            </div>
            <div className={styles['user-contact']}>
                <h3>Contact Information</h3>
                <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            </div>
            <div className={styles['user-role']}>
                <h3>Role</h3>
                <p>{user.role.role}</p>
            </div>
        </div>
    );
};

export default UserDetailPage;
