import { IonButton, IonModal } from '@ionic/react'

type Props = {
  router: HTMLIonRouterOutletElement | null
  showModal: boolean
  setShowModal: (request: boolean) => void
}

export const Modal = (props: Props) => {
  const { showModal, router, setShowModal } = props
  return (
    <IonModal
      isOpen={showModal}
      swipeToClose={true}
      presentingElement={router || undefined}
      showBackdrop={true}
      onDidDismiss={() => setShowModal(false)}
    >
      <p>This is modal content</p>
      <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
    </IonModal>
  )
}
