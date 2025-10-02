import Navbar from './components/NavBar/navbar'
import Intro from './components/Intro/intro'
import About from './components/About/about'
import Works from './components/Works/works'
import Contact from './components/Contact/contact'
import Blog from './components/Blog/blog'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Intro />
      <About />
      <Works />
      <Blog />
      <Contact />
    </>
  )
}

export default App