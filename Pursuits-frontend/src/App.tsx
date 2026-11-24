import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router'
import { Layout } from '@/features/layout/Layout'

// Auth Pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));

// User Pages
const ProfilePage = lazy(() => import('@/pages/user/ProfilePage').then(m => ({ default: m.ProfilePage })));

// Static Pages
const About = lazy(() => import('./pages/static/About').then(m => ({ default: m.About })));
const ContactPage = lazy(() => import('@/pages/static/ContactPage').then(m => ({ default: m.ContactPage })));
const WishlistPage = lazy(() => import('@/pages/static/WishlistPage').then(m => ({ default: m.WishlistPage })));

// Home Page
const LandingPage = lazy(() => import('@/pages/home/LandingPage').then(m => ({ default: m.LandingPage })));

// Explore Pages
const ExplorePage = lazy(() => import('@/pages/explore/ExplorePage').then(m => ({ default: m.ExplorePage })));
const After10thPage = lazy(() => import('@/pages/explore/After10thPage').then(m => ({ default: m.After10thPage })));
const After12thDashboard = lazy(() => import('@/pages/explore/After12thPage').then(m => ({ default: m.After12thDashboard })));
const StreamDetailPage = lazy(() => import('@/pages/explore/StreamDetailPage').then(m => ({ default: m.StreamDetailPage })));
const PathSelectionPage = lazy(() => import('@/pages/explore/PathSelectionPage').then(m => ({ default: m.PathSelectionPage })));
const DiplomaPage = lazy(() => import('@/pages/explore/DiplomaPage').then(m => ({ default: m.DiplomaPage })));
const DiplomaDetailsPage = lazy(() => import('@/pages/explore/DiplomaDetailsPage').then(m => ({ default: m.DiplomaDetailsPage })));
const DegreeCategoriesPage = lazy(() => import('@/pages/explore/DegreeCategoriesPage').then(m => ({ default: m.DegreeCategoriesPage })));
const DegreeProgramsPage = lazy(() => import('@/pages/explore/DegreeProgramsPage').then(m => ({ default: m.DegreeProgramsPage })));
const DegreeDetailsPage = lazy(() => import('@/pages/explore/DegreeDetailsPage').then(m => ({ default: m.DegreeDetailsPage })));
const ExamsPage = lazy(() => import('./pages/explore/ExamsPage').then(m => ({ default: m.ExamsPage })));
const ExamDetailsPage = lazy(() => import('./pages/explore/ExamDetailsPage').then(m => ({ default: m.ExamDetailsPage })));

function App() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-[#3DC6E7] rounded-full"></div>
      </div>
    }>
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

    
      
      {/* User Routes */}
      <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />

      {/* Public Routes with Layout */}
      <Route path="/" element={<Layout><LandingPage /></Layout>} />
      <Route path="/home" element={<Layout><LandingPage /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} /> 
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />

      {/* Explore - pages */}
      <Route path="/explore" element={<Layout><ExplorePage /></Layout>} />
      <Route path="/explore/after-10th" element={<Layout><After10thPage /></Layout>} />
      <Route path="/explore/after-12th" element={<Layout><After12thDashboard /></Layout>} />
      <Route path="/explore/after-10th/:streamId" element={<Layout><StreamDetailPage /></Layout>} />
      <Route path="/explore/after-12th/dashboard/:streamId" element={<Layout><PathSelectionPage /></Layout>} />
      <Route path="/explore/after-12th/:streamId/diplomas" element={<Layout><DiplomaPage /></Layout>} />
      <Route path="/explore/after-12th/diplomas/:diplomaId" element={<Layout><DiplomaDetailsPage /></Layout>} />
      <Route path="/explore/after-12th/degree-categories/:streamId" element={<Layout><DegreeCategoriesPage /></Layout>} />
      <Route path="/explore/after-12th/:streamId/degrees/category/:categoryId" element={<Layout><DegreeProgramsPage /></Layout>} />
      <Route path="/explore/after-12th/:streamId/degrees/category/:categoryId/details/:degreeId" element={<Layout><DegreeDetailsPage /></Layout>} />
      <Route path="/explore/after-12th/:streamId/exams" element={<Layout><ExamsPage /></Layout>} />
      <Route path="/explore/after-12th/:streamId/exams/:examId" element={<Layout><ExamDetailsPage /></Layout>} />
      <Route path="/explore/after-12th/degrees/:degreeId" element={<Layout><DegreeDetailsPage /></Layout>} />
      <Route path="/explore/after-12th/diplomas/:diplomaId" element={<Layout><DiplomaDetailsPage /></Layout>} />
      <Route path="/explore/after-12th/exams/:examId" element={<Layout><ExamDetailsPage /></Layout>} />

    </Routes>
    </Suspense>
  )
}

export default App