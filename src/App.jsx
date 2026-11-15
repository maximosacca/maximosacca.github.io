import './App.css'
import Home from './pages/Home.jsx'
import Contacto from './pages/Contacto.jsx'
import Proyectos from './pages/Proyectos.jsx'
import ScrollToAnchor from './components/Utils/ScrollToAnchor.jsx'
import DocumentTitle from './components/Utils/DocumentTitle.jsx'
import { Routes, Route } from 'react-router';
import Layout from './components/Layout/Layout.jsx'
import NotFound from './pages/NotFound.jsx'


function App() {
  return (
    <>
      <DocumentTitle />
      <ScrollToAnchor />
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/proyectos' element={<Proyectos />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
