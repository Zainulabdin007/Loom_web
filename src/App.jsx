import './App.css'
import HomePage from './HomePage'
import logo from './assets/logo.png'

function App() {
  return (
    <div className="app">
      <header className="toolbar">
        <div className="toolbar-brand">
          <img src={logo} alt="" className="toolbar-logo" />
          <span>Frame</span>
        </div>

        <nav className="toolbar-nav">
          <a href="#about">about</a>
          <a href="#demo">demo</a>
          <a href="#product">product</a>
        </nav>

        <a
          href="https://github.com/Zainulabdin007/Frame_IDE/releases/tag/v0.1.0-beta"
          className="toolbar-download"
          target="_blank"
          rel="noopener noreferrer"
        >
          download
        </a>
      </header>

      <HomePage />
    </div>
  )
}

export default App
