import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { caretForwardCircle, play, playOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Tab3: React.FC = () => {
  const history = useHistory();
  const navigateToAddFunds = () => {
    history.push('/add-funds');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
       <IonCard>
        <IonCardHeader>
          <IonCardTitle>Wallet</IonCardTitle>
          <IonCardSubtitle>Balance: {}
          </IonCardSubtitle>
          <IonButton onClick={navigateToAddFunds}>Add funds</IonButton>
          <IonButton>Withdraw funds</IonButton>
        </IonCardHeader>
       </IonCard>
       <IonCard>
        <IonCardHeader>
          <IonCardTitle>
          View Transactions<IonIcon aria-hidden="true" icon={play} /></IonCardTitle>
        </IonCardHeader>
       </IonCard>
       <IonCard>
        <IonCardHeader>
          <IonCardTitle>
          Settings</IonCardTitle>
        </IonCardHeader>
        </IonCard>
       
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
