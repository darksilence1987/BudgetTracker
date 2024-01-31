import './Expense.css';
import React, { useState } from 'react';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

export default function Expense({ title, category, amount, color, onEdit, onDelete }) {
    const [isShrunk, setIsShrunk] = useState(false);

    const toggleShrink = () => {
        setIsShrunk(!isShrunk);
    };

    return (
        <div className="outer" onClick={toggleShrink}>
            <div className={`expense ${isShrunk ? 'shrunk' : ''}`} style={{ borderColor: color }}>
                <div className="left-box">
                    <div className="expense-title">
                        <p>{title}</p>
                    </div>
                    <div className="expense-category">
                        <p>{category}</p>
                    </div>
                </div>
                <div className="expense-amount">
                    <p>{amount}</p>
                </div>
            </div>

            {isShrunk && (
                <div className="expense-buttons">
                    <button onClick={onEdit}><PencilSquare /></button>
                    <button onClick={onDelete}><Trash /></button>
                </div>
            )}
        </div>
    );
}