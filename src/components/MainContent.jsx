import React from 'react';

export default function MainContent({ user }) {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Good afternoon, {user?.name || 'User'}</h1>
            <p className="mb-4">
                This is the main content area. You can add your dashboard components,
                charts, tables, or any other content here.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">Card {item}</h2>
                        <p>This is a sample card with some content.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}