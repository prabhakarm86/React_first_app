import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { InitialFeedback } from './forms'; 
import { createForms } from 'react-redux-form';

import thunk from 'redux-thunk';    // middlewares
import logger from 'redux-logger';  // middlewares



export const ConfigureStore = () =>{
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            leaders: Leaders,
            comments: Comments,
            promotions: Promotions,
            ...createForms({
                feedback: InitialFeedback
            }),
        }),
        applyMiddleware(thunk, logger)
    );
    
    return store;
}
