let defaultInfo = {
    version: '1.0.13',
    releasedate: new Date(2018,11,26,10,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
