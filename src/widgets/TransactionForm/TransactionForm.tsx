import { initialValues, mapTransactionFormDataToClientData, TransactionFormData, transactionTypesOptions, validateTransactionForm } from './form'
import { DatePicker, Input, InputNumber, Select, Space } from 'antd'
import { mapDayjsToMilliseconds } from '@/shared/utils/dayjs'
import { TransactionClientData } from '@/features/transactions'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import styles from './TransactionForm.module.css'

export type TransactionFormMode = 'create' | 'edit'

export const transactionFormCreateMode: TransactionFormMode = 'create'
export const transactionFormEditMode: TransactionFormMode = 'edit'

interface TransactionFormProps {
  onSubmit: (data: TransactionClientData) => void
  mode: TransactionFormMode
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  function submitHandler(formData: TransactionFormData) {
    onSubmit(mapTransactionFormDataToClientData(formData))
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validateTransactionForm}
      onSubmit={submitHandler}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <Form 
          className={styles.TransactionForm}
          onSubmit={handleSubmit}
        >
          <Space direction='vertical'>
            <InputNumber
              value={values.amount}
              onChange={value => setFieldValue('amount', value)}
            />
  
            <Input.TextArea 
              placeholder='Description'
              value={values.description}
              onChange={handleChange}
            />
  
            <Select 
              value={values.type}
              onChange={(value) => setFieldValue('type', value)}
              options={transactionTypesOptions}
            />
  
            <DatePicker
              value={dayjs(values.date)}
              onChange={value => setFieldValue('date', mapDayjsToMilliseconds(value))}
              suffixIcon={<></>}
              allowClear={false}
            />
          </Space>
        </Form>
      )}
    </Formik>
  )
}