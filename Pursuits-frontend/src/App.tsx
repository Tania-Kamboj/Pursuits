import { Routes, Route } from 'react-router'
import { Layout } from '@/features/layout/Layout'
import { LandingPage } from '@/pages/home/LandingPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { After10thPage } from '@/pages/explore/After10thPage'
import { ExplorePage } from '@/pages/explore/ExplorePage'
import { After12thDashboard } from '@/pages/explore/After12thPage' // ✅ Import karo
import { StreamDetailPage } from '@/pages/explore/StreamDetailPage'
import { PathSelectionPage } from '@/pages/explore/PathSelectionPage'
import { DiplomaPage } from '@/pages/explore/DiplomaPage'
import { DiplomaDetailsPage } from '@/pages/explore/DiplomaDetailsPage'
import { DegreeCategoriesPage } from '@/pages/explore/DegreeCategoriesPage'
import { DegreeProgramsPage } from '@/pages/explore/DegreeProgramsPage'
import { DegreeDetailsPage } from '@/pages/explore/DegreeDetailsPage'
import { ExamDetailsPage } from './pages/explore/ExamDetailsPage'
import { ExamsPage } from './pages/explore/ExamsPage'
import { About } from './pages/static/About'
import { WishlistPage } from '@/pages/static/WishlistPage'
import { ProfilePage } from '@/pages/user/ProfilePage'
import { ContactPage } from '@/pages/static/ContactPage' // Top par import karo

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

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
  )
}

export default App