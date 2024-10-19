import { BarChart, Download } from 'lucide-react'

export default function Dashboard() {
    return (
        <div className="px-4 sm:px-0">
            {/* Dashboard Summary */}
            <div className="py-6">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Average Rental Price Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Average Rental Price
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                $1,850
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-700 hover:text-blue-900">
                                    View all
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Active Listings Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Active Listings
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                245
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-700 hover:text-blue-900">
                                    View all
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Average Days on Market Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Average Days on Market
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                32
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-700 hover:text-blue-900">
                                    View all
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Placeholder */}
            <div className="py-6">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                    <BarChart className="h-16 w-16 text-gray-400" />
                    <span className="ml-2 text-gray-500">Average Listing Price Chart</span>
                </div>
            </div>

            {/* Report Generator */}
            <div className="py-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <select id="city" name="city" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            <option>New York</option>
                            <option>Los Angeles</option>
                            <option>Chicago</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">Amenities</label>
                        <select id="amenities" name="amenities" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            <option>Pool</option>
                            <option>Gym</option>
                            <option>Parking</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="property-type" className="block text-sm font-medium text-gray-700">Property Type</label>
                        <select id="property-type" name="property-type" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            <option>House</option>
                            <option>Apartment</option>
                            <option>Condo</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6">
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Generate Report
                        <Download className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    )
}