import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, UserCircle, Settings, LogOut, Sun, Moon, ChevronUp, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeProvider';

export default function SidePanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    const navItems = [
        { name: 'Generate Report', icon: LayoutDashboard },
        { name: 'Clients', icon: UserCircle },
        { name: 'Settings', icon: Settings },
    ];

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <motion.div
            className="fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col"
            initial={{ width: '70px' }}
            animate={{
                width: isOpen ? '256px' : '70px',
                transition: { duration: 0.3, ease: "easeInOut" }
            }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => {
                setIsOpen(false);
                setIsUserMenuOpen(false);
            }}
        >
            <div className="flex-grow p-4">
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

            <div className="mt-auto">
                <div className="w-full h-px bg-gray-600"></div>
                <div className="relative">
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-gray-700 transition-colors duration-200"
                    >
                        <div className="flex items-center">
                            <img
                                src="https://i.pravatar.cc/300?height=32&width=32"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            {isOpen && <span className='text-sm'>{user?.displayName || 'User'}</span>}
                        </div>
                        {isOpen && (isUserMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                    </button>

                    {isOpen && isUserMenuOpen && (
                        <div className="absolute bottom-full left-0 w-full bg-gray-700 rounded-t-md shadow-lg py-1">
                            <div className="px-4 py-2 text-md text-gray-200">{user?.userName}</div>
                            <div className="w-full h-px bg-gray-600"></div>
                            <div className="px-4 py-2 text-sm text-gray-300">Preferences</div>
                            <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-600 transition-colors duration-200">
                                <span>Theme</span>
                                <button onClick={toggleTheme} className="flex items-center">
                                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                </button>
                            </div>
                            <button
                                className="flex items-center w-full text-left py-2 px-4 hover:bg-gray-600 transition-colors duration-200"
                                onClick={() => setIsUserMenuOpen(false)}
                            >
                                Language
                            </button>
                            <div className="w-full h-px bg-gray-600"></div>
                            <button
                                className="flex items-center w-full text-left py-2 px-4 hover:bg-gray-600 transition-colors duration-200"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-5 h-5 mr-2" /> Sign Out
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </motion.div>
    );
}