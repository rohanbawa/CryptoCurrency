import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonButton,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useWallet } from '../context/WalletContext'; // Ensure this import is correct based on your directory structure

interface CryptoDetails {
  name: string;
  symbol: string;
  image: { large: string };
  hashing_algorithm: string;
  description: { en: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    price_change_percentage_24h: number;
  };
}

const CryptoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cryptoDetails, setCryptoDetails] = useState<CryptoDetails | null>(null);
  const { buyCrypto, sellCrypto, portfolio } = useWallet();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCryptoDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch cryptocurrency data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleBuy = () => {
    if (cryptoDetails) {
      const quantity = 1; 
      const pricePerUnit = cryptoDetails.market_data.current_price.usd;
      buyCrypto(cryptoDetails.symbol, quantity, pricePerUnit);
    }
  };

  const handleSell = () => {
    if (cryptoDetails && portfolio[cryptoDetails.symbol] && portfolio[cryptoDetails.symbol] > 0) {
      const quantity = 1; 
      const pricePerUnit = cryptoDetails.market_data.current_price.usd;
      sellCrypto(cryptoDetails.symbol, quantity, pricePerUnit);
    } else {
      console.error("You don't own enough of this cryptocurrency to sell.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
          <IonTitle>Crypto Detail: {cryptoDetails?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {cryptoDetails ? (
          <IonCard>
            <img src={cryptoDetails.image.large} alt={cryptoDetails.name} style={{ width: '50%', display: 'block', margin: 'auto' }} />
            <IonCardHeader>
              <IonCardTitle>{cryptoDetails.name}</IonCardTitle>
              <IonCardSubtitle>{cryptoDetails.symbol.toUpperCase()} - {cryptoDetails.hashing_algorithm}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{cryptoDetails.description.en}</p>
              <h2><b>Current Price:</b> ${cryptoDetails.market_data.current_price.usd.toLocaleString()}</h2>
              <h2><b>Market Cap:</b> ${cryptoDetails.market_data.market_cap.usd.toLocaleString()}</h2>
              <h2><b>24h Change:</b> {cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%</h2>
            </IonCardContent>
            <IonCardContent>
              <IonButton expand='block' color={'success'} onClick={handleBuy}>Buy</IonButton>
              <IonButton expand='block' color={'danger'} onClick={handleSell}>Sell</IonButton>
            </IonCardContent>
          </IonCard>
        ) : (
          <p>Loading...</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CryptoDetailPage;
