import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonSpinner,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './Home.css';

interface Scrutin {
  id: number;
  title: string;
  starts_at: string;
  ends_at: string;
}

const Home: React.FC = () => {
  const [scrutins, setScrutins] = useState<Scrutin[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/scrutins')
      .then(res => res.json())
      .then(data => {
        setScrutins(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement scrutins :', err);
        setLoading(false);
      });
  }, []);

  return (
    <IonPage>
         <Nav title="Accueil – Scrutins" />
      <IonHeader>
        
      </IonHeader>

     <IonContent className="ion-padding">
  {loading ? (
    <IonSpinner name="dots" />
  ) : (
    <div className="grid-container">
      {scrutins.map(scrutin => (
        <IonCard key={scrutin.id} className="grid-item">
  <IonCardHeader className="card-content">
    <IonCardTitle>{scrutin.title}</IonCardTitle>
    <IonCardSubtitle>
      Début : {new Date(scrutin.starts_at).toLocaleString()}<br />
      Fin : {new Date(scrutin.ends_at).toLocaleString()}
    </IonCardSubtitle>

    <div className="button-group">
      <IonButton
        color="primary"
        onClick={() => history.push(`/vote/${scrutin.id}`)}
      >
        Voir
      </IonButton>

      <IonButton
        color="tertiary"
        onClick={() => history.push(`/stats/${scrutin.id}`)}
      >
        Statistiques
      </IonButton>
    </div>
  </IonCardHeader>
</IonCard>

      ))}
    </div>
  )}
</IonContent>


      <Footer />

    </IonPage>
  );
};

export default Home;
