import { Typography } from '@mui/material';

const CautionInfoTypography = ({ extraText }) => {
    return (
        <Typography component='div' sx={{ color: '#c71616', fontSize: '14px' }}>
            *Total shows all data, ignores pagination. {extraText}
        </Typography>
    );
};

export default CautionInfoTypography;
