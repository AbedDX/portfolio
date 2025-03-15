import Navbar from "./components/NavBar/navbar";
import Intro from "./components/Intro/intro";
import About from "./components/About/about";
import Footer from "./components/Footer/footer";
import Works from "./components/Works/works";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Intro />
      <About />
      <Works />
      <Footer />
      
    </div>
  );
}

export default App;