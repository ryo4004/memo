import { IonModal, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/react'

type Props = {
  router: HTMLIonRouterOutletElement | null
  showModal: boolean
  component: React.ReactNode
  setShowModal: (request: boolean) => void
}

export const Modal = (props: Props) => {
  const { showModal, router, component, setShowModal } = props
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
        <IonContent fullscreen>
          {component}
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonContent>
      </IonPage>
    </IonModal>
  )
}
