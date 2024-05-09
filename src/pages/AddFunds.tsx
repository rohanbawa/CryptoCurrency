import React, { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonBackButton, IonButtons, IonInput, IonButton, IonLabel
} from '@ionic/react';
import { useTransactions } from '../context/TransactionContext';

const AddFundsPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const { addTransaction } = useTransactions();

  const handleAddFunds = () => {
    console.log(`Adding ${amount} to the wallet`);

    if (amount) {
        addTransaction({
          id: Date.now(),
          type: 'Add',
          amount: parseFloat(amount),
          date: new Date().toISOString()
        });
        console.log("Funds added");
       
      }  
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
