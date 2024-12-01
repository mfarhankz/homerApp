import { Outlet } from 'react-router-dom'
const ClientLayout = () => {
    return (
        <div className="min-h-screen">
            <div className='absolute top-4 left-4 z-50'>
                <span className="text-homer-homer-34">homer</span>
            </div>

            {/* Main Content Area */}
            <main className="w-full max-w-7xl mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
};

export default ClientLayout;