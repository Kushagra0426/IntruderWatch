import React from 'react';
import axios from 'axios';
import Constants from '../Constants';

const Subscription = () => {
    const backendUrl = Constants.BACKEND_URL;

    const razorpayKeyId = Constants.RAZORPAY_KEY_ID;

    const handleCheckout = async () => {
        const response = await axios.post(`${backendUrl}/api/create-order/`);
        const { id } = response.data;

        const options = {
            key: razorpayKeyId,
            amount: 5000, // Amount in paisa (e.g., ₹50.00)
            currency: 'INR',
            name: 'Subscription Plan',
            description: 'Payment for subscription',
            order_id: id, // This is the order ID that you received from the backend
            handler: function (response) {
                alert('Payment Successful!');
                console.log(response);
            },
            modal: {
                ondismiss: function() {
                    // Remove the tokens from localStorage when payment is cancelled
                    localStorage.removeItem('rzp_checkout_anon_id');
                    localStorage.removeItem('rzp_device_id');
                }
            },
            theme: {
                color: '#F37254',
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
        title: {
            fontSize: '2rem',
            marginBottom: '20px',
            color: '#333',
        },
        button: {
            padding: '10px 20px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#F37254',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#E24E3B',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Subscribe Now</h1>
            <button 
                style={styles.button} 
                onClick={handleCheckout}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            >
                Subscribe for ₹50
            </button>
        </div>
    );
};

export default Subscription;
