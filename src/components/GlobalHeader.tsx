import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import { useLocation } from 'react-router-dom';

const GlobalHeader: React.FC = () => {
  const location = useLocation();
  const mainRoutes = ['/tab1', '/tab2', '/tab3']; // Main routes where no back button should be shown

  // Show the back button only if not on a main tab route
  const showBackButton = !mainRoutes.includes(location.pathname);

  return (
    <IonHeader>
      <IonToolbar>
        {showBackButton && (
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
        )}
         <IonTitle>{mainRoutes}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default GlobalHeader;
