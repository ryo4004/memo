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
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonInput,
} from '@ionic/react'
import { addOutline } from 'ionicons/icons'
import { Modal } from '../components/Modal'

import { useTodo } from '../hooks/useTodo'

import './Tab1.scss'

interface Props {
  router: HTMLIonRouterOutletElement | null
}

const Tab1: React.FC<Props> = ({ router }) => {
  const { todoList, addTodo, removeTodo } = useTodo()
  const [todoInput, setTodoInput] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const component = (
    <>
      <IonItem>
        <IonInput value={todoInput} onIonChange={(e) => setTodoInput(e.detail.value!)} />
      </IonItem>
      <IonButton
        onClick={() => {
          todoInput !== '' && addTodo(todoInput)
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

  const removeList = (id: string) => {
    removeTodo(id)
  }

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
            {todoList.map((todo) => (
              <IonItemSliding>
                <IonItem key={todo.id}>
                  <IonLabel>{todo.label}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption onClick={() => removeList(todo.id)} color="danger">
                    削除
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Tab1
