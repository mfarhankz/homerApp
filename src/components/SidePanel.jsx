import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, UserCircle, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SidePanel() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    const navItems = [
        { name: 'Generate Report', icon: LayoutDashboard },
        { name: 'Clients', icon: UserCircle },
        { name: 'Settings', icon: Settings },
    ];

    return (
        <motion.div
            className="fixed top-0 left-0 h-full bg-gray-800 text-white"
            initial={{ width: '70px' }}
            animate={{
                width: isOpen ? '256px' : '70px',
                transition: { duration: 0.3, ease: "easeInOut" }
            }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="p-4">
                <div className="mb-8">
                    <img src="/public/images/homer.jpg?height=40&width=40" alt="Logo" className="w-10 h-10 mx-auto" />
                </div>
                <nav>
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a
                                    href="#"
                                    className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-200"
                                >
                                    <item.icon className={`${isOpen ? 'w-6 h-6' : 'w-8 h-8'} transition-all duration-200`} />
                                    {isOpen && <span className="ml-4">{item.name}</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center space-x-2">
                    <img
                        src="https://i.pravatar.cc/300?height=32&width=32"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    {isOpen && <span>{user?.name || 'User'}</span>}
                </div>
                {isOpen ? (
                    <div className="mt-2 space-y-1">
                        <button className="flex items-center w-full text-left py-1 px-2 hover:bg-gray-700 rounded transition-colors duration-200">
                            <UserCircle className="w-5 h-5 mr-2" />
                            Profile Settings
                        </button>
                        <button
                            className="flex items-center w-full text-left py-1 px-2 hover:bg-gray-700 rounded transition-colors duration-200"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button
                        className="mt-2 w-full text-left py-1 px-2 hover:bg-gray-700 rounded transition-colors duration-200"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                )}
            </div>
        </motion.div>
    );
}
