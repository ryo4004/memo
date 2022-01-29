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
  IonLabel,
  IonItem,
  IonInput,
} from '@ionic/react'
import { addOutline } from 'ionicons/icons'
import { Modal } from '../../components/Modal'

import { useTodo } from '../../hooks/useTodo'

import styles from './TodoList.module.scss'

interface Props {
  router: HTMLIonRouterOutletElement | null
}

export const TodoList: React.FC<Props> = ({ router }) => {
  const { todoList, addTodo, todoInput, updateInput } = useTodo()
  const [showModal, setShowModal] = useState<boolean>(false)

  const component = (
    <>
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
      <IonButton
        onClick={() => {
          if (addTodo()) {
            setShowModal(false)
          }
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
          <>
            {todoList.map((todo) => (
              <IonItem key={todo.id} routerLink={'/detail/' + todo.id}>
                <IonLabel>{todo.label}</IonLabel>
                <div className={styles.list}>sample</div>
              </IonItem>
            ))}
          </>
        )}
      </IonContent>
    </IonPage>
  )
}
