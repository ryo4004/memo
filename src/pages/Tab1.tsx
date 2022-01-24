import { useState } from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonButton,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonInput,
} from '@ionic/react'
import { addOutline } from 'ionicons/icons'
import { Modal } from '../components/Modal'

import './Tab1.scss'

interface Props {
  router: HTMLIonRouterOutletElement | null
}

const Tab1: React.FC<Props> = ({ router }) => {
  const [todoList, setTodoList] = useState<Array<string>>([])
  const [todoInput, setTodoInput] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const component = (
    <>
      <IonItem>
        <IonInput value={todoInput} onIonChange={(e) => setTodoInput(e.detail.value!)} />
      </IonItem>
      <IonButton
        onClick={() => {
          todoInput !== '' && setTodoList([...todoList, todoInput])
          setTodoInput('')
          setShowModal(false)
        }}
      >
        追加
      </IonButton>
    </>
  )

  const modalProps = { showModal, router, component, setShowModal }

  const title = 'やることリスト'

  const addButton = (
    <IonButtons slot="primary" collapse={true}>
      <IonButton onClick={() => setShowModal(true)}>
        <IonIcon slot="icon-only" icon={addOutline}></IonIcon>
      </IonButton>
    </IonButtons>
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          {addButton}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
            {addButton}
          </IonToolbar>
        </IonHeader>

        <Modal {...modalProps} />

        {todoList.length === 0 && (
          <IonItem>
            <IonLabel>なにもありません</IonLabel>
          </IonItem>
        )}
        {todoList.length !== 0 && (
          <IonList>
            <IonListHeader>
              <IonLabel>List Header</IonLabel>
            </IonListHeader>
            {todoList.map((todo, i) => (
              <IonItem key={i}>
                <IonLabel>{todo}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Tab1
