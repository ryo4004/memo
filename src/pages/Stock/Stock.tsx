import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import ExploreContainer from '../../components/ExploreContainer'
import './Stock.scss'

export const Stock: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ものリスト</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ものリスト</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="stock page" />
      </IonContent>
    </IonPage>
  )
}
