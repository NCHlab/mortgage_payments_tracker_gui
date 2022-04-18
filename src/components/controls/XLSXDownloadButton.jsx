import { Button } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

const XLSXDownloadButton = ({ handleDownload, page }) => {
    return (
        <Button
            variant="outlined"
            onClick={() => handleDownload("XLSX", page)}
            sx={{
                my: 1, color: '#dedede', border: '2px solid #000000', backgroundImage: 'linear-gradient(to left, rgba(166, 0, 0), rgba(43, 43, 43))',
                ':hover': {
                    backgroundImage: `linear-gradient(to right, #a60000, #2b2b2b)`,
                    color: '#36c9ff',
                    border: '2px solid #000000'
                }
            }}> <DownloadOutlinedIcon />XLSX Download
        </Button>
    )
}

export default XLSXDownloadButton
