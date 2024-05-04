// components/LogViewer.tsx
import React, { useState } from 'react';
import { IonModal, IonButton, IonContent, IonTextarea } from '@ionic/react';
import logger from '../services/logger';

const LogViewer: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonButton onDoubleClick={() => setShowModal(true)}>Double Click Logo</IonButton>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonContent>
          <IonTextarea value={logger.getLogs()} autoGrow={true} readonly />
          <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default LogViewer;
