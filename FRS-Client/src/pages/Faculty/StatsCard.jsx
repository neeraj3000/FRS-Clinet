import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatsCard = ({ title, value }) => (
  <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

export default StatsCard;
