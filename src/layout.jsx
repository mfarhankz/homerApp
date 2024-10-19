import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export default function RootLayout() {
    const user = {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
    };

    const handleSignOut = () => {
        // Implement sign out logic here
    };

    return (
        <div className="flex flex-col min-h-screen w-screen">
            <Header user={user} onSignOut={handleSignOut} />
            <main className="flex-grow w-full">
                <Outlet />
            </main>
        </div>
    )
}
