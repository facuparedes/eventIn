const initialState = {

}



export const rootReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'estoy para que no tire error ;)':
            
            return ':)'
    
        default:
            return state;
    }
}