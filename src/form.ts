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
  | { tag: 'shorText'; question: Question<ShortText> }
  | { tag: 'longText'; question: Question<LongText> }
  | { tag: 'singleChoice'; question: Question<SingleChoice> }
  | { tag: 'multipleChoice'; question: Question<MultipleChoice> }
  | { tag: 'scale'; question: Question<Scale> }


export type Question<T> = {
  title: string
  description: string | null
  required: boolean
  definition: T
}

export type ShortText = null

export type LongText = null

export type SingleChoice = Array<string>

export type MultipleChoice = Array<string>

export type Scale = {
  start: number
  end: number
  startLabel: string
  endLabel: string
}
