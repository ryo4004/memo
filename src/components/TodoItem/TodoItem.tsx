import { IonLabel, IonItem, IonCard, IonCardContent, IonNote } from '@ionic/react'

import type { Todo } from '../../hooks/useTodo'

type Props = {
  todo: Todo
}

export const TodoItem = (props: Props) => {
  const { todo } = props
  return (
    <IonCard key={todo.id} routerLink={'/detail/' + todo.id}>
      <IonItem>
        <IonLabel>{todo.label}</IonLabel>
      </IonItem>

      <IonCardContent>
        <div>
          <IonNote>{todo.span}</IonNote>
        </div>
        <div>
          <IonNote>{todo.lastDate && todo.lastDate.toFormat('yyyy/M/d')}</IonNote>
        </div>
      </IonCardContent>
    </IonCard>
  )
}
