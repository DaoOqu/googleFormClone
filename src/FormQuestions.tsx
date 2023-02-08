import { useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import produce from 'immer'
import yaml from 'js-yaml'
import {
  allQuestionTypes,
  Choice,
  ChoiceId,
  FormId,
  FormQuestion,
  generateChoiceId,
  LongText,
  MultipleChoice,
  Question,
  QuestionType,
  Scale,
  ShortText,
  SingleChoice,
} from './form'
import {
  questionAdded,
  questionDeleted,
  questionUpdated,
  selectFormById,
} from './formsSlice'
import { useAppDispatch, useAppSelector } from './hooks'
import Code from './Code'

type Params = {
  formId = FormId
}

function FormQuestions() {
  const params= useParams() as Params
  const form = useAppSelector((state) => selectFormById(state, params.formId))
  
  return (
    <>
      {form.questions.map((formQuestion) => (
        <QuestionCard formQuestion={formQuestion} />
      ))}
    </>
  )
}

function showQuestionType(questionType: QuestionType): string {
  switch (questionType) {
    case 'shortText':
      return 'Short Text'
    case 'longText':
      return 'Long Text'
    case 'singleChoice':
      return 'Single Choice'
    case 'multipleChoice':
      return 'Multiple Choice'
    case 'scale':
      return 'Scale'
    default:
      const _exhaustiveCheck: never = questionType
      return _exhaustiveCheck
  }
}

function QuestionCard(props: { formQuestion: FormQuestion }) {
  const { formQuestion } = props

  const renderQuestion = (): JSX.Element => {
    switch (formQuestion.tag) {
      case 'shortText':
        return <QuestionShortText question={formQuestion.question}/>
      case 'longText':
        return <QuestionLongText question={formQuestion.question}/>
      case 'singleChoice':
        return <QuestionSingleChoice question={formQuestion.question}/>
      case 'multipleChoice':
        return <QuestionMultipleChoice question={formQuestion.question}/>
      case 'scale':
        return <QuestionScale question={formQuestion.question}/>
      default:
        const _exhaustiveCheck: never = formQuestion
        return _exhaustiveCheck
    }
  }

  return (
    <div className="card margin-bottom">
      <div className="card-body">
        <h5 className="card-subtitle">{showQuestionType(formQuestion.tag)}</h5>
        {renderQuestion()}
      </div>
    </div>
  )
}

function QuestionMetadata<T>(props: { question: Question<T> }) {
  const { question } = props

  const requiredElement = question.required ? (
    <span className="text-danger"> *</span>
  ): null

  const descriptorElement = question.description && question.description !== '' ? (
    <p className="text-small text-muted">{question.description}</p>
  ): null

  return (
    <>
      <p>
        {question.title}
        {requiredElement}
      </p>
      {descriptorElement}
    </>
  )
}

function QuestionShortText(props: { question: Question<ShortText> }) {
  return (
    <>
      <QuestionMetadata question={props.question} />
      <div className="form-group">
        <input className="input-block" type="text" readOnly={true} />
      </div>
    </>
  )
}

function QuestionShortTextEdit(props: {
  question: Question<ShortText>
  onQuestionChange: (question: Question<ShortText>) => void
}) {
  const { question, onQuestionChange } = props

  return (
    <>
      <QuestionMetadataEdit
        question={question}
        onQuestionChange={onQuestionChange}
      />
    </>
  )
}

function QuestionLongText(props: { question: Question<LongText> }) {
  return (
    <>
      <QuestionMetadata question={props.question} />
      <div className="form-group">
        <textarea className="input-block" readOnly={true}></textarea>
      </div>
    </>
  )
}

function QuestionLongTextEdit(props: {
  question: Question<LongText>
  onQuestionChange: (question: Question<LongText>) => void
}) {
  const { question, onQuestionChange } = props

  return (
    <>
      <QuestionMetadataEdit
        question={question}
        onQuestionChange={onQuestionChange}
      />
    </>
  )
}

function QuestionSingleChoice(props: { question: Question<SingleChoice> }) {
  return (
    <>
      <QuestionMetadata question={props.question} />
      <fieldset className="form-group">
        {props.question.definition.map((choice) => {
          return (
            <label key={choice.id} className="paper-radio">
              <input type="radio" value={choice.value} disabled={true} />{' '}
              <span className="inline-block">{choice.value}</span>
            </label>
          )
        })}
      </fieldset>
    </>
  )
}

function QuestionSingleChoiceEdit(props: {
  question: Question<SingleChoice>
  onQuestionChange: (question: Question<SingleChoice>) => void
}) {
  const { question, onQuestionChange } = props

  const handleAddChoice = (choice: Choice) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition.push(choice)
      })
    )

  const newChoice = <NewChoice onAddChoice={handleAddChoice} />

  const handleRemoveChoice = (choiceId: ChoiceId) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition = draft.definition.filter(
          (choice) => choice.id !== choiceId
        )
      })
    )

  const removeChoice = (choiceId: ChoiceId) => (
    <a
      href="#"
      className="inline-block margin-left-small text-small"
      onClick={(e) => {
        e.preventDefault()
        handleRemoveChoice(choiceId)
      }}
    >
      Remove
    </a>
  )

  return (
    <>
      <QuestionMetadataEdit
        question={question}
        onQuestionChange={onQuestionChange}
      />
      <fieldset className="form-group">
        <legend>Choices:</legend>
        {question.definition.map((choice) => {
          return (
            <label key={choice.id} htmlFor={choice.id} className="paper-radio">
              <input
                type="radio"
                name="choice"
                id={choice.id}
                value={choice.value}
                disabled={true}
              />{' '}
              <span className="inline-block">{choice.value}</span>
              {removeChoice(choice.id)}
            </label>
          )
        })}
      </fieldset>
      {newChoice}
    </>
  )
}

