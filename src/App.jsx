import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layout';
import SignIn from './pages/SignIn/signin';
import LandingPage from './pages/SignIn/Landing/LandingPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route element={<RootLayout />}>
                    <Route path="/landing" element={<LandingPage />} />
                    {/* Add more routes that should use RootLayout here */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
