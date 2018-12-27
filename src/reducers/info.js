let defaultInfo = {
    version: '1.0.16',
    releasedate: new Date(2018,11,27,10,25,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
