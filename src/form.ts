import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  11
)

export type FormId = string;

export const generateFormId = (): FormId => {
  return nanoid()
}

export type Form = {
  id: FormId
  name: string
  published: boolean
}