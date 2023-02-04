// This file will be used to load all the data (yaml and csv) and annotate it with its respective types
import { FormId, Form } from './form'
import { User } from './user'

import customerFeedback from './data/customer-feedback.yaml'
import orderRequest from './data/order-request.yaml'
import timeOffRequest from './data/time-off-request.yaml'
import user from './data/user.yaml'

export const formsData: { [key: FormId]: Form } = {
  [customerFeedback.id]: customerFeedback,
  [orderRequest.id]: orderRequest,
  [timeOffRequest.id]: timeOffRequest,
}

export const userData: User = user