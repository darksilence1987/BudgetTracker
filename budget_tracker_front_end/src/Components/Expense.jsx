import './Expense.css'
import React from 'react'

export default function Expense(props) {
    return (
        <div className="outer">
            <div className="expense" style={{ borderColor: props.color }}>
                <div className="left-box">
                    <div className="expense-title">
                        <p>{props.title}</p>
                    </div>
                    <div className="expense-category">
                        <p>{props.category}</p>
                    </div>
                </div>
                <div className="expense-amount">
                    <p>{props.amount}</p>
                </div>
            </div>
        </div>
    )
}