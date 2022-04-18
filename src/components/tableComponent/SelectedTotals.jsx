import { Grid, CardContent, Card } from '@mui/material';

const SelectedTotals = ({ handleSelectedRows, selectedFlatRows }) => {
    return (
        <Grid item xs={12}>
            <Card elevation={12} sx={{ height: '50px' }}>
                <CardContent sx={{ fontWeight: 'bold' }}>
                    Total Selected: {handleSelectedRows(selectedFlatRows)}
                </CardContent>

            </Card>
        </Grid>
    );
};

export default SelectedTotals;
