import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export default function RootLayout() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </>
    )
}
