import './MonthContainer.css'
import React from 'react';
export default function MonthContainer(props) {
    return (
        <div className="monthContainer">
            <div className="month-title">
                <strong><p>{props.month}</p></strong>
            </div>
        </div>
    );
}