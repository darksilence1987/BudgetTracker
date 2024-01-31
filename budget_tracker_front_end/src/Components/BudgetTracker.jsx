import React, { useState, useEffect } from 'react';
import DoughnutChart from "./DoughnutChart";
import './BudgetTracker.css';
import TopBar from "./TopBar";
import MonthContainer from "./MonthContainer";
import Expense from "./Expense";
import axios from 'axios';
import moment from 'moment'; // You'll need to install moment.js for date manipulation
import AddExpenseForm from "./AddExpenseForm";
import TopBarWithoutButton from "./TopBarWithoutButton";

const categories = {
    'Transportation': 'rgb(153,50,204)',
    'Entertainment': 'rgb(255,99,71)',
    'Food': 'rgb(143,188,143)',
    'Personal': 'rgb(0,191,255)',
};

const sumExpensesByCategory = (allExpenses) => {
    return Object.keys(categories).reduce((acc, category) => {
        const sum = allExpenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
        acc[category] = sum;
        return acc;
    }, {});
};

export default function BudgetTracker() {
    const [monthlyExpenses, setMonthlyExpenses] = useState({});
    const [showForm, setShowForm] = useState(false);




    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/expenses');
            setMonthlyExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);


    const handleAddClick = () => {
        setShowForm(true); // Show the form when the PlusCircle is clicked
    };
    const handleCancel = () => {
        setShowForm(false);
    };

    const handleSaveExpense = async (expense) => {
        try {
            await axios.post('http://localhost:8080/api/expenses', expense);
            // Fetch the updated expenses data
            await fetchExpenses();
            setShowForm(false); // Hide the form after saving and fetching updated data
        } catch (error) {
            console.error("Error posting expense:", error);
        }
    };

    if (showForm) {
        return (
            <div className="budget-tracker">
                <TopBarWithoutButton/>
                <AddExpenseForm categories={categories} onSaveExpense={handleSaveExpense} onCancel={handleCancel}/>
            </div>
        );
    }


    // Flatten expenses from all years and months into one array and sort by date
    const allExpensesSorted = Object.entries(monthlyExpenses).flatMap(([year, months]) =>
        Object.entries(months).flatMap(([month, expenses]) =>
            expenses.map(expense => ({
                ...expense,
                date: new Date(`${month} 01, ${year}`) // Assuming all expenses occurred on the first of the month for simplicity
            }))
        )
    ).sort((a, b) => b.date - a.date); // Sort by date descending

    // Filter expenses for the last 12 months for chart
    const today = moment();
    const lastYear = moment().subtract(12, 'months');
    const expensesLast12Months = allExpensesSorted.filter(expense =>
        moment(expense.date).isBetween(lastYear, today)
    );

    const expensesByCategory = sumExpensesByCategory(expensesLast12Months);
    const chartData = {
        labels: Object.keys(categories),
        datasets: [{
            label: 'Expenses',
            data: Object.values(expensesByCategory),
            backgroundColor: Object.values(categories),
            borderColor: 'rgb(255, 255, 255)',
            borderWidth: 2,
        }],
    };

    return (
        <div className="budget-tracker">
            <TopBar onAddClick={handleAddClick} />
            <div className="chart">
                <DoughnutChart data={chartData} />
            </div>
            {
                allExpensesSorted.map((expense, i) => (
                    <React.Fragment key={i}>
                        {i === 0 || new Date(allExpensesSorted[i - 1].date).getMonth() !== new Date(expense.date).getMonth() ||
                        new Date(allExpensesSorted[i - 1].date).getFullYear() !== new Date(expense.date).getFullYear() ? (
                            <MonthContainer month={moment(expense.date).format('MMMM YYYY')} />
                        ) : null}
                        <Expense
                            title={expense.title}
                            category={expense.category}
                            amount={`$${expense.amount}`}
                            color={categories[expense.category]}
                        />
                    </React.Fragment>
                ))
            }
        </div>
    );
}