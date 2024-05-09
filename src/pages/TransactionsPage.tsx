// TransactionsPage.tsx
import React from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonBackButton, IonButtons
} from '@ionic/react';
import { useTransactions } from '../context/TransactionContext'; // Check the import path

const TransactionsPage: React.FC = () => {
  const { transactions } = useTransactions(); // Accessing transactions from context

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab3" />
          </IonButtons>
          <IonTitle>Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {transactions.map(transaction => (
            <IonItem key={transaction.id}>
              <IonLabel>{transaction.type} ${transaction.amount} on {transaction.date}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TransactionsPage;
