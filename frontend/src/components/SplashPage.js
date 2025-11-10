import React from 'react';
import { useNavigate } from 'react-router-dom';



function SplashPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Onboarding'); 
  };


  return (
   <div
      onClick={handleClick} // כל לחיצה על הדיב תוביל לדף הבא
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        cursor: 'pointer', // סמן עכבר שמראה שניתן ללחוץ
      }}
    >
      <img
        src="/images/logo.png"
        alt="small table"
        style={{ maxWidth: '300px', width: '80%', height: 'auto' }}
      />
    </div>
  );
}

export default SplashPage;
