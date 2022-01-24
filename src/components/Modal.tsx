import { IonButton, IonModal } from '@ionic/react'

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
    >
      {component}
      <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
    </IonModal>
  )
}
