import React from 'react'

import { Container, Box, Tab } from '@mui/material'
import { TabPanel, TabContext, TabList } from '@mui/lab'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import PaymentLogsTab from './PaymentLogsTab'
import LoginLogsTab from './LoginLogsTab'

const theme = createTheme({
    palette: {
        primary: {
            main: '#7e0505'
        },
        secondary: {
            main: '#000000'
        }
    }
});

const Logs = () => {

    const [selectedTab, setSelectedTab] = React.useState('1');

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box sx={{ bgcolor: 'background.paper', width: '100%', typography: 'body1', border: '1px solid black' }}>
                    <TabContext value={selectedTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                                sx={{ bgColor: "#000" }}
                                centered onChange={handleChange} textColor="secondary" indicatorColor="primary">
                                {/* textColor="secondary" indicatorColor="primary" */}
                                <Tab label="Payment Information Logs" value="1" />
                                <Tab label="Login Logs" value="2" />
                            </TabList>
                        </Box>

                        <TabPanel value="1">
                            <PaymentLogsTab />
                        </TabPanel>

                        <TabPanel value="2">
                            <LoginLogsTab />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Logs
