import { Formik, Form, Field, ErrorMessage } from 'formik'
import { TASK_VALIDATION_SCHEMA } from '../../utils/validationSchema.js'
import styles from './TaskForm.module.sass'

function TaskForm ({ onSubmit }) {
  return (
    <Formik
      initialValues={{
        description: '',
        deadline: ''
      }}
      validationSchema={TASK_VALIDATION_SCHEMA}
      onSubmit={(values, actions) => {
        onSubmit(values)
        actions.resetForm()
      }}
    >
      {() => (
        <Form>
          <div className={styles.newTaskContainer}>
            <Field
              name='description'
              placeholder='Нове завдання'
              className={styles.input}
            />
            <ErrorMessage
              name='description'
              component='span'
              className={styles.error}
            />
            <Field
              type='date'
              name='deadline'
              className={styles.deadlineInput}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default TaskForm
