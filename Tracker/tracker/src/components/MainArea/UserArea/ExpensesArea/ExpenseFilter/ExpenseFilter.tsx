import "./ExpenseFilter.css";

interface ExpenseFilterProps{
    onSaveFilterValue:any;
    selected:any;
};

function ExpenseFilter(props:ExpenseFilterProps): JSX.Element {

    const selectedOptionHandler = (event:any)=>{
        props.onSaveFilterValue(event.target.value);
    };

    return (
        <div className="ExpenseFilter">
             <span>Filter by year</span> 
			 <div className='ExpenseFilterControl'>
           
              <select value={props.selected} onChange={selectedOptionHandler}>
                  <option value='2022'>2022</option>
                  <option value='2021'>2021</option>
                  <option value='2020'>2020</option>
                  <option value='2019'>2019</option>
               </select>
          </div>
        </div>
    );
};

export default ExpenseFilter;
