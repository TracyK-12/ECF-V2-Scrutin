import React from 'react';
import { IonFooter, IonToolbar, IonText } from '@ionic/react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar>
        <IonText className="footer-text">
          © 2025 VoteDonc. Tous droits réservés.
        </IonText>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
