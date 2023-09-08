import { NavLink, Outlet } from 'react-router-dom'
import './App.css'


function App() {

  return (
    <>
    <div className='App'>
      <header>
        <h1>Imagenes de la NASA </h1>
      </header>
      <div className='navContainer'>
        <nav>
          <NavLink className='Home' to='/pages/Home'>Home</NavLink>
          <NavLink className='Apod' to='/pages/Apod'>Apod<img src="/apod-ico.png" alt="logo" /></NavLink>
          <NavLink className='Mars' to='/pages/Mars'>Mars<img src="/mars-ico.png" alt="logo" /></NavLink>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
      <footer>Created by Jorge Pérez Requena</footer>
    </div>
    </>
  )
}

export default App
