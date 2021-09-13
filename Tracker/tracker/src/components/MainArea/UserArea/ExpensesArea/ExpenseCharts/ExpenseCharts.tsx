import ExpenseModel from "../../../../../Models/ExpenseModel";
import Charts from "../Charts/Charts";
import "./ExpenseCharts.css";

interface ExpensesChartsProps{
    expenses:ExpenseModel[];
};

function ExpenseCharts(props:ExpensesChartsProps): JSX.Element {

    const chartDataPoints = [
        {label:'Jan',value:0},
        {label:'Feb',value:0},
        {label:'Mar',value:0},
        {label:'Apr',value:0},
        {label:'May',value:0},
        {label:'Jun',value:0},
        {label:'Jul',value:0},
        {label:'Aug',value:0},
        {label:'Sep',value:0},
        {label:'Oct',value:0},
        {label:'Nov',value:0},
        {label:'Dec',value:0},
    ];

    for(const expense of props.expenses){
        const expenseMonth =new Date(expense.purchaseDate).getMonth();
        chartDataPoints[expenseMonth].value += expense.price;
    }
    return (
        <div className="ExpenseCharts">
				<Charts dataPoints={chartDataPoints} />
        </div>
    );
};

export default ExpenseCharts;
