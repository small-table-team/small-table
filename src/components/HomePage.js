import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function HomePage() {
  const roles = [
    { name: 'משתמש ', icon: 'pi pi-users', description: 'חיפוש ובניית אירועים טעימים', color: 'yellow-400' },
    { name: 'בעל קייטרינג', icon: 'pi pi-briefcase', description: 'ניהול תפריטים והזמנות בקלות', color: 'green-400' },
    { name: 'מנהל', icon: 'pi pi-cog', description: 'ניהול משתמשים והמערכת', color: 'purple-400' },
  ];

  const handleClick = (role) => {
    alert(`בחרת ב-${role}! בהמשך זה יוביל למסך המתאים.`);
  };

  return (
    <div style={{ background: '#f0f4f8', padding: '50px 20px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>ברוכים הבאים!</h1>
        <h2>בחרי את סוג המשתמש שלך כדי להתחיל</h2>
      </div>

     
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'flex-start',
        }}
      >
        {roles.map((role) => (
          <div
            key={role.name}
            style={{
              flex: '1 1 300px',
              maxWidth: '300px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              title={role.name}
              subTitle={<i className={`pi ${role.icon}`} style={{ fontSize: '2rem', marginRight: '10px' }}></i>}
              className="p-shadow-6 p-p-4"
              style={{
                width: '100%',
                minHeight: '220px',
                borderRadius: '15px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <p>{role.description}</p>
              <Button
                label="בחר"
                className={`p-button p-button-${role.color}`}
                onClick={() => handleClick(role.name)}
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
