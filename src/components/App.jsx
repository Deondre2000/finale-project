import { Route, Routes } from "react-router-dom";
import About from "./About";
import Header from "./Header";
import "../blocks/App.css";
import appImage from "../assets/header.jpg";
import Footer from "./Footer";

function HomePage() {}

function App() {
  return (
    <div className="app">
      <img src={appImage} alt="News" className="app__image" />
      <main className="app__content">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <About />
        <Footer />
      </main>
    </div>
  );
}

export default App;
