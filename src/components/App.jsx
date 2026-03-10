import { Route, Routes } from 'react-router-dom'
import About from './About'
import Navigation from './Navigation'
import '../blocks/App.css'

function HomePage() {
  return (
    <section className="page">
      <h1>Main Page</h1>
      <p>Welcome to the project&apos;s home route.</p>
    </section>
  )
}

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="app__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
