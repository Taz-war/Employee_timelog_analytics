import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ClientTable from './ClientTable';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function CustomTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="QQLQ" {...a11yProps(0)} />
                    <Tab label="THE CRM HOUSE" {...a11yProps(1)} />
                    <Tab label="BOOSTED CRM" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#f6fbff', p: 2, borderRadius: 1 }}>
                    <Box sx={{ flex: 1, p: 1,pl:'20px' }}>
                        <Typography variant="subtitle1" align="left">Budget Hours</Typography>
                        <Typography variant="h6" align="left">20 Hr</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 1,pl:'20px' }}>
                        <Typography variant="subtitle1" align="left">Logged Hours</Typography>
                        <Typography variant="h6" align="left">14.20 Hr</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 1,pl:'20px' }}>
                        <Typography variant="subtitle1" align="left">Dev Cost</Typography>
                        <Typography variant="h6" align="left">$3,400</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 1,pl:'20px' }}>
                        <Typography variant="subtitle1" align="left">Break Event</Typography>
                        <Typography variant="h6" align="left">$3,870</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 1,pl:'20px' }}>
                        <Typography variant="subtitle1" align="left">Actual Revenue</Typography>
                        <Typography variant="h6" align="left">$11,000</Typography>
                    </Box>
                </Box>
                <ClientTable />
                <ClientTable />
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#f6fbff', p: 2, borderRadius: 1 }}>
                    <Box sx={{ flex: 1, p: 1 }}>
                        <Typography variant="subtitle1" align="left">Budget Hours</Typography>
                        <Typography variant="h6" align="left">15 Hr</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 1 }}>
                        <Typography variant="subtitle1" align="left">Logged Hours</Typography>
                        <Typography variant="h6" align="left">12 Hr</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 1 }}>
                        <Typography variant="subtitle1" align="left">Dev Cost</Typography>
                        <Typography variant="h6" align="left">$2,800</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 1 }}>
                        <Typography variant="subtitle1" align="left">Break Event</Typography>
                        <Typography variant="h6" align="left">$3,200</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 1 }}>
                        <Typography variant="subtitle1" align="left">Actual Revenue</Typography>
                        <Typography variant="h6" align="left">$9,000</Typography>
                    </Box>
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#f6fbff', p: 2, borderRadius: 1 }}>
                    <Box sx={{ flex: 1, p: 2}}>
                        <Typography variant="subtitle1" align="left">Budget Hours</Typography>
                        <Typography variant="h6" align="left">25 Hr</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 2,pl:"20px" }}>
                        <Typography variant="subtitle1" align="left">Logged Hours</Typography>
                        <Typography variant="h6" align="left">20 Hr</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 2,pl:"20px" }}>
                        <Typography variant="subtitle1" align="left">Dev Cost</Typography>
                        <Typography variant="h6" align="left">$4,000</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 2,pl:"20px" }}>
                        <Typography variant="subtitle1" align="left">Break Event</Typography>
                        <Typography variant="h6" align="left">$4,200</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ flex: 1, p: 2,pl:"20px" }}>
                        <Typography variant="subtitle1" align="left">Actual Revenue</Typography>
                        <Typography variant="h6" align="left">$12,000</Typography>
                    </Box>
                </Box>
            </CustomTabPanel> */}
        </Box>
    );
}
