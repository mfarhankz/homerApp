import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import RootLayout from './layout';
import SignIn from './pages/SignIn/signin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route element={<RootLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    {/* Add more routes that should use RootLayout here */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
