import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainLayout>
      <Home />
    </MainLayout>
  )
}

export default App
