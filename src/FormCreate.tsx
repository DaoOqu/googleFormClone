import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formAdded } from './formsSlice'
import { useAppDispatch } from './hooks'

function FormCreate() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setName(e.target.value)

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    if (name.trim().length === 0) {
      return
    }

    const action = formAdded(name)
    dispatch(action)
    navigate(`/forms/${action.payload.id}`)
  }

  return (
    <>
      <h3>New Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <input type="submit" className="paper-btn btn-primary" value="Create" />
      </form>
    </>
  )
}

export default FormCreate
