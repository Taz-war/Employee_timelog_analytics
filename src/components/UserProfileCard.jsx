import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the chart.js components we will use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

// Sample data for the bar chart
const data = {
  labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  datasets: [
    {
      label: 'Hours',
      data: [10, 20, 30, 40, 35, 25, 15],
      backgroundColor: 'rgb(66,165,245)',
      borderColor: 'rgb(66,165,245)',
      borderWidth: 1,
    },
  ],
};

// Options for the bar chart, now with grid lines removed
const options = {
  scales: {
    x: {
      grid: {
        display: false,
      }
    },
    y: {
      grid: {
        display: false,
      },
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,

};

const UserProfileCard = () => {
  return (
    <Card sx={{ maxWidth: 350, height:400 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
          <Avatar src="avatar_url" alt="Rakibul Hasan" sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography variant="h6">Rakibul Hasan</Typography>
            <Typography variant="body2">Billable 50 hr</Typography>
            <Typography variant="body2">Non Billable 50 hr</Typography>
            <Typography variant="body2">Fixed Price 00 hr</Typography>
          </Box>
        </Box>
        <Box sx={{ height: 250 }}>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
