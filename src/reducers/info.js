let defaultInfo = {
    version: '1.0.0',
    releasedate: new Date(2017,8,17,11,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
