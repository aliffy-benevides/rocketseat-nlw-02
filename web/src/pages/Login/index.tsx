import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillHeart } from 'react-icons/ai';

import WelcomeScreen from '../../components/WelcomeScreen';
import AuthInputsBlock from '../../components/AuthInputsBlock';
import AuthInput from '../../components/AuthInput';

import { useAuth } from '../../contexts/AuthContext';

import './styles.css';

const Login: React.FC = () => {
  const { logIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassoword, setShowPassoword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  function handlePasswordVisibilityClick() {
    setShowPassoword(!showPassoword);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email || !password)
      return;

    logIn(email, password, rememberMe);
  }

  return (
    <div id="login-page">
      <WelcomeScreen>
        <h3>Fazer login</h3>
        <form onSubmit={handleSubmit}>
          <AuthInputsBlock>
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
          </AuthInputsBlock>

          <div className="remember-forgot-block">
            <div className="remember-block" >
              <input id="rememberMe" type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Lembrar-me</label>
            </div>
            <Link to="/forgot-password">
              Esqueci minha senha
            </Link>
          </div>

          <button type="submit" className="submit-button" disabled={!email || !password}>
            Entrar
          </button>
        </form>

        <footer>
          <div className="register-block">
            Não tem conta?
            <Link to="/register">
              Cadastre-se
            </Link>
          </div>

          <div className="message">
            É de graça 
            <AiFillHeart />
          </div>
        </footer>
      </WelcomeScreen>
    </div>
  );
}

export default Login;

