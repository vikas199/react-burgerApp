import React from 'react';
import Burger from '../../Burger/Burger'
import classes from './CheckoutSummary.css'
import Button from '../../UI/Button/Button'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1> we hope it tastes good!!!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.cancelOrder}>CANCEL</Button>
            <Button btnType="Success"
                clicked={props.purchaseOrder}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;