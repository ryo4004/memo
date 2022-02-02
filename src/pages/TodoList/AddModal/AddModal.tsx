import { IonButton, IonLabel, IonItem, IonInput } from '@ionic/react'

import { Modal } from '../../../components/Modal'

import { useTodoContext } from '../../../hooks/useTodo'

import styles from './AddModal.module.scss'

interface Props {
  router: HTMLIonRouterOutletElement | null
  showModal: boolean
  setShowModal: (modal: boolean) => void
}

export const AddModal: React.FC<Props> = ({ router, showModal, setShowModal }) => {
  const { addTodo, todoInput, updateInput } = useTodoContext()

  const modalProps = { showModal, router, setShowModal }

  const isButtonDisabled = todoInput.label === '' || todoInput.span === ''

  return (
    <Modal {...modalProps}>
      <IonItem>
        <IonLabel position="stacked">タイトル</IonLabel>
        <IonInput type="text" value={todoInput.label} onIonChange={(e) => updateInput('label', e.detail.value)} />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">間隔</IonLabel>
        <IonInput type="number" value={todoInput.span} onIonChange={(e) => updateInput('span', e.detail.value)} />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">最後の実施日</IonLabel>
        <IonInput type="date" value={todoInput.lastDate} onIonChange={(e) => updateInput('lastDate', e.detail.value)} />
      </IonItem>
      <div>
        <IonButton
          onClick={() => {
            if (addTodo()) {
              setShowModal(false)
            }
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
