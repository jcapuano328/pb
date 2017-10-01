let defaultInfo = {
    version: '1.0.2',
    releasedate: new Date(2017,8,30,14,3,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
