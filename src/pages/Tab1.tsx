import { useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal } from '@ionic/react'

import './Tab1.scss'

const Tab1: React.FC = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonModal isOpen={showModal} swipeToClose={true} onDidDismiss={() => setShowModal(false)}>
          <p>This is modal content</p>
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonModal>
        <IonButton onClick={() => setShowModal(true)}>ボタン</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Tab1
