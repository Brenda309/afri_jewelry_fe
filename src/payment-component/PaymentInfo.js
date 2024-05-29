// src/components/PaymentInfo.js
import React from 'react';
import './PaymentInfo.css';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from 'mdb-react-ui-kit';
import visaLogo from '../assets/visa.png';

function PaymentInfo({ onChange, values, onNextStep }) {
  return (
    <div className="payment-info form-section">
      <h2>Payment Information</h2>
      <MDBContainer fluid className="py-5 gradient-custom">
        <MDBRow className="d-flex justify-content-center py-5">
          <MDBCol md="7" lg="5" xl="4">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <MDBRow className="d-flex align-items-center mb-3">
                  <MDBCol size="9">
                    <MDBInput
                      label="Card Number"
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3457"
                      value={values.cardNumber}
                      onChange={onChange}
                    />
                  </MDBCol>
                  <MDBCol size="3">
                    <img src={visaLogo} alt="Visa" width="48px" />
                  </MDBCol>
                </MDBRow>

                <MDBRow className="d-flex align-items-center mb-3">
                  <MDBCol size="12">
                    <MDBInput
                      label="Cardholder's Name"
                      id="cardholderName"
                      name="cardholderName"
                      type="text"
                      placeholder="Cardholder's Name"
                      value={values.cardholderName}
                      onChange={onChange}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow className="d-flex align-items-center mb-3">
                  <MDBCol size="7">
                    <MDBInput
                      label="Expiration"
                      id="expirationDate"
                      name="expirationDate"
                      type="text"
                      placeholder="MM/YYYY"
                      value={values.expirationDate}
                      onChange={onChange}
                    />
                  </MDBCol>
                  <MDBCol size="3">
                    <MDBInput
                      label="CVV"
                      id="cvv"
                      name="cvv"
                      type="text"
                      placeholder="&#9679;&#9679;&#9679;"
                      value={values.cvv}
                      onChange={onChange}
                    />
                  </MDBCol>
                  <MDBCol size="3">
                    <MDBBtn color="info" rounded size="lg" onClick={onNextStep}>
                      <MDBIcon fas icon="arrow-right" />
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default PaymentInfo;
