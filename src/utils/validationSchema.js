import * as yup from 'yup'

export const TASK_VALIDATION_SCHEMA = yup.object({
  description: yup.string().required('Додай нове завдання'),
  deadline: yup.date().nullable()
})
