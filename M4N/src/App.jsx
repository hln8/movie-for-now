import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Footer from './components/footer/footer';
import NotFound from './components/404 page/notFound';
import AwardsPage from './pages/Awards Page/AwardsPage';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/awards' element={<AwardsPage />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </AuthProvider>

  )
}
export default App