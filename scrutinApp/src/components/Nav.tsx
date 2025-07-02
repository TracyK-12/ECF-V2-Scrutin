// src/components/Nav.tsx
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const Nav: React.FC<{ title: string }> = ({ title }) => (
  <IonHeader>
    <IonToolbar color="primary">
      <IonTitle className="ion-text-center">{title}</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default Nav;
