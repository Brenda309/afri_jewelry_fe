import React, { useState, useContext } from 'react';
import CustomerInfo from './CustomerInfo';
import ShippingInfo from './ShippingInfo';
import PaymentInfo from './PaymentInfo';
import OrderSummary from './OrderSummary';
import { CartContext } from '../product-component/CartContent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function CheckoutPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({ name: '', lastName: '', email: '' });
  const [shippingInfo, setShippingInfo] = useState({ address: '', city: '', postalCode: '', country: '' });
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', cardholderName: '', expirationDate: '', cvv: '' });
  const navigate = useNavigate();

  const handleCustomerChange = (e) => setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  const handleShippingChange = (e) => setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  const handlePaymentChange = (e) => setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });

  const isCustomerInfoValid = customerInfo.name && customerInfo.lastName && customerInfo.email;
  const isShippingInfoValid = shippingInfo.address && shippingInfo.city && shippingInfo.postalCode && shippingInfo.country;
  const isPaymentInfoValid = paymentInfo.cardNumber && paymentInfo.cardholderName && paymentInfo.expirationDate && paymentInfo.cvv;

  const handleNextStep = () => {
    if (currentStep === 1 && isCustomerInfoValid) setCurrentStep(2);
    if (currentStep === 2 && isShippingInfoValid) setCurrentStep(3);
    if (currentStep === 3 && isPaymentInfoValid) setCurrentStep(4);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCustomerInfoValid && isShippingInfoValid && isPaymentInfoValid) {
        const order = {
            customerName: customerInfo.name,
            customerLastName: customerInfo.lastName,
            email: customerInfo.email,
            address: shippingInfo.address,
            city: shippingInfo.city,
            postalCode: shippingInfo.postalCode,
            country: shippingInfo.country,
            status: 'confirmed',
            items: cartItems.map(item => ({
                product: item.product,
                quantity: item.quantity
            })),
        };

        try {
            const response = await axios.post('http://localhost:8080/api/orders', order);
            setCartItems([]);
            console.log('Order placed:', response.data);
            navigate('/order-confirmation'); // Navigate to order confirmation page or show a success message
        } catch (error) {
            console.error('Error placing order:', error);
        }
    }
  };

  return (
    <form className="checkout-page" onSubmit={handleSubmit}>
      {currentStep === 1 && <CustomerInfo onChange={handleCustomerChange} values={customerInfo} />}
      {currentStep === 2 && <ShippingInfo onChange={handleShippingChange} values={shippingInfo} />}
      {currentStep === 3 && <PaymentInfo onChange={handlePaymentChange} values={paymentInfo} />}
      {currentStep === 4 && <OrderSummary items={cartItems} />}

      <div className="navigation-buttons">
        {currentStep < 4 && (
          <button
            type="button"
            onClick={handleNextStep}
            disabled={
              (currentStep === 1 && !isCustomerInfoValid) ||
              (currentStep === 2 && !isShippingInfoValid) ||
              (currentStep === 3 && !isPaymentInfoValid)
            }
          >
            →
          </button>
        )}
        {currentStep === 4 && <button type="submit">Place Order</button>}
      </div>
    </form>
  );
}

export default CheckoutPage;
