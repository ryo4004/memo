import { IonLabel, IonItem, IonCard, IonBadge } from '@ionic/react'

import type { Todo } from '../../hooks/useTodo'

import styles from './TodoItem.module.scss'

type Props = {
  todo: Todo
}

export const TodoItem = (props: Props) => {
  const { todo } = props
  return (
    <IonCard key={todo.id} routerLink={'/detail/' + todo.id}>
      <IonItem lines="full">
        <IonLabel>{todo.label}</IonLabel>
      </IonItem>

      <div className={styles.content}>
        <IonItem lines="none">
          <IonBadge className={styles.badge} color="medium">
            実施間隔
          </IonBadge>
          <IonLabel className={styles.label}>{todo.span}日ごとに実施</IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonBadge className={styles.badge} color="medium">
            最終実施日
          </IonBadge>
          <IonLabel className={styles.label}>{todo.lastDate && todo.lastDate.toFormat('yyyy/M/d')}</IonLabel>
        </IonItem>
      </div>
    </IonCard>
  )
}
