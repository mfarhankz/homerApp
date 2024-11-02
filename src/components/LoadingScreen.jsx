const LoadingScreen = ({ neighborhood }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-16 h-16 border-4 border-coral-500 border-t-transparent rounded-full animate-spin" />
        <div className="space-y-2 text-center">
            <h2 className="text-xl text-blue-900 font-semibold">
                Retrieving listings in {neighborhood}...
            </h2>
            <p className="text-gray-500">Fetching key metrics...</p>
            <p className="text-gray-400">Preparing your customized report...</p>
        </div>
    </div>
);

export default LoadingScreen;