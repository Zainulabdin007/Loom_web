import './App.css'
import HomePage from './HomePage'

function App() {
  return (
    <div className="app">
      <header className="toolbar">
        <span className="toolbar-brand">Frame</span>

        <nav className="toolbar-nav">
          <a href="#about">about</a>
          <a href="#demo">demo</a>
          <a href="#product">product</a>
        </nav>

        <a href="#download" className="toolbar-download">
          download
        </a>
      </header>

      <HomePage />
    </div>
  )
}

export default App
