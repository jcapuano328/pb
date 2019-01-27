let defaultInfo = {
    version: '1.0.24',
    releasedate: new Date(2019,0,23,20,5,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
