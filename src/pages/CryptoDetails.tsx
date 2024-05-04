import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle
} from '@ionic/react';
import axios from 'axios';
import { useParams } from 'react-router';

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crypto Detail: {cryptoDetails?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {cryptoDetails ? (
          <IonCard>
            <img src={cryptoDetails.image.large} alt={cryptoDetails.name} style={{ width: '50%', display:'block',margin:'auto' }} />
            <IonCardHeader>
              <IonCardTitle>{cryptoDetails.name}</IonCardTitle>
              <IonCardSubtitle>{cryptoDetails.symbol.toUpperCase()} - {cryptoDetails.hashing_algorithm}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{cryptoDetails.description.en}</p>
              <p>Current Price: ${cryptoDetails.market_data.current_price.usd.toLocaleString()}</p>
              <p>Market Cap: ${cryptoDetails.market_data.market_cap.usd.toLocaleString()}</p>
              <p>24h Change: {cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%</p>
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
