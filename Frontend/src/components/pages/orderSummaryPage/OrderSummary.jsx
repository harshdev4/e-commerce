import React, { useContext, useEffect, useState } from 'react'
import style from './OrderSummary.module.css';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../../base/api';
import {AuthUserState} from '../../../context/authUserContext';

const OrderSummary = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const options = {
        weekday: 'short',
        day: 'numeric', 
        month: 'long'   
    };

    const {state} = useContext(AuthUserState)

    useEffect(()=>{
        setIsLoading(true);
        const fetchOrderDetails = async () =>{
            await getOrder(orderId, setOrderDetails);
        }
        fetchOrderDetails();
        setIsLoading(false);
    }, [orderId]);
    

  return (
    <>
    {!isLoading && orderDetails && orderDetails.orderItems &&
        <div className={`${style.orderSummaryPage} paddingSide`}>
            <h1 className='heading'>Order Summary</h1>
            <div className={style.orderView}>
                    {orderDetails.orderItems.map((item, index)=>(
                        <div key={index} className={style.order}>
                            <div className={style.top}>
                                <div className={style.textArea}>
                                    <p className={style.name}>{item.product.name}</p>
                                    <div className={style.subTotalDiv}>
                                        <h3 className={style.totalHeading}>Quantity:</h3> <span className={style.price}>{item.quantity}</span>
                                        <h3 className={style.totalHeading}>Sub Total:</h3> <span className={style.price}>₹{(item.product.offerPrice*item.quantity).toLocaleString()}</span>
                                        <h3 className={style.totalHeading}>Shipping:</h3> <span className={style.price}>₹0.00</span>
                                        <h3 className={style.totalHeading}>Total:</h3> <span className={style.price}>₹{(item.product.offerPrice*item.quantity).toLocaleString()}</span>
                                    </div>
                                </div>
                                <img className={style.image} src={`http://localhost:3000/api/product/getImage/${item.product.images[item.product.images.length - 1]}`} alt="" />
                            </div>
                        </div>
                    ))}
                <div className={style.middleDetails}>
                    <p className={style.deliveryDate}>{JSON.stringify(new Date(Date.now())) >= JSON.stringify(new Date(orderDetails.deliveredAt)) ? "Delivered" : `Arriving on ${new Date(orderDetails.deliveredAt).toLocaleDateString('en-US', options)} `}</p>
                    <div className={style.deliveryAddContainer}>
                        <h3 className={style.deliverHeading}>Deliver to:</h3>
                        <h3 className={style.userName}>{state?.userName}</h3>
                        <p className={style.deliveryAdd}>{orderDetails?.shippingAddress.street}, {orderDetails?.shippingAddress.city}, {orderDetails?.shippingAddress.postalCode}</p>
                    </div>
                </div>

                <div className={style.bottomDetails}>
                    <div className={style.subTotalDiv}>
                        <h3 className={style.totalHeading}>Payment:</h3> <span className={style.price}>{orderDetails.paymentMethod}</span>
                        <h3 className={style.totalHeading}>Sub Total:</h3> <span className={style.price}>₹{(orderDetails.totalPrice/100).toLocaleString()}</span>
                        <h3 className={style.totalHeading}>Shipping:</h3> <span className={style.price}>₹0.00</span>
                        <h3 className={style.totalHeading}>Total:</h3> <span className={style.price}>₹{(orderDetails.totalPrice/100).toLocaleString()}</span>
                    </div>
                </div>
            </div>            
        </div>
    }
    </>
  )
}

export default OrderSummary
