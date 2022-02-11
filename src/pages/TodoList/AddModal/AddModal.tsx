import { useState } from 'react'
import { IonButton, IonLabel, IonItem, IonInput } from '@ionic/react'
import { DateTime } from 'luxon'

import { Modal } from '../../../components/Modal'

import { useTodoContext } from '../../../hooks/useTodo'

import type { Todo } from '../../../hooks/useTodo'

import styles from './AddModal.module.scss'

export type TodoInput = {
  label: string
  span: string
  lastDate: string
}

export type InputType = keyof TodoInput

const initInput = (): TodoInput => ({ label: '', span: '', lastDate: '' })

const useInput = () => {
  const [input, setInput] = useState<TodoInput>(initInput())

  const updateInput = (type: InputType, value: string | null | undefined) => {
    if (value) {
      const newInput = {
        ...input,
        [type]: value,
      }
      setInput(newInput)
    }
  }

  const resetInput = () => {
    setInput(initInput())
  }

  return { input, convertedInput: convertInput(input), updateInput, resetInput }
}

const convertInput = (input: TodoInput): Todo => {
  return {
    id: new Date().getTime(),
    label: input.label,
    span: Number(input.span),
    lastDate: DateTime.fromFormat(input.lastDate, 'yyyy-M-d'),
  }
}

interface Props {
  router: HTMLIonRouterOutletElement | null
  showModal: boolean
  setShowModal: (modal: boolean) => void
}

export const AddModal: React.FC<Props> = ({ router, showModal, setShowModal }) => {
  const { input, convertedInput, updateInput, resetInput } = useInput()
  const { addTodo } = useTodoContext()

  const modalProps = { showModal, router, setShowModal }

  const isButtonDisabled = input.label === '' || input.span === ''

  return (
    <Modal {...modalProps}>
      <IonItem>
        <IonLabel position="stacked">タイトル</IonLabel>
        <IonInput type="text" value={input.label} onIonChange={(e) => updateInput('label', e.detail.value)} />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">間隔</IonLabel>
        <IonInput type="number" value={input.span} onIonChange={(e) => updateInput('span', e.detail.value)} />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">最後の実施日</IonLabel>
        <IonInput type="date" value={input.lastDate} onIonChange={(e) => updateInput('lastDate', e.detail.value)} />
      </IonItem>
      <div>
        <IonButton
          onClick={() => {
            addTodo(convertedInput)
            setShowModal(false)
            resetInput()
          }}
          expand="block"
          disabled={isButtonDisabled}
          className={styles.button}
        >
          追加
        </IonButton>
      </div>
    </Modal>
  )
}
