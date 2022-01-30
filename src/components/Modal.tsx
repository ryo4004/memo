import { IonModal, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/react'

type Props = {
  router: HTMLIonRouterOutletElement | null
  showModal: boolean
  setShowModal: (request: boolean) => void
  children: React.ReactNode
}

export const Modal = (props: Props) => {
  const { showModal, router, setShowModal, children } = props
  return (
    <IonModal
      isOpen={showModal}
      swipeToClose={true}
      presentingElement={router || undefined}
      showBackdrop={true}
      onDidDismiss={() => setShowModal(false)}
      backdropDismiss={true}
    >
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>追加</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>閉じる</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>{children}</IonContent>
      </IonPage>
    </IonModal>
  )
}
