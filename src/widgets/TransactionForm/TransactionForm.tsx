import { Button, DatePicker, Input, InputNumber, Select, Space } from 'antd'
import { initialValues, transactionTypesOptions } from './constants'
import { mapTransactionFormDataToClientData } from './utils/map-transaction-form-data-to-client-data'
import { validateTransactionForm } from './utils/validate-transaction-form'
import { mapDayjsToMilliseconds } from '@/shared/utils/dayjs'
import { TransactionClientData } from '@/features/transactions'
import { TransactionFormData } from './types/transaction-form-data'
import { Form, Formik } from 'formik'
import { Headline } from '@/shared/components/Headline'
import dayjs from 'dayjs'
import styles from './TransactionForm.module.css'
import clsx from 'clsx'

export type TransactionFormMode = 'create' | 'edit'

export const transactionFormCreateMode: TransactionFormMode = 'create'
export const transactionFormEditMode: TransactionFormMode = 'edit'

interface TransactionFormProps {
  onSubmit: (data: TransactionClientData) => void
  mode: TransactionFormMode
}

export function TransactionForm({ mode, onSubmit }: TransactionFormProps) {
  function submitHandler(formData: TransactionFormData) {
    onSubmit(mapTransactionFormDataToClientData(formData))
  }

  const formTitleText = mode === transactionFormCreateMode
    ? 'Create Transaction'
    : 'Edit Transaction'

  const formSubmitButtonText = mode === transactionFormCreateMode
    ? 'Create!'
    : 'Edit!'

  return (
    <Formik
      initialValues={initialValues}
      validate={validateTransactionForm}
      onSubmit={submitHandler}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <Form 
          className={styles.TransactionForm}
          onSubmit={handleSubmit}
        >
          <Space 
            className={styles.Structure} 
            direction='vertical'
            size='middle'
          >
            <Headline level={2}>{formTitleText}</Headline>

            <Space
              className={styles.FieldBlock}
              direction='vertical'
              size='small'
            >
              <Headline level={5}>Transaction type:</Headline>

              <Select 
                value={values.type}
                onChange={(value) => setFieldValue('type', value)}
                options={transactionTypesOptions}
                className={styles.Control}
                status={errors.type ? 'error' : ''}
              />
            </Space>

            <Space 
              className={styles.FieldBlock}
              direction='vertical'
              size='small'
            >
              <Headline level={5}>Amount:</Headline>

              <InputNumber
                value={values.amount}
                onChange={value => setFieldValue('amount', value)}
                className={styles.Control}
                status={errors.amount ? 'error' : ''}
              />
            </Space>
  
            <Space
              className={styles.FieldBlock}
              direction='vertical'
              size='small'
            >
              <Headline level={5}>Description:</Headline>

              <Input.TextArea 
                name='description'
                className={clsx(styles.TextArea, styles.Control)}
                placeholder='Description'
                value={values.description}
                onChange={handleChange}
                status={errors.description ? 'error' : ''}
              />
            </Space>
  
            <Space 
              className={styles.FieldBlock}
              direction='vertical'
              size='small'
            >
              <Headline level={5}>Date:</Headline>

              <DatePicker
                value={dayjs(values.date)}
                onChange={value => setFieldValue('date', mapDayjsToMilliseconds(value))}
                className={styles.Control}
                suffixIcon={<></>}
                allowClear={false}
                status={errors.date ? 'error' : ''}
              />
            </Space>

            <Button
              htmlType='submit'
              type='primary'
            >
              {formSubmitButtonText}
            </Button>
          </Space>
        </Form>
      )}
    </Formik>
  )
}