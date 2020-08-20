import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import WelcomeScreen from '../../components/WelcomeScreen';
import AuthInputsBlock from '../../components/AuthInputsBlock';
import AuthInput from '../../components/AuthInput';

import { useAuth, IUser } from '../../contexts/AuthContext';

import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

const Register: React.FC = () => {
  const history = useHistory();
  const { register } = useAuth();

  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [showPassoword, setShowPassoword] = useState(false);

  function handleGoBack() {
    history.goBack();
  }

  function handlePasswordVisibilityClick() {
    setShowPassoword(!showPassoword);
  }

  function canSubmit() {
    return first_name && last_name && email && password && confirm_password;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!canSubmit())
      return;

    const user: IUser = {
      first_name, last_name, email, password, confirm_password
    }

    register(user)
      .then(() => {
        history.push('/register-completed')
      })
  }

  return (
    <div id="register-page">
      <WelcomeScreen inverted>
        <button className="back" onClick={handleGoBack}>
          <img src={backIcon} alt="Retorno"/>
        </button>
        <h3>Cadastro</h3>
        <h4>Preencha os dados abaixo <br/> para começar.</h4>
        <form onSubmit={handleSubmit}>
          <AuthInputsBlock>
            <AuthInput label="Nome" name="first_name"
              value={first_name}
              onChange={e => setFirst_name(e.target.value)}
            />
            <AuthInput label="Sobrenome" name="last_name"
              value={last_name}
              onChange={e => setLast_name(e.target.value)}
            />
            <AuthInput label="E-mail" name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <AuthInput label="Senha" name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={showPassoword ? 'text' : 'password'}
            >
              <button type="button" className="show-password-button" onClick={handlePasswordVisibilityClick}>
                {showPassoword ? <AiOutlineEye size="2rem" /> : <AiOutlineEyeInvisible size="2rem" />}
              </button>
            </AuthInput>
            <AuthInput label="Confirmar senha" name="confirm_password"
              value={confirm_password}
              onChange={e => setConfirm_password(e.target.value)}
              type={showPassoword ? 'text' : 'password'}
            />
          </AuthInputsBlock>

          <button type="submit" className="submit-button" disabled={!canSubmit()}>
            Concluir cadastro
          </button>
        </form>
      </WelcomeScreen>
    </div>
  );
}

export default Register;

