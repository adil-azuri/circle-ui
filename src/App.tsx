import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/authContext";
import Home from "./pages/home";
import PrivateRoute from "./lib/PrivateRoutes";
import { All_Thread } from "./pages/main_pages/Center_All_Thread";
import { Detail_thread } from "./pages/main_pages/Center_Detail_Thread";
import { SnackBarProvider } from "@/context/SnackBarContext";

function App() {
  return (

    <AuthProvider>
      <SnackBarProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/home" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }>
              <Route index element={<All_Thread />} />
              <Route path="threads/:id" element={<Detail_thread />} />
            </Route>
          </Routes>
        </BrowserRouter>

      </SnackBarProvider>
    </AuthProvider>
  );
}

export default App;