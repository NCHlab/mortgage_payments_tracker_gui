import React from 'react'

import { Container, Box, Tab } from '@mui/material'
import { TabPanel, TabContext, TabList } from '@mui/lab'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import PaymentLogsTab from './PaymentLogsTab'
import LoginLogsTab from './LoginLogsTab'
import PaymentLogsTable from './PaymentLogsTable'

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
    const isTouch = isTouchDevice();

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box sx={{ bgcolor: 'background.paper', width: '100%', typography: 'body1', border: '1px solid black' }}>
                    <TabContext value={selectedTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            {!isTouch && (
                                <TabList
                                    sx={{ bgColor: "#000" }}
                                    centered onChange={handleChange} textColor="secondary" indicatorColor="primary">
                                    {/* textColor="secondary" indicatorColor="primary" */}
                                    <Tab label="Payment Table Logs" value="1" />
                                    <Tab label="Payment JSON Logs" value="2" />
                                    <Tab label="Login JSON Logs" value="3" />
                                </TabList>
                            )}

                            {isTouch && (
                                <TabList
                                    sx={{ bgColor: "#000" }}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    onChange={handleChange} textColor="secondary" indicatorColor="primary">
                                    {/* textColor="secondary" indicatorColor="primary" */}
                                    <Tab label="Payment Table Logs" value="1" />
                                    <Tab label="Payment JSON Logs" value="2" />
                                    <Tab label="Login JSON Logs" value="3" />
                                </TabList>
                            )}
                        </Box>

                        <TabPanel value="1">
                            <PaymentLogsTable />
                        </TabPanel>

                        <TabPanel value="2">
                            <PaymentLogsTab />
                        </TabPanel>

                        <TabPanel value="3">
                            <LoginLogsTab />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Logs
