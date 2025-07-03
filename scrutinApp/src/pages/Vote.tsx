
import {
  IonPage,
  IonContent,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardSubtitle,
   IonIcon,
  IonButton,
  IonSpinner,
  IonToast,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './Vote.css';


interface Member {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  has_voted: number;
}

const Votes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();




  const fetchMembers = () => {
    setLoading(true);
    fetch(`http://localhost:3000/api/v1/scrutins/${id}/members`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur chargement membres :', err);
        setLoading(false);
      });
  };

  const handleVote = (memberId: number) => {
    fetch(`http://localhost:3000/api/v1/scrutins/${id}/members/${memberId}/vote`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then(() => {
        fetchMembers(); // Rafraîchit la liste après le vote
        setShowToast(true);
      })
      .catch((err) => console.error('Erreur vote :', err));
  };

  useEffect(() => {
    fetchMembers();
  }, [id]);

  return (
   <IonPage>
  <Nav title="Liste des membres" />
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
      <div className="table-container">
        <table className="members-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Date de naissance</th>
              <th>État du vote</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.last_name}</td>
                <td>{member.first_name}</td>
                <td>{new Date(member.birth_date).toLocaleDateString()}</td>
                <td>
                  {member.has_voted ? (
                    <span className="badge badge-success">A voté</span>
                  ) : (
                    <span className="badge badge-warning">Non voté</span>
                  )}
                </td>
                <td>
                  {!member.has_voted && (
                    <IonButton size="small" onClick={() => handleVote(member.id)}>
                      Voter
                    </IonButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </IonContent>

  <IonToast
    isOpen={showToast}
    message="Vote enregistré avec succès."
    duration={2000}
    onDidDismiss={() => setShowToast(false)}
  />

  <Footer />
</IonPage>

  );
};

export default Votes;
