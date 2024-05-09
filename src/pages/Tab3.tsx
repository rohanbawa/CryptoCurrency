import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { caretForwardCircle, play, playOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { useWallet } from '../context/WalletContext';
import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';

const Tab3: React.FC = () => {
  const history = useHistory();
  const [amount, setAmount] = useState<string>('');
  const { addFunds, withdrawFunds, balance } = useWallet();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { addTransaction } = useTransactions();
 
  const handleAddFunds = () => {  
  const transaction = {
    id: Date.now(),
    type: 'Added',
    amount: parseFloat(amount),
    date: new Date().toISOString().split('T')[0]
  };
    
   // Convert to number and check if it's NaN
  const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      
      addFunds(numAmount);
      setAmount(''); // reset the input after adding funds
      addTransaction(transaction);
      setToastMessage('Funds added successfully');
      setShowToast(true);
    } else {
      console.error("Invalid input for funds");
      setToastMessage('Invalid input for funds');
      setShowToast(true);
    }
  };
  
  const handleWithdrawFunds = () => {
    const transaction = {
      id: Date.now(),
      type: 'Withdrawn',
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0]
    };
   
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      withdrawFunds(numAmount);
      setAmount(''); //  reset the input after withdrawing funds
      addTransaction(transaction);
      setToastMessage('Funds withdrawn successfully');
      setShowToast(true);
    } else {
      console.error("Invalid input for funds");
    }
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
       <div>
          <h2>Balance: ${balance.toFixed(2)}</h2>
          <IonInput value={amount} placeholder="Enter Amount" onIonChange={e => setAmount(e.detail.value ?? '')} clearInput type="number" />
          <IonButton onClick={handleAddFunds}>Add Funds</IonButton>
          <IonButton onClick={handleWithdrawFunds}>Withdraw Funds</IonButton>
          <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
        </div>
       </IonCard>
       <IonCard routerLink='/transactions'>
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
