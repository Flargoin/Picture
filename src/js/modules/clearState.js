const clearState = (state) => {
    Object.keys(state).forEach(key => {
        delete state[key];
    });
}

export default clearState;