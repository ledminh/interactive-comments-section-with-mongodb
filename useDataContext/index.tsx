import { createContext, useReducer} from "react";

import { DataContextType, StateType, ActionType, DataType, ReducerType, CommentType, ThreadType, ReplyType } from "../TypesAndInterfaces";
import generateID from "../utils/generateID";



export const DataContext = createContext<DataContextType|null>(null);


const initState:StateType = {isLoaded: false};


const reducer:ReducerType = (state:StateType, action:ActionType) => {

    switch (action.type) {
        case 'set-data':
            return {
                isLoaded: true,
                data: action.payload
            };
        case 'add-thread':
            if(!state.isLoaded)
                return state;
            {
                const newThreads = state.data.comments.slice();
                newThreads.push(action.payload);
    
                const newState = {
                    ...state,
                    data: {
                        ...state.data,
                        comments: newThreads
                    }
                }            

                return newState;
            }
            
        case 'set-score/thread':
            if(!state.isLoaded)
                return state;
            {
                const newThreads = state.data.comments.slice();
    
                const thread = newThreads.find(t => t.id === action.payload.id);
                
                (thread as ThreadType).score = action.payload.score;

                const newState = {
                    ...state,
                    data: {
                        ...state.data,
                        comments: newThreads
                    }
                }

                return newState;
            }

        case 'set-score/reply':
            if(!state.isLoaded)
                return state;
            {
                const newThreads = state.data.comments.slice();

                const thread = newThreads.find(t => t.id === action.payload.parentID);
                
                const reply = (thread as ThreadType).replies.find(rep => rep.id === action.payload.id);
                
                (reply as ReplyType).score = action.payload.score; 

                const newState = {
                    ...state,
                    data: {
                        ...state.data,
                        comments: newThreads
                    }
                }

                return newState;
            }
        default:
            throw new Error();
    }

}


const useDataContext: () => DataContextType = () => {
    const [state, dispatch] = useReducer(reducer, initState);


    

    /*********************************************************/

    const setData = (data:DataType) => dispatch({
        type: 'set-data',
        payload: data
    });

    const addThread = (content:string) => {
        if(state.isLoaded) {
            const thread:ThreadType = {
                id: generateID(), 
                content: content, 
                createdAt: (new Date()).toUTCString(), 
                score: 0, 
                user: state.data.currentUser,
                replies: []
            }

            dispatch({
                type: 'add-thread',
                payload:thread
            })
        
        
        }
    }


    function setScore (type:'THREAD'|'REPLY', id:number, score:number, parentID?:number):void {
        if(!state.isLoaded) return;
        
        if(type === 'THREAD')
            dispatch({type:'set-score/thread', payload:{id:id, score: score}})
        else {
            dispatch({type:'set-score/reply', payload:{id:id, score: score, parentID:parentID as number}})
        }
    }



    return {
        data: state.isLoaded? state.data : null,
        setData,
        addThread,
        setScore
    }
}


export default useDataContext;