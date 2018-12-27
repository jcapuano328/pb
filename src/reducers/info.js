let defaultInfo = {
    version: '1.0.14',
    releasedate: new Date(2018,11,27,9,22,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
