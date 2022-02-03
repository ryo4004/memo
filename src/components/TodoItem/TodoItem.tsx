import { IonLabel, IonItem, IonCard, IonBadge } from '@ionic/react'
import { DateTime } from 'luxon'

import type { Todo } from '../../hooks/useTodo'

import styles from './TodoItem.module.scss'

type Props = {
  todo: Todo
}

export const TodoItem = (props: Props) => {
  const { todo } = props
  return (
    <IonCard routerLink={'/detail/' + todo.id}>
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
        {todo.lastDate && todo.span && <NextActiveDate beforeDate={todo.lastDate} span={todo.span} />}
      </div>
    </IonCard>
  )
}

const NextActiveDate = ({ beforeDate, span }: { beforeDate: DateTime; span: number }) => {
  const nextDate = beforeDate.plus({ days: span })
  return (
    <IonItem lines="none">
      <IonBadge className={styles.badge} color="medium">
        次回実施日
      </IonBadge>
      <IonLabel className={styles.label}>{nextDate.toFormat('yyyy/M/d')}</IonLabel>
    </IonItem>
  )
}
