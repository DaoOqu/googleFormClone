import { useState } from 'react'
import Navbar from './Navbar'

function App() {
  return (
    <>
      <Navbar />
      <div className="container margin-top-large">
        <p>You don't have any forms created yet</p>
        <p>
          <a href="#" className="paper-btn btn-primary">
            {'create new form'}
          </a>
        </p>
      </div>
    </>
  )
}

export default App