function QuestionMultipleChoice(props: { question: Question<MultipleChoice> }) {
  return (
    <>
      <QuestionMetadata question={props.question} />
      <fieldset className="form-group">
        {props.question.definition.map((choice) => {
          return (
            <label key={choice.id} className="paper-check">
              <input type="checkbox" value={choice.value} disabled={true} />{' '}
              <span className="inline-block">{choice.value}</span>
            </label>
          )
        })}
      </fieldset>
    </>
  )
}

function QuestionMultipleChoiceEdit(props: {
  question: Question<MultipleChoice>
  onQuestionChange: (question: Question<MultipleChoice>) => void
}) {
  const { question, onQuestionChange } = props

  const handleAddChoice = (choice: Choice) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition.push(choice)
      })
    )

  const newChoice = <NewChoice onAddChoice={handleAddChoice} />

  const handleRemoveChoice = (choiceId: ChoiceId) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition = draft.definition.filter(
          (choice) => choice.id !== choiceId
        )
      })
    )

  const removeChoice = (choiceId: ChoiceId) => (
    <a
      href="#"
      className="inline-block margin-left-small text-small"
      onClick={(e) => {
        e.preventDefault()
        handleRemoveChoice(choiceId)
      }}
    >
      Remove
    </a>
  )

  return (
    <>
      <QuestionMetadataEdit
        question={question}
        onQuestionChange={onQuestionChange}
      />
      <fieldset className="form-group">
        <legend>Choices:</legend>
        {question.definition.map((choice) => {
          return (
            <label key={choice.id} htmlFor={choice.id} className="paper-check">
              <input
                type="checkbox"
                name="choices"
                id={choice.id}
                value={choice.value}
                disabled={true}
              />{' '}
              <span className="inline-block">{choice.value}</span>
              {removeChoice(choice.id)}
            </label>
          )
        })}
      </fieldset>
      {newChoice}
    </>
  )
}


export default FormQuestions
