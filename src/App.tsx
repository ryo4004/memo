import { useRef } from 'react'
import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { albums, list, cog } from 'ionicons/icons'
import { TodoList } from './pages/TodoList/TodoList'
import { Stock } from './pages/Stock/Stock'
import { Settings } from './pages/Settings/Settings'
import { Detail } from './pages/TodoList/Detail/Detail'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.scss'

setupIonicReact()

const App: React.FC = () => {
  const routerRef = useRef<HTMLIonRouterOutletElement | null>(null)

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet ref={routerRef}>
            <Route path="/detail/:id">
              <Detail />
            </Route>
            <Route exact path="/todolist">
              <TodoList router={routerRef.current} />
            </Route>
            <Route exact path="/stocklist">
              <Stock />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route exact path="/">
              <Redirect to="/todolist" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="todolist" href="/todolist">
              <IonIcon icon={albums} />
              <IonLabel>やることリスト</IonLabel>
            </IonTabButton>
            <IonTabButton tab="stocklist" href="/stocklist">
              <IonIcon icon={list} />
              <IonLabel>ものリスト</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={cog} />
              <IonLabel>設定</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
