let defaultInfo = {
    version: '1.0.10',
    releasedate: new Date(2018,4,7,6,51,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
