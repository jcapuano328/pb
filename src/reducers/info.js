let defaultInfo = {
    version: '1.0.6',
    releasedate: new Date(2017,9,8,9,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
