import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SidePanel from './SidePanel';
import MainContent from './MainContent';

export default function LandingPage() {
    const { user } = useAuth();

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SidePanel />
            <div className="flex-1 ml-[70px]">
                <MainContent user={user} />
            </div>
        </div>
    );
}