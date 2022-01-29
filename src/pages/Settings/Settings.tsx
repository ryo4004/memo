import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import ExploreContainer from '../../components/ExploreContainer'
import './Settings.scss'

export const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>設定</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">設定</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="settings page" />
      </IonContent>
    </IonPage>
  )
}
