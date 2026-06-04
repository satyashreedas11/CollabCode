import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import RequireAuth from "./components/auth/RequireAuth"
import Toast from "./components/toast/Toast"
import EditorPage from "./pages/EditorPage"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import LandingPage from "./pages/LandingPage"

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<AuthPage />} />
                    <Route
                        path="/app"
                        element={
                            <RequireAuth>
                                <HomePage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/editor/:roomId"
                        element={
                            <RequireAuth>
                                <EditorPage />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </Router>
            <Toast /> {/* Toast component from react-hot-toast */}
        </>
    )
}

export default App
