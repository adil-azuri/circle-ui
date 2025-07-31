import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/authContext";
import Home from "./pages/home";
import PrivateRoute from "./lib/PrivateRoutes";
import { Center_All_Thread } from "./pages/main_pages/Center_All_Thread";
import { Center_Detail_thread, } from "./pages/main_pages/Center_Detail_Thread";
import { SnackBarProvider } from "@/context/SnackBarContext";
import { Center_Follow } from "./pages/main_pages/Center_Follow";
import { Center_Search } from "./pages/main_pages/Center_Search";

function App() {
  return (

    <AuthProvider>
      <SnackBarProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }>
              <Route index element={<Center_All_Thread />} />
              <Route path="threads/:id" element={<Center_Detail_thread />} />
              <Route path="/home/follow" element={<Center_Follow />} />
              <Route path="/home/search" element={<Center_Search />} />
            </Route>
          </Routes>
        </BrowserRouter>

      </SnackBarProvider>
    </AuthProvider>
  );
}

export default App;