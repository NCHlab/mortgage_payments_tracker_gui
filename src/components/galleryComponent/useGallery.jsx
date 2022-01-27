import image1Homepage from '../../images/image1Homepage.png'
import image2PaymentsPage from '../../images/image2PaymentsPage.png'
import image3PaymentsPageEditOn from '../../images/image3PaymentsPageEditOn.png'
import image4AddPayment from '../../images/image4AddPayment.png'
import image5EditPayment from '../../images/image5EditPayment.png'
import image6DeletePayment from '../../images/image6DeletePayment.png'
import image7AllPayments from '../../images/image7AllPayments.png'
import image8AllPaymentsSelected from '../../images/image8AllPaymentsSelected.png'
import image9AllPaymentsFiltering from '../../images/image9AllPaymentsFiltering.png'
import image10Overpayments from '../../images/image10Overpayments.png'
import image11HomeImprovements from '../../images/image11HomeImprovements.png'
import image12TotalsPage from '../../images/image12TotalsPage.png'
import image13LogsPageTable from '../../images/image13LogsPageTable.png'
import image14LogsPageJsonDark from '../../images/image14LogsPageJsonDark.png'
import image15LogsPageJsonLightStringFormatting from '../../images/image15LogsPageJsonLightStringFormatting.png'

const useGallery = () => {

    const images = [
        {
            original: image1Homepage,
            thumbnail: image1Homepage,
            description: "Home page when logged in",
        },
        {
            original: image2PaymentsPage,
            thumbnail: image2PaymentsPage,
            description: "Payments page",
        },
        {
            original: image3PaymentsPageEditOn,
            thumbnail: image3PaymentsPageEditOn,
            description: "Payments page with editing enabled",
        },
        {
            original: image4AddPayment,
            thumbnail: image4AddPayment,
            description: "Adding a new Payment",
        },
        {
            original: image5EditPayment,
            thumbnail: image5EditPayment,
            description: "Editing a Payment",
        },
        {
            original: image6DeletePayment,
            thumbnail: image6DeletePayment,
            description: "Deleting a Payment",
        },
        {
            original: image7AllPayments,
            thumbnail: image7AllPayments,
            description: "All Payments page with filters + selection",
        },
        {
            original: image8AllPaymentsSelected,
            thumbnail: image8AllPaymentsSelected,
            description: "All Payments page with selection and selected total at botton",
        },
        {
            original: image9AllPaymentsFiltering,
            thumbnail: image9AllPaymentsFiltering,
            description: "All Payments page with filtering",
        },
        {
            original: image10Overpayments,
            thumbnail: image10Overpayments,
            description: "Over payments page",
        },
        {
            original: image11HomeImprovements,
            thumbnail: image11HomeImprovements,
            description: "Home Improvements page",
        },
        {
            original: image12TotalsPage,
            thumbnail: image12TotalsPage,
            description: "Calculated Totals for all users",
        },
        {
            original: image13LogsPageTable,
            thumbnail: image13LogsPageTable,
            description: "Logs in a table for Auditing",
        },
        {
            original: image14LogsPageJsonDark,
            thumbnail: image14LogsPageJsonDark,
            description: "Logs as JSON for Auditing - Dark Mode",
        },
        {
            original: image15LogsPageJsonLightStringFormatting,
            thumbnail: image15LogsPageJsonLightStringFormatting,
            description: "Logs as JSON for Auditing - Light Mode + String Logs field",
        }
    ]

    return {
        images
    };
};

export default useGallery;
