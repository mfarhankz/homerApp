import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SidePanel from './SidePanel';
import MainContent from './MainContent';

export default function LandingPage() {
    const { user } = useAuth();

    return (
        <div className="flex min-h-screen">
            <div className='absolute top-4 left-4'><span className="text-homer-homer-34">homer</span></div>
            <MainContent user={user} />
        </div>
    );
}