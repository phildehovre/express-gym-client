import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './Form.css'
import { membershipPaymentTypes } from '../const/membershipTypes';
import StripePayment from './StripePayment';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

const PaymentForm = ({ onSubmit, paymentDetails }) => {
    const [paymentPeriod, setPaymentPeriod] = useState()
    const [clientSecret, setClientSecret] = useState()
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: paymentDetails });
    
    const options = {
        clientSecret,
    }

    // Initiate 
    useEffect(() => {
        if (!paymentPeriod) {
            setPaymentPeriod(membershipPaymentTypes['monthly'])
        }
    }, [])

    // Fetch necessary credentials from server
    useEffect(() => {
        (async() => {
        if (paymentPeriod) {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/checkout/create-payment-intent`, {
                        method: 'POST',
                        // body: JSON.stringify({amount: parseFloat(paymentPeriod.price) * 100, currency: "usd"}),
                        body: JSON.stringify({amount: 50, currency: 'usd'}),
                        credentials: 'include',
                        headers: {
                            'Access-Control-Allow-Origin': 'no-cors',
                            'Content-Type': 'application/json' 
                        },
                    })
                    const secret = await res.json()
                    setClientSecret(secret.clientSecret)
            } catch (err) {
                throw new Error(err)
            }
        }
        })()
    }, [paymentPeriod])


    useEffect(() => {
        if (paymentDetails) {
            Object.keys(paymentDetails).forEach((key) => {
                setValue(key, paymentDetails[key]);
            });
        }
    }, [setValue, paymentDetails]);

    return (
        <div className="">
            <form className="form_ctn" onSubmit={handleSubmit(onSubmit)}>
                <h2>Membership</h2>
                <div className="input-row">
                    <div className="control flex-row">
                            {Object.keys(membershipPaymentTypes).map((item, index) => {
                                const type = membershipPaymentTypes[item]
                               return (
                                <div className={`membership_wrapper ${paymentPeriod == type && 'selected'}`} 
                                    onClick={() => {setPaymentPeriod(type)}} 
                                    key={type + index}>
                                    <label htmlFor="membership">
                                        <input 
                                            type="radio" name="membership" checked={type === paymentPeriod} value={paymentPeriod} {...register('payment_period', {required: 'Please select a payment period'})}/>
                                        <h2>{type.label}</h2>
                                        <p>{type.price}$</p>
                                    </label>
                                    <p>{type.description}</p>
                                </div>
                            )}
                        )}
                    </div>
                </div>
                <h2>IBAN</h2>
                <div className="input-row">
                    <div className="control">
                        <label htmlFor="account_holder">
                            Account holder
                            <input
                                type="text"
                                {...register('account_holder', { required: "Account holder name is required" })}
                                className={errors.account_holder ? "error" : ""}
                            />
                        </label>
                        {errors.account_holder && <p className="error">{errors.account_holder.message}</p>}
                    </div>
                    <div className="control">
                        <label htmlFor="iban">
                            Account IBAN
                            <input
                                type="text"
                                {...register('iban', { required: "IBAN is required" })}
                                className={errors.iban ? "error" : ""}
                            />
                        </label>
                        {errors.iban && <p className="error">{errors.iban.message}</p>}
                    </div>
                </div>
                <h2>Your first payment</h2>
                <p>{paymentPeriod && paymentPeriod.reminder}</p>
          
            </form>
            {
                clientSecret &&
                    <Elements stripe={stripePromise} options={options}>
                        <StripePayment handleSubmitRegistration={onSubmit}/>
                    </Elements>
            }
        </div>
    );
};

export default PaymentForm;
