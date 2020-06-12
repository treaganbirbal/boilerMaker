import { createStore, applyMiddleware} from 'redux';
import dummyReducer from './user'
import thunkMiddleware from 'redux-thunk'
import { createLogger }from 'redux-logger'
import thunk from 'redux-thunk';
import '../../public/style.css'

const store = createStore(
    dummyReducer, 
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
)

export default store;
