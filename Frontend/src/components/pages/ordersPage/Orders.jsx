import React, { useEffect, useState } from 'react';
import style from './Orders.module.css';
import { getOrders } from '../../../base/api';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const options = {
        weekday: 'short',
        day: 'numeric', 
        month: 'long'   
    }

    useEffect(()=>{
        setIsLoading(true);
        const fetchOrderDetails = async () =>{
            await getOrders(setOrders);
        }
        fetchOrderDetails();
        setIsLoading(false);
    }, [])
  return (
    <>
    {!isLoading && 
        <div className={`${style.orderSummaryPage} paddingSide`}>
            <h1 className='heading'>Orders</h1>
            <>
            <div className={style.orderContainer}>
                {orders.map(order => (
                    <div key={order._id} className={style.order} onClick={()=> navigate(`/order-details/${order._id}`)}>
                        <div className={style.orderImages} style={{gridTemplateColumns: `repeat(${order.orderItems.length}, ${100/order.orderItems.length}px)`}}>
                            {order.orderItems.map(item => <img className={style.orderImg} key={item.product._id} src={`http://localhost:3000/api/product/getImage/${item.product.images[item.product.images.length - 1]}`} alt="image" /> )}
                        </div>
                        <div className={style.textArea}>
                        {order.orderItems.length > 1 ? <h3 className={style.orderTitle}> {order.orderItems.length} items ordered</h3> : 
                        <h3 className={style.orderTitle}> {order.orderItems[0].name} </h3> }
                        <h3 className={style.deliveryDate}>{JSON.stringify(new Date(Date.now())) >= JSON.stringify(new Date(order.deliveredAt)) ? "Delivered" : `Arriving on ${new Date(order.deliveredAt).toLocaleDateString('en-US', options)} `}</h3>
                        </div>
                    </div>
                ))}
            </div>
            </>
        </div>
    }
    </>
  )
}

export default Orders
