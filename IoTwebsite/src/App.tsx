import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Academic from './pages/academic/Academic';
import Admission from './pages/admission/Admission';
import Faculty from './pages/faculty/FacultyIoT';
import FacultyPhysics from './pages/faculty/FacultyPhys';
import ProfessorDetail from './pages/faculty/ProfessorDetail';
import Admin from './pages/admin/admin';

import Navbar from './components/Navbar';
import FloatingCalendar from './components/calendar';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty/FacultyPhys" element={<FacultyPhysics />} />
          <Route path="/faculty/:id" element={<ProfessorDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<h2>404 - ไม่พบหน้านี้</h2>} />
        </Routes>
      </div>
      <Footer />
      <FloatingCalendar />
    </BrowserRouter>
  );
}

export default App;