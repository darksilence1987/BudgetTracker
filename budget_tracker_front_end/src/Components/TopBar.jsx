// TopBar.jsx
import './TopBar.css';
import React from 'react';
import { PlusCircle } from 'react-bootstrap-icons';

export default function TopBar({ onAddClick }) {
    return (
        <div className="topbar">
            <div className="title">
                <h5>Budget Tracker</h5>
            </div>
            <button className="add-button" onClick={onAddClick}>
                <PlusCircle />
            </button>
        </div>
    );
}