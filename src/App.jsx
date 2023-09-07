import { NavLink, Outlet } from 'react-router-dom'
import './App.css'


function App() {

  return (
    <>
    <div className='App'>
      <header>
        <h1>Imagenes de la NASA </h1>
      </header>
      <div>
        <nav>
          <NavLink to='/pages/Home'>Home</NavLink>
          <NavLink to='/pages/Apod'>Apod</NavLink><img src="/public/apod-ico.png" alt="logo" />
          <NavLink to='/pages/Mars'>Mars</NavLink><img src="/public/mars-ico.png" alt="logo" />
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
