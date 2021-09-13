import LinkModel from "../Models/LinkModel";

export class LinksAppState {
    public links: LinkModel[] = [];
};

export enum LinksActionType {
    LinksDownloaded= "LinksDownloaded",
    LinkAdded = "LinkAdded",
    LinkUpdated = "LinkUpdated",
    LinkDeleted = "LinkDeleted",
    LinkDownloaded = "LinkDownloaded",
    LinksCleared="LinksCleared"
};

export interface LinkAction {
    type: LinksActionType;
    payload?: any;
};

export function LinksDownloadedAction(links:LinkModel[]): LinkAction {
    return { type: LinksActionType.LinksDownloaded, payload: links };
};

export function LinkDownloadedAction(id: number):LinkAction {
    return { type: LinksActionType.LinkDownloaded, payload: id };
};

export function LinkAddedAction(link: LinkModel): LinkAction {
    return { type: LinksActionType.LinkAdded, payload: link };
};

export function LinkUpdatedAction(link: LinkModel): LinkAction {
    return { type: LinksActionType.LinkUpdated, payload: link };
};

export function LinkDeletedAction(id:number): LinkAction {
    return { type: LinksActionType.LinkDeleted, payload: id };
};

export function LinksClearedAction():LinkAction{
    return {type:LinksActionType.LinksCleared}
};

export function linksReducer(currentState: LinksAppState = new LinksAppState(),action:LinkAction): LinksAppState{
    
    const newState = {...currentState}; 
    
    switch (action.type) {

        case LinksActionType.LinksDownloaded:
            newState.links = action.payload;
            break;

            case LinksActionType.LinkDownloaded:
                newState.links = action.payload;
                break;

        case LinksActionType.LinkAdded:
            newState.links.push(action.payload);
            break;

        case LinksActionType.LinkUpdated:

            const idx = newState.links.findIndex(c => c.id === action.payload.id);
            newState.links[idx] = action.payload;
            break;
            
        case LinksActionType.LinkDeleted:
            newState.links = newState.links.filter(c=>c.id !== action.payload);
            break;
            
        case LinksActionType.LinksCleared:
            newState.links = newState.links=[];
            break;
    };

    return newState;
};