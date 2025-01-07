import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function RootLayout() {
    const user = {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
    };

    const handleSignOut = () => {
        // Implement sign out logic here
        console.log('Sign out clicked');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header user={user} onSignOut={handleSignOut} />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-gray-200 py-4">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    © {new Date().getFullYear()} Your App Name
                </div>
            </footer>
        </div>
    );
}