import { Button, DatePicker, Input, InputNumber, Select, Space } from 'antd'
import { defaultInitialValues, transactionTypesOptions } from './constants'
import { mapTransactionFormDataToClientData } from './utils/map-transaction-form-data-to-client-data'
import { Form, Formik, FormikHelpers } from 'formik'
import { validateTransactionForm } from './utils/validate-transaction-form'
import { mapDayjsToMilliseconds } from '@/shared/utils/dayjs'
import { TransactionClientData } from '@/features/transactions'
import { TransactionFormData } from './types/transaction-form-data'
import { useCurrencyOptions } from './hooks/use-currency-options'
import { deepMerge } from '@oleksii-pavlov/deep-merge'
import { Headline } from '@/shared/components/Headline'
import dayjs from 'dayjs'
import styles from './TransactionForm.module.css'
import clsx from 'clsx'
import { isTransactionTypeLosing, isTransactionTypeReceiving } from '@/entities/transactions'

export type TransactionFormMode = 'create' | 'edit'

export const transactionFormCreateMode: TransactionFormMode = 'create'
export const transactionFormEditMode: TransactionFormMode = 'edit'

interface TransactionFormProps {
  mode: TransactionFormMode
  onSubmit: (data: TransactionClientData) => void | Promise<void>
  initialValue?: Partial<TransactionFormData>
}

export function TransactionForm({ mode, onSubmit, initialValue = {} }: TransactionFormProps) {
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

  const normalizedInitialValue = deepMerge<TransactionFormData>(defaultInitialValues, initialValue)

  return (
    <Formik
      initialValues={normalizedInitialValue}
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

            {isTransactionTypeReceiving(values.type) ? (
              <>
                <Space 
                  className={styles.FieldBlock}
                  direction='vertical'
                  size='small'
                >
                  <Headline level={5}>Receiving amount:</Headline>
  
                  <InputNumber
                    value={values.receivedAmount}
                    onChange={value => setFieldValue('receivedAmount', value)}
                    className={styles.Control}
                    status={(errors.receivedAmount && touched.receivedAmount) ? 'error' : ''}
                  />
                </Space>
  
                <Space
                  className={styles.FieldBlock}
                  direction='vertical'
                  size='small'
                >
                  <Headline level={5}>Receiving currency:</Headline>
  
                  <Select 
                    value={values.receivedCurrencyId}
                    onChange={(value) => setFieldValue('receivedCurrencyId', value)}
                    options={currencyOptions}
                    className={styles.Control}
                    status={(errors.receivedCurrencyId && touched.receivedCurrencyId) ? 'error' : ''}
                  />
                </Space>
              </>
            ) : null}

            {isTransactionTypeLosing(values.type) ? (
              <>
                <Space 
                  className={styles.FieldBlock}
                  direction='vertical'
                  size='small'
                >
                  <Headline level={5}>Lost amount:</Headline>
  
                  <InputNumber
                    value={values.lostAmount}
                    onChange={value => setFieldValue('lostAmount', value)}
                    className={styles.Control}
                    status={(errors.lostAmount && touched.lostAmount) ? 'error' : ''}
                  />
                </Space>
  
                <Space
                  className={styles.FieldBlock}
                  direction='vertical'
                  size='small'
                >
                  <Headline level={5}>Lost currency:</Headline>
  
                  <Select 
                    value={values.lostCurrencyId}
                    onChange={(value) => setFieldValue('lostCurrencyId', value)}
                    options={currencyOptions}
                    className={styles.Control}
                    status={(errors.lostCurrencyId && touched.lostCurrencyId) ? 'error' : ''}
                  />
                </Space>
              </>
            ) : null}
  
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