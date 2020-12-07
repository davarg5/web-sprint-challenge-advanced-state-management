import { FETCH_SMURFS_START, FETCH_SMURFS_SUCCESS, FETCH_SMURFS_FAILURE, ADD_SMURF} from './../actions';

const initialState = {
    isLoading: false,
    smurfsData: [],
    errorMessage: ''
}

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case FETCH_SMURFS_START:
            return {...state,
                isLoading: true,
                errorMessage: ''
            }
        case FETCH_SMURFS_SUCCESS:
            return {...state,
                isLoading: false,
                smurfsData: action.payload,
            }
        case FETCH_SMURFS_FAILURE:
            return {...state,
                isLoading: false,
                errorMessage: action.payload
            }
        case ADD_SMURF:
            return {...state,
                smurfsData: [...state.smurfsData, action.payload]
            }

        default:
            return state;
    }
}