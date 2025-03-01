import Footer from './components/footer'
import Header from './components/header'
import {Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import AboutPage from './pages/about'
import SignUpPage from './pages/signup'
import MembershipPage from './pages/membershipPage'
import Checkout from './components/Checkout'
import LocationsPage from './pages/LocationsPage'

function App() {

  return (
    <>
      <Header />
        <main>
          <Routes >
            <Route path='/' element={<Homepage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<SignUpPage />} />
            <Route path='/membership' element={<MembershipPage />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/clubs' element={<LocationsPage />} />
            <Route path='/clubs/:id' element={<LocationsPage />} />
          </Routes>
        </main>
      <Footer />
    </>
  )
}

export default App
