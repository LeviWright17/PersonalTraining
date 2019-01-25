export function reducer(state, action) {
    switch (action.type) {

        case 'leviResume':
            return {
                ...state,
                currentlySelectedTraner: action.payload
            };

        default:
            return state;
    }
}