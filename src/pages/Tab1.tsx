import React, { useEffect, useState } from 'react';
import {
  IonContent, IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonSearchbar} from '@ionic/react';
import axios from 'axios';
import './Tab1.css';
import { useHistory } from 'react-router-dom';
import logger from '../services/logger';


interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number; 
  price_change_percentage_24h: number;  
  image : string;
}

const Home: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  

  const handleCryptoClick = (crypto: CryptoCurrency) => {
    logger.log(`User clicked on ${crypto.name}`);
    history.push(`/crypto/${crypto.id}`);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum,ripple,litecoin,cardano,dogecoin,binancecoin,stellar,polkadot,chainlink,tether,uniswap,usd-coin,bitcoin-cash,solarcoin,dash,zcash,monero,neo,bitcoin-sv,zcash-sv,tron,vechain,zcash-governance,zcash-governance-legacy,zcash-legacy',
            
          }
        });
        setCryptos(result.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchData();
  }, []);
  const filteredCryptos = searchText === '' ? cryptos : cryptos.filter(
    coin => coin.name.toLowerCase().includes(searchText.toLowerCase())
  );
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Watchlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} />
  
        <IonList>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol><strong>Icon</strong></IonCol>
                <IonCol size="5"><strong>Name</strong></IonCol>
                <IonCol><strong>Price</strong></IonCol>
                <IonCol><strong>24hr Change</strong></IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          {filteredCryptos.map((crypto) => ( 
            <IonItem key={crypto.id} className='item-enter' button onClick={() => handleCryptoClick(crypto)}>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonImg src={crypto.image} style={{ width: '20px', height: '20px' }} alt={crypto.name}  />
                  </IonCol>
                  <IonCol size="5">
                    <IonLabel>
                      <h2>{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel>
                      <p>${crypto.current_price}</p>
                    </IonLabel>
                  </IonCol>
                  <IonCol>
                    <IonLabel>
                      <p style={{ color: crypto.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </IonLabel>
                  </IonCol>
                 
                </IonRow>
              </IonGrid>
            </IonItem>
          ))}
        </IonList>
        
      </IonContent>
    </IonPage>
  );
  };

export default Home;
