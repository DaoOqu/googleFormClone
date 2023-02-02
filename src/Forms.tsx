import { selectallFormsSortByName } from './formsSlice'
import { useAppSelector } from './hooks'

function Forms() {
  const forms = useAppSelector(selectallFormsSortByName)
  return (
    <>
      <p>Questions</p>
    </>
  )
}

export default Forms
