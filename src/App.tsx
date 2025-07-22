import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/authPages/Login";
import Register from "./pages/authPages/Register";
import { AuthProvider } from "./context/authContext";
import Home from "./pages/home";
import PrivateRoute from "./lib/PrivateRoutes";

function App() {
  return (

    <AuthProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;