import { useState } from 'react'
import Navbar from './Navbar'

import FormList from './FormList'
import { formsData } from './data'

function App() {
  const forms = Object.values(formsData).sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <>
      <Navbar />
      <div className="container margin-top-large">
        <FormList forms={forms} />
      </div>
    </>
  )
}

export default App
