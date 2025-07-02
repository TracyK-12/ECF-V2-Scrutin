// src/pages/Stats.tsx
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonSpinner,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';
import { IonButton, IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import './Stats.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StatData {
  id: number;
  title: string;
  voted: number;
  total: number;
}

const Stats: React.FC = () => {
  const [stats, setStats] = useState<StatData[]>([]);
  const [loading, setLoading] = useState(true);
    const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/scrutins')
      .then((res) => res.json())
      .then(async (data) => {
        const scrutins = data.data;
        const result: StatData[] = [];

        for (const sc of scrutins) {
          const res = await fetch(`http://localhost:3000/api/v1/scrutins/${sc.id}/stats`);
          const stat = await res.json();
          result.push({
            id: sc.id,
            title: sc.title,
            voted: stat.data.voted,
            total: stat.data.total,
          });
        }

        setStats(result);
        setLoading(false);
      });
  }, []);

  return (
    <IonPage>
      <Nav title="Statistiques" />

      <IonButton
        fill="clear"
        onClick={() => history.push('/home')}
        className="back-button"
      >
        <IonIcon icon={arrowBack} slot="start" />
        Retour à l’accueil
      </IonButton>
      

      <IonContent className="ion-padding">
        {loading ? (
          <IonSpinner name="dots" />
        ) : (
          stats.map((stat) => (
            <IonCard key={stat.id}>
              <IonCardHeader>
                <IonCardTitle>{stat.title}</IonCardTitle>
                <IonCardSubtitle>
                  {stat.voted} votants / {stat.total} inscrits
                </IonCardSubtitle>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[stat]}>
                    <XAxis dataKey="title" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="voted" fill="#3880ff" name="Votants" />
                    <Bar dataKey="total" fill="#10dc60" name="Total" />
                  </BarChart>
                </ResponsiveContainer>
              </IonCardHeader>
            </IonCard>
          ))
        )}
      </IonContent>

      <Footer />
    </IonPage>
  );
};

export default Stats;
