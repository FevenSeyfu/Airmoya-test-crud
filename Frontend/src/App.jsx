import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '@pages/Home';
import Chats from "@pages/Chats";
import NotFound from "@pages/NotFound";
import MainLayout from "@layouts/MainLayout";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/chats" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
          <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;