import React from 'react';

export default function MainContent({ user, isOpen }) {
    return (
        <div className="p-4">
            <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-whitetext-3xl font-bold mb-4">Good afternoon, {user?.displayName || 'User'}</h1>
            <p className="mb-4">
                This is the main content area.
            </p>
        </div>
    );
}