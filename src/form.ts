import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  11
)

export type FormId = string;
export type ChoiceId = string;
export type QuestionId = string;

export const generateFormId = (): FormId => {
  return nanoid()
}

export const generateQuestionId = (): FormId => {
  return nanoid()
}

export const generateChoiceId = (): FormId => {
  return nanoid()
}

export type Form = {
  id: FormId
  name: string
  published: boolean
  questions: Array<FormQuestion>
}

export type FormQuestion =
  | { tag: 'shorText'; question: ShortTextQuestion }
  | { tag: 'longText'; question: LongTextQuestion }
  | { tag: 'singleChoice'; question: SingleChoiceQuestion }
  | { tag: 'multipleChoice'; question: MultipleChoiceQuestion }
  | { tag: 'scale'; question: ScaleQuestion }

export type ShortTextQuestion = {
  title: string
  description: string | null
  required: boolean
}

export type LongTextQuestion = {
  title: string
  description: string | null
  required: boolean
}

export type SingleChoiceQuestion = {
  title: string
  description: string | null
  required: boolean
  choices: Array <{
    id: ChoiceId
    value: string
  }>
}

export type MultipleChoiceQuestion = {
  title: string
  description: string | null
  required: boolean
    choices: Array <{
    id: ChoiceId
    value: string
  }>
}

export type ScaleQuestion = {
  title: string
  description: string | null
  required: boolean
  start: number
  end: number
  startLabel: string
  endLabel: string
}
