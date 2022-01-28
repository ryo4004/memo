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
} from '@ionic/react'
import { useParams } from 'react-router'

export const Detail = () => {
  const params = useParams<{ id: string }>()

  const id = params.id

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Inbox" defaultHref="/"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div>{id ? id : 'not found'}</div>
      </IonContent>
    </IonPage>
  )
}
