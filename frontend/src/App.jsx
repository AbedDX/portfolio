import Navbar from './components/NavBar/navbar'
import Intro from './components/Intro/intro'
import About from './components/About/about'
import Works from './components/Works/works'
import LearningLog from './components/LearningLog/LearningLog'
import Contact from './components/Contact/contact'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Intro />
      <About />
      <Works />
      <LearningLog />
      <Contact />
    </>
  )
}

export default App