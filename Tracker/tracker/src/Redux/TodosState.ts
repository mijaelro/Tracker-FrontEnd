import TodoModel from "../Models/TodoModel";

export class TodosAppState {
    public todos: TodoModel[] = [];
};

export enum TodosActionType {
    TodosDownloaded= "TodosDownloaded",
    TodoAdded = "TodoAdded",
    TodoUpdated = "TodoUpdated",
    TodoDeleted = "TodoDeleted",
    TodoDownloaded = "TodoDownloaded",
    TodosCleared = "TodosCleared"
};

export interface TodoAction {
    type:TodosActionType;
    payload?: any;
};

export function TodosDownloadedAction(Todos: TodoModel[]): TodoAction {
    return { type: TodosActionType.TodosDownloaded, payload: Todos };
};

export function TodoDownloadedAction(id: number):TodoAction {
    return { type: TodosActionType.TodoDownloaded, payload: id };
};

export function TodoAddedAction(Todo: TodoModel):TodoAction {
    return { type: TodosActionType.TodoAdded, payload: Todo };
};

export function TodoUpdatedAction(Todo:TodoModel): TodoAction {
    return { type: TodosActionType.TodoUpdated, payload: Todo };
};

export function TodoDeletedAction(id:number): TodoAction {
    return { type: TodosActionType.TodoDeleted, payload: id };
};

export function TodosClearedAction():TodoAction{
    return{type:TodosActionType.TodosCleared}
};

export function todosReducer(currentState: TodosAppState = new TodosAppState(),action:TodoAction): TodosAppState{
    
    const newState = {...currentState}; 
    
    switch (action.type) {

        case TodosActionType.TodosDownloaded:
            newState.todos = action.payload;
            break;
            
            case TodosActionType.TodoDownloaded:
                newState.todos = action.payload;
                break;

        case TodosActionType.TodoAdded:
            newState.todos.push(action.payload);
            break;

        case TodosActionType.TodoUpdated:

            const idx = newState.todos.findIndex(c => c.id === action.payload.id);
            newState.todos[idx] = action.payload;
            break;

        case TodosActionType.TodoDeleted:
            newState.todos = newState.todos.filter(c=>c.id !== action.payload);
            break;

        case TodosActionType.TodosCleared:
                newState.todos = newState.todos=[];
            break;    
    };

    return newState;
};