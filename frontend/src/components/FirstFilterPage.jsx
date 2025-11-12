import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';

export default function FirstFilterPage() {
  const navigate = useNavigate();
  const [eventSize, setEventSize] = useState('');
  const [menuType, setMenuType] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!eventSize || !menuType) {
      setError('נא למלא את כל השדות');
      return;
    }

    const filterData = { eventSize, menuType, timestamp: new Date().toISOString() };
    localStorage.setItem('cateringFilters', JSON.stringify(filterData));
    navigate('/caterings');
  };

  const eventSizes = [
    { value: 'small', label: 'עד 50 משתתפים' },
    { value: 'medium', label: '50–100 משתתפים' },
    { value: 'large', label: '100+ משתתפים' },
  ];

  const menuOptions = [
    { value: 'dairy', label: 'חלבי' },
    { value: 'meat', label: 'בשרי' },
    { value: 'parve', label: 'פרווה' },
  ];

  const SelectGrid = ({ title, items, selected, onSelect, icon: Icon }) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" fontWeight="600" sx={{ mb: 3, textAlign: 'center' }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          width: '100%',
        }}
      >
        {items.map((item) => (
          <Card
            key={item.value}
            onClick={() => onSelect(item.value)}
            sx={{
              cursor: 'pointer',
              width: { xs: '100%', sm: 120 },
              height: 120,
              maxWidth: { xs: 300, sm: 120 },
              textAlign: 'center',
              borderRadius: 3,
              border: selected === item.value ? '2px solid #651C1C' : '1px solid #e0e0e0',
              bgcolor: selected === item.value ? '#fff5f5' : 'white',
              transition: '0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              '&:hover': {
                boxShadow: 3,
                transform: 'translateY(-3px)',
              },
            }}
          >
            <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
              {Icon && <Icon sx={{ color: '#651C1C', fontSize: 30, mb: 0.5 }} />}
              <Typography variant="subtitle2" fontWeight="bold" color="#651C1C">
                {item.label}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fafafa',
        direction: 'rtl',
        py: 6,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" color="#651C1C" gutterBottom>
            ברוך הבא!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            נבחר עבורך קייטרינג מושלם — רק כמה שניות וזהו!
          </Typography>

            {/* גודל האירוע */}
            <SelectGrid
              title="מה גודל האירוע שלך?"
              items={eventSizes}
              selected={eventSize}
              onSelect={setEventSize}
              icon={PeopleIcon}
            />

            {/* סוג תפריט */}
            <SelectGrid
              title="סוג תפריט"
              items={menuOptions}
              selected={menuType}
              onSelect={setMenuType}
              icon={RestaurantIcon}
            />

          {/* הודעת שגיאה */}
          {error && (
            <Alert severity="error" onClose={() => setError('')} sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* כפתור המשך */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              py: 2,
              borderRadius: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              bgcolor: '#651C1C',
              '&:hover': { bgcolor: '#7e2323' },
            }}
            onClick={handleSubmit}
          >
            המשך לבחירת קייטרינג
          </Button>
        </Box>
      </Container>
    </Box>
  );
}