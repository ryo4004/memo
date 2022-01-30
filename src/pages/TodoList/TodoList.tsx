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
  IonCard,
  IonCardContent,
  IonNote,
} from '@ionic/react'
import { addOutline } from 'ionicons/icons'

import { AddModal } from './AddModal/AddModal'

import { useTodoContext } from '../../hooks/useTodo'

import styles from './TodoList.module.scss'

interface Props {
  router: HTMLIonRouterOutletElement | null
}

export const TodoList: React.FC<Props> = ({ router }) => {
  const { todoList } = useTodoContext()
  const [showModal, setShowModal] = useState<boolean>(false)

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

        <AddModal router={router} showModal={showModal} setShowModal={setShowModal} />

        {todoList.length === 0 && (
          <div className={styles.note}>
            <IonNote>なにもありません</IonNote>
          </div>
        )}
        {todoList.length !== 0 &&
          todoList.map((todo) => (
            <IonCard key={todo.id} routerLink={'/detail/' + todo.id}>
              <IonItem>
                <IonLabel>{todo.label}</IonLabel>
              </IonItem>

              <IonCardContent>
                <div>
                  <IonNote>{todo.span}</IonNote>
                </div>
                <div>
                  <IonNote>{todo.lastDate && todo.lastDate.toFormat('yyyy/M/d')}</IonNote>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  )
}
