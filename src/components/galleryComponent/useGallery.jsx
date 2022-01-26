import image1Homepage from '../images/image1Homepage.png'
import image2PaymentsPage from '../images/image2PaymentsPage.png'
import image3PaymentsPageEditOn from '../images/image3PaymentsPageEditOn.png'
import image4AddPayment from '../images/image4AddPayment.png'
import image5EditPayment from '../images/image5EditPayment.png'
import image6DeletePayment from '../images/image6DeletePayment.png'
import image7AllPayments from '../images/image7AllPayments.png'
import image8AllPaymentsSelected from '../images/image8AllPaymentsSelected.png'
import image9AllPaymentsFiltering from '../images/image9AllPaymentsFiltering.png'
import image10Overpayments from '../images/image10Overpayments.png'
import image11HomeImprovements from '../images/image11HomeImprovements.png'

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
        }
    ]

    return {
        images
    };
};

export default useGallery;
