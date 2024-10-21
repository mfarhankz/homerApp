import React from 'react';
import { motion } from 'framer-motion';

export default function MainContent({ user, isOpen }) {
    return (
        <motion.div
            className="p-4"
            style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
            }}
        // ... other props
        >
            <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-whitetext-3xl font-bold mb-4">Good afternoon, {user?.displayName || 'User'}</h1>
            <p className="mb-4">
                This is the main content area.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                        key={item}
                        className="p-4 rounded shadow"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        <h2 className="text-xl font-semibold mb-2">Card {item}</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>This is a sample card with some content.</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}