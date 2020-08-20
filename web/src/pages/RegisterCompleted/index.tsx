import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import WelcomeScreen from '../../components/WelcomeScreen';

import { useAuth } from '../../contexts/AuthContext';

import successCheckIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

const RegisterCompleted: React.FC = () => {
  const { registeredUser, logIn } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!registeredUser)
      history.push('/');
  }, [registeredUser, history])

  function handleLogin() {
    if (!registeredUser) {
      return history.push('/');  
    }

    const { email, password } = registeredUser;
    logIn(email, password)
  }

  return (
    <div id="register-completed-page">
      <WelcomeScreen 
        replaceWelcomeBlock={(
          <div className="content" >
            <img src={successCheckIcon} alt="Icone de sucesso" />
            <h2>Cadastro concluído</h2>
            <p>Agora você faz parte da plataforma da Proffy.</p>
            <p>Tenha uma ótima experiência.</p>

            <button onClick={handleLogin}>
              Fazer login
            </button>
          </div>
        )}
      />
    </div>
  );
}

export default RegisterCompleted;