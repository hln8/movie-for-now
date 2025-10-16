import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Footer from './components/footer/footer';
import NotFound from './components/404 page/notFound';
import AwardsPage from './pages/Awards Page/AwardsPage';
import { AuthProvider } from './context/AuthContext';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import SignIn from './pages/SignUp-In/SignIn';
import SignUp from './pages/SignUp-In/SignUp';
import Favorites from './pages/Favorites/Favorites';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />}  />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/awards' element={<AwardsPage />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App