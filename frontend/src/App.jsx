import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import CategoryStrip from "./components/CategoryStrip";
import CourseSection from "./components/CourseSection";
import ProtectedRoute from "./components/ProtectedRoute";

import Courses from "./pages/Courses";
import MyLearning from "./pages/MyLearning";
import Learning from "./pages/Learning";
import SignIn from "./pages/SignIn";
import CourseDetails from "./pages/CourseDetails";
import AdminSignIn from "./pages/AdminSignIn";
import AdminDashboard from "./pages/AdminDashboard";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState("All Courses");

  return (
    <>
      <Hero />

      <CategoryStrip
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <CourseSection
        selectedCategory={selectedCategory}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-skillio-bg">

        {/* Navbar must be OUTSIDE Routes */}
        <Navbar />

        <Routes>

          {/* Public routes */}
          <Route path="/" element={<Home />} />

          <Route
            path="/courses"
            element={<Courses />}
          />

          <Route
            path="/course/:title"
            element={<CourseDetails />}
          />

          <Route
            path="/learn/:courseId"
            element={<Learning />}
          />

          <Route
            path="/signin"
            element={<SignIn />}
          />

          <Route
            path="/signup"
            element={<SignUp />}
          />

          <Route
            path="/admin/signin"
            element={<AdminSignIn />}
          />


          {/* User protected routes */}
          <Route
            element={
              <ProtectedRoute
                tokenKey="skillio-user-token"
                redirectTo="/signin"
              />
            }
          >
            <Route
              path="/my-learning"
              element={<MyLearning />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />
          </Route>


          {/* Admin protected route */}
          <Route
            element={
              <ProtectedRoute
                tokenKey="skillio-admin-token"
                redirectTo="/admin/signin"
              />
            }
          >
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />
          </Route>


          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

        {/* Footer must also be OUTSIDE Routes */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;