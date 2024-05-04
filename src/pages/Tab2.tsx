import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router';

const Tab2: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Portfolio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
