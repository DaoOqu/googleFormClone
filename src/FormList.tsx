import { Form } from './form'

function FormList(props: { forms: Array<Form> }) {
  return (
    <>
      {props.forms.map((form) => (
        <p>
          <a href={`#${form.id}`}>{form.name}</a>
        </p>
      ))}
    </>
  )
}

export default FormList
