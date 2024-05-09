import React, {  } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useWallet } from '../context/WalletContext';

const Tab2: React.FC = () => {
  const { portfolio } = useWallet();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Portfolio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonContent>
      {Object.keys(portfolio).map((symbol) => (
        <IonItem key={symbol}>
          <IonLabel>{symbol}: {portfolio[symbol]} units</IonLabel>
        </IonItem>
      ))}
    </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
