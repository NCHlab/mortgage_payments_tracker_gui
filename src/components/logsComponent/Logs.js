import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Container, Box } from '@mui/material'


import PaymentLogsTab from './PaymentLogsTab'


import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#7e0505'
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
                        {/* <Container> */}
                        <TabPanel value="1">
                            <PaymentLogsTab />
                        </TabPanel>


                        <TabPanel value="2">Login Logs</TabPanel>
                        {/* </Container> */}
                    </TabContext>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Logs
