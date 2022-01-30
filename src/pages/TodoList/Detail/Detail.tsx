import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  // IonIcon,
  // IonItem,
  // IonLabel,
  // IonNote,
  IonPage,
  IonToolbar,
  // useIonViewWillEnter,
  IonNote,
} from '@ionic/react'
import { useParams } from 'react-router'

import { useTodoContext } from '../../../hooks/useTodo'

import styles from './Detail.module.scss'

export const Detail = () => {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)

  const { todoList } = useTodoContext()
  const todo = todoList.find((todo) => todo.id === id)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="戻る" defaultHref="/"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {!todo && (
          <div className={styles.note}>
            <IonNote>みつかりませんでした</IonNote>
          </div>
        )}
        {todo && (
          <>
            <div>{todo.label}</div>
            <div>{todo.span}</div>
            <div>{todo.lastDate ? todo.lastDate.toFormat('yyyy/M/d') : 'なし'}</div>
          </>
        )}
      </IonContent>
    </IonPage>
  )
}
