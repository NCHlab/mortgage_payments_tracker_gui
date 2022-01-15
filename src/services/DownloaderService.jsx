
import _axios from './httpService'
import { parseISO, format } from 'date-fns'

const DownloaderService = () => {

    const DownloadXLSX = async (page) => {

        try {
            const headers = { 'Content-Type': 'blob' };
            const response = await _axios.get(`/download/${page}`, { responseType: 'arraybuffer' }, headers)



            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            const curr_date = new Date();
            const date = format(parseISO(curr_date.toISOString()), "dd-MM-yyyy")
            link.href = url;
            link.setAttribute('download', `Payments-${date}.xlsx`);
            document.body.appendChild(link);
            link.click();

        } catch (error) {

            // console.log(error)

            return error.response.statusText

        }
    }


    const DownloadCSV = async (page) => {

        try {
            const headers = { 'Content-Type': 'blob' };
            const response = await _axios.get(`/download/csv/${page}`, { responseType: 'arraybuffer' }, headers)

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            const curr_date = new Date();
            const date = format(parseISO(curr_date.toISOString()), "dd-MM-yyyy")
            link.href = url;
            link.setAttribute('download', `Payments-${date}.csv`);
            document.body.appendChild(link);
            link.click();

        } catch (error) {

        }
    }

    return {
        DownloadXLSX,
        DownloadCSV
    }
}

export default DownloaderService
