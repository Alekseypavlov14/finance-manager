import { Button, DatePicker, Input, InputNumber, Select, Space } from 'antd'
import { initialValues, transactionTypesOptions } from './constants'
import { mapTransactionFormDataToClientData } from './utils/map-transaction-form-data-to-client-data'
import { Form, Formik, FormikHelpers } from 'formik'
import { validateTransactionForm } from './utils/validate-transaction-form'
import { mapDayjsToMilliseconds } from '@/shared/utils/dayjs'
import { TransactionClientData } from '@/features/transactions'
import { TransactionFormData } from './types/transaction-form-data'
import { useCurrencyOptions } from './hooks/use-currency-options'
import { Headline } from '@/shared/components/Headline'
import dayjs from 'dayjs'
import styles from './TransactionForm.module.css'
import clsx from 'clsx'

export type TransactionFormMode = 'create' | 'edit'

export const transactionFormCreateMode: TransactionFormMode = 'create'
export const transactionFormEditMode: TransactionFormMode = 'edit'

interface TransactionFormProps {
  onSubmit: (data: TransactionClientData) => void | Promise<void>
  mode: TransactionFormMode
}

export function TransactionForm({ mode, onSubmit }: TransactionFormProps) {
  const currencyOptions = useCurrencyOptions()

  async function submitHandler(formData: TransactionFormData, { resetForm }: FormikHelpers<TransactionFormData>) {
    await onSubmit(mapTransactionFormDataToClientData(formData))
    resetForm()
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
        touched,
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
                status={(errors.type && touched.type) ? 'error' : ''}
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
                status={(errors.amount && touched.amount) ? 'error' : ''}
              />
            </Space>

            <Space
              className={styles.FieldBlock}
              direction='vertical'
              size='small'
            >
              <Headline level={5}>Currency:</Headline>

              <Select 
                value={values.currencyId}
                onChange={(value) => setFieldValue('currencyId', value)}
                options={currencyOptions}
                className={styles.Control}
                status={(errors.currencyId && touched.currencyId) ? 'error' : ''}
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
                status={(errors.description && touched.description) ? 'error' : ''}
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
                status={(errors.date && touched.date) ? 'error' : ''}
              />
            </Space>

            <Button
              className={styles.SubmitButton}
              size='large'
              htmlType='submit'
              type='primary'
              block
            >
              {formSubmitButtonText}
            </Button>
          </Space>
        </Form>
      )}
    </Formik>
  )
}