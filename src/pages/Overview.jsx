import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import TableComponent from '../components/atoms/TableComponent'
import Tabs from '../components/atoms/Tabs';
const headers1 = [
  { label: 'Bill type', key: 'billType' },
  { label: 'Current Month', key: 'currentMonth', align: 'right' },
  { label: 'Previous Month', key: 'previousMonth', align: 'right' },
];

const rows1 = [
  { billType: 'Dev Cost', currentMonth: '$2,776', previousMonth: '$1,998' },
  { billType: 'Brake Event', currentMonth: '$8,320', previousMonth: '$5,137' },
  { billType: 'Actual Revenue', currentMonth: '$3,441', previousMonth: '$8,261' },
];

const footer1 = [
  { label: 'Total Billed', colSpan: 2 },
  { label: '$196,000', align: 'right' },
  { label: '$489,000', align: 'right' },
];
const headers2 = [
  { label: 'Hour type', key: 'billType' },
  { label: 'Current Month', key: 'currentMonth', align: 'right' },
  { label: 'Previous Month', key: 'previousMonth', align: 'right' },
];

const rows2 = [
  { billType: 'Billab Hours', currentMonth: '$2,776', previousMonth: '$1,998' },
  { billType: 'Non Billable Hours', currentMonth: '$8,320', previousMonth: '$5,137' },
  { billType: 'Fixed Bill Hours', currentMonth: '$3,441', previousMonth: '$8,261' },
];

const footer2 = [
  { label: 'Total Billed Hours', colSpan: 2 },
  { label: '1690', align: 'right' },
  { label: '1950', align: 'right' },
];

const Overview = () => {
  return (
    <Box bgcolor={"#F5F5F5"} p={2}>
      <Typography variant='h5' textAlign={'left'}>Company Overview</Typography>
      <Box p={2} bgcolor={'white'} borderRadius={'10px'}>
        <Grid container columns={3} spacing={2}>
          <Grid item xs={1} >
            <Typography fontWeight={'bold'} fontSize={'20px'}>Bill Type</Typography>
            <TableComponent headers={headers1} rows={rows1} footer={footer1} />
          </Grid>
          <Grid item xs={1} >
            <Typography fontWeight={'bold'} fontSize={'20px'}>Hour Type</Typography>
            <TableComponent headers={headers2} rows={rows2} footer={footer1} />
          </Grid>
          <Grid item xs={1}>
            <Typography fontWeight={'bold'} fontSize={'20px'}>Company ERP</Typography>
            <Grid container columns={12} spacing={2}>
              <Grid item xs={6}  p={1}>
                <Box bgcolor={"#1976D214"} borderRadius={'10px'} p={1.5} pl={4}>
                  <Typography>Billable</Typography>
                  <Typography fontWeight={'bold'}>50 hr</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box bgcolor={"#fff8e1"} borderRadius={'10px'} p={1.5} pl={4}>
                  <Typography>Non Billable</Typography>
                  <Typography fontWeight={'bold'}>50 hr</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box bgcolor={"#e8f5e9"} borderRadius={'10px'} p={1.5} pl={4}>
                  <Typography>Billable</Typography>
                  <Typography fontWeight={'bold'}>50 hr</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box bgcolor={"#f3e5f5"} borderRadius={'10px'} p={1.5} pl={4}>
                  <Typography>Billable</Typography>
                  <Typography fontWeight={'bold'}>50 hr</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box p={2} bgcolor={'white'} mt={2} borderRadius={'10px'}>
        <Tabs />
      </Box>
    </Box>
  )
}

export default Overview