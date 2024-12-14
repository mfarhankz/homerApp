const LoadingScreen = ({ neighborhood, onCancel, overlay = false }) => {
    if (overlay) {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/20 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            {/* Loading content */}
                            <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 border-3 border-coral-500 border-t-transparent rounded-full animate-spin" />
                                <div>
                                    <h2 className="text-blue-900 font-semibold text-center">
                                        Applying your changes {neighborhood}, please wait ...
                                    </h2>                              
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            {/* Loading content */}
            <div className="flex flex-col items-center space-y-6">
                <div className="w-16 h-16 border-4 border-coral-500 border-t-transparent rounded-full animate-spin" />
                <div className="space-y-2 text-center">
                    <h2 className="text-xl text-blue-900 font-semibold">
                        Retrieving listings in {neighborhood}...
                    </h2>
                    <p className="text-gray-500">Fetching key metrics...</p>
                    <p className="text-gray-400">Preparing your customized report...</p>
                </div>
            </div>

            {/* Cancel button */}
            <button
                onClick={onCancel}
                className="flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors mt-8"
            >
                <span>Cancel</span>
            </button>
        </div>
    );
};

export default LoadingScreen;