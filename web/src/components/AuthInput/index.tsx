import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ label, name, children, ...rest }) => {
  const {value} = rest;
  const blockClass = (value || value === undefined) ? 'auth-input-block with-content' : 'auth-input-block';
  
  return (
    <div className="auth-input-container">
      <div className={blockClass}>
        <label htmlFor={name}>{label}</label>
        <input type="text" id={name} {...rest} />
      </div>
      { children }
    </div>
  );
}

export default AuthInput;