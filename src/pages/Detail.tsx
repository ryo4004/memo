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

export const Detail = () => {
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
        <div>Message not found</div>
      </IonContent>
    </IonPage>
  )
}
