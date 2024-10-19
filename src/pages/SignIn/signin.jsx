import { useState } from 'react';
import { motion } from 'framer-motion';
import validator from 'validator';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validator.isEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            console.log('Login attempt:', email, password);
            // Proceed with login logic here
        }
    };

    return (
        <div className="absolute inset-0 w-screen h-screen bg-gray-100 flex flex-col items-center justify-center">
            <motion.h1 
                className="text-4xl font-bold text-center mb-8 text-blue-600"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                HOMER
            </motion.h1>
            <motion.div 
                className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="mb-6 text-2xl font-bold text-center">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <motion.div 
                        className="mb-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                    </motion.div>
                    <motion.div 
                        className="mb-6"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
                    </motion.div>
                    <motion.button
                        type="submit"
                        className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Sign In
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
