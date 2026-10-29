import './App.css'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Contacto from './pages/Contacto.jsx'
import Proyectos from './pages/Proyectos.jsx'
import ScrollToAnchor from './components/Utils/ScrollToAnchor.jsx'
import { Routes, Route } from 'react-router';
import FactsButton from './components/Layout/FactsButton.jsx'


function App() {
  return (
    <>
      <ScrollToAnchor/>
      <FactsButton/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/proyectos' element={<Proyectos/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
