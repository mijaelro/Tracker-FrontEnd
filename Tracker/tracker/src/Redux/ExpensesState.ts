import ExpenseModel from "../Models/ExpenseModel";

export class ExpensesAppState {
    public expenses: ExpenseModel[] = [];
};

export enum ExpensesActionType {
    ExpensesDownloaded= "ExpensesDownloaded",
    ExpenseAdded = "ExpenseAdded",
    ExpenseUpdated = "ExpenseUpdated",
    ExpenseDeleted = "ExpenseDeleted",
    ExpensesCleared = "ExpensesCleared"
};

export interface ExpenseAction {
    type: ExpensesActionType;
    payload?: any;
};

export function ExpensesDownloadedAction(expenses: ExpenseModel[]): ExpenseAction {
    return { type: ExpensesActionType.ExpensesDownloaded, payload: expenses };
};

export function ExpenseAddedAction(expense: ExpenseModel): ExpenseAction {
    return { type: ExpensesActionType.ExpenseAdded, payload: expense };
};

export function ExpenseUpdatedAction(expense: ExpenseModel): ExpenseAction {
    return { type: ExpensesActionType.ExpenseUpdated, payload: expense };
};

export function ExpenseDeletedAction(id:number): ExpenseAction {
    return { type: ExpensesActionType.ExpenseDeleted, payload: id };
};

export function ExpensesClearedAction():ExpenseAction{
    return {type:ExpensesActionType.ExpensesCleared}
}

export function expensesReducer(currentState: ExpensesAppState = new ExpensesAppState(),action:ExpenseAction): ExpensesAppState{
    
    const newState = {...currentState}; 
    
    switch (action.type) {
        case ExpensesActionType.ExpensesDownloaded:
            newState.expenses = action.payload;
            break;
        case ExpensesActionType.ExpenseAdded:
            newState.expenses.push(action.payload);
            break;

        case ExpensesActionType.ExpenseUpdated:

            const idx = newState.expenses.findIndex(c => c.id === action.payload.id);
            newState.expenses[idx] = action.payload;
            break;

        case ExpensesActionType.ExpenseDeleted:
            newState.expenses = newState.expenses.filter(c=>c.id !== action.payload);
            break;
            
        case ExpensesActionType.ExpensesCleared:
                newState.expenses = newState.expenses=[];
                break;
    };

    return newState;
};