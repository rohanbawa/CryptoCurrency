import React, { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonBackButton, IonButtons, IonInput, IonButton, IonLabel
} from '@ionic/react';

const AddFundsPage: React.FC = () => {
  const [amount, setAmount] = useState('');

  const handleAddFunds = () => {
    console.log(`Adding ${amount} to the wallet`);
    // Here you would typically integrate this with your backend
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab3" />
          </IonButtons>
          <IonTitle>Add Funds</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLabel position="floating">Enter Amount to Add:</IonLabel>
        <IonInput 
          value={amount}
          onIonChange={e => setAmount(e.detail.value!)}
          type="number"
          required
        />
        <IonButton expand="block" onClick={handleAddFunds}>Add Funds</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddFundsPage;
