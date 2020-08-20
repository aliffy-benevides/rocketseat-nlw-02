import React from 'react';

import './styles.css';

const AuthInputsBlock: React.FC = ({ children }) => {
  return (
    <div className="auth-inputs-block">
      {children}
    </div>
  );
}

export default AuthInputsBlock;