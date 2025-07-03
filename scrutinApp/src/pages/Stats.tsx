import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonSpinner,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './Stats.css';

interface StatData {
  voted: number;
  total: number;
}

const Stats: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [stat, setStat] = useState<StatData | null>(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statRes = await fetch(`http://localhost:3000/api/v1/scrutins/${id}/stats`);
        const statData = await statRes.json();
        setStat(statData.data);

        const titleRes = await fetch(`http://localhost:3000/api/v1/scrutins/${id}`);
        const titleData = await titleRes.json();
        setTitle(titleData.data.title);

        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques :', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [id]);

  return (
    <IonPage>
      <Nav title="Statistiques du scrutin" />

    
      <IonContent className="ion-padding">
        {loading || !stat ? (
          <IonSpinner name="dots" />
        ) : (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{title}</IonCardTitle>
              <IonCardSubtitle>
                {stat.voted} votants / {stat.total} inscrits
              </IonCardSubtitle>

              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[{ name: title, ...stat }]}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="voted" fill="#3880ff" name="Votants" />
                  <Bar dataKey="total" fill="#10dc60" name="Inscrits" />
                </BarChart>
              </ResponsiveContainer>
            </IonCardHeader>
          </IonCard>
        )}
      </IonContent>
        <IonButton fill="clear" onClick={() => history.push('/home')} className="back-button">
        <IonIcon icon={arrowBack} slot="start" />
        Retour à l’accueil
      </IonButton>


      <Footer />
    </IonPage>
  );
};

export default Stats;
