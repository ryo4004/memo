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
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
} from '@ionic/react'
import { addOutline } from 'ionicons/icons'
import { Modal } from '../components/Modal'

import './Tab1.scss'

interface Props {
  router: HTMLIonRouterOutletElement | null
}

const Tab1: React.FC<Props> = ({ router }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const modalProps = { showModal, router, setShowModal }

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
          <IonTitle>Tab 1</IonTitle>
          {addButton}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
            {addButton}
          </IonToolbar>
        </IonHeader>

        <Modal {...modalProps} />

        <IonList>
          <IonListHeader>
            <IonLabel>List Header</IonLabel>
          </IonListHeader>
          {Array.from(new Array(20)).map((num, i) => (
            <IonItem key={i}>
              <IonLabel>{i}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Tab1
