import React from 'react';
import './AddExpenseForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const AddExpenseForm = ({ categories, onSaveExpense, onCancel, editingExpense }) => {
    return (
        <div className="add-expense-form">
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const expense = {
                    id: editingExpense ? editingExpense.id : null,
                    title: formData.get('name'),
                    category: formData.get('category'),
                    amount: Number(formData.get('price')),
                    date: formData.get('date')
                };
                onSaveExpense(expense);
            }}>
                <div className="form-class">
                    <div className="form-input">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            defaultValue={editingExpense ? editingExpense.title : ''}
                            required
                        />
                    </div>
                    <div className="form-input">
                        <select
                            name="category"
                            defaultValue={editingExpense ? editingExpense.category : ''}
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            {Object.keys(categories).map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-input">
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            defaultValue={editingExpense ? editingExpense.amount : ''}
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-input">
                        <input
                            type="date"
                            name="date"
                            defaultValue={editingExpense ? editingExpense.date : ''}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <Button variant="success" type="submit">
                            {editingExpense ? 'Update' : 'Save'}
                        </Button>
                        <Button variant="danger" type="button" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddExpenseForm;