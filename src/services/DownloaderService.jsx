
import _axios from './httpService'

const DownloaderService = () => {

    const DownloadXLSX = async (page) => {

        try {

            const headers = { 'Content-Type': 'blob' };
            const response = await _axios.get(`/download/${page}`, { responseType: 'arraybuffer' }, headers)

            console.log(response)
            console.log(response.headers['Content-Disposition'])


            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Payments-${Date.now()}.xlsx`);
            document.body.appendChild(link);
            link.click();

        } catch (error) {

        }



    }

    return {
        DownloadXLSX
    }
}

export default DownloaderService
