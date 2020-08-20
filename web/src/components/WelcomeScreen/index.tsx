import React, { ReactNode } from 'react';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

interface WelcomeScreenProps {
  inverted?: boolean;
  replaceWelcomeBlock?: ReactNode;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ children, inverted, replaceWelcomeBlock }) => {
  let welcomeScreenClass = inverted ? 'inverted' : '';

  return (
    <div id="welcome-screen" className={welcomeScreenClass}>
      <div id="welcome-block">
          { replaceWelcomeBlock ? replaceWelcomeBlock : 
            <div className="content">
              <img src={logoImg} alt="Proffy"/>
              <h2>Sua plataforma de <br />estudos online.</h2>
            </div>
          }
      </div>

      {children &&
        <main>
          {children}
        </main>
      }
    </div>
  );
}

export default WelcomeScreen;