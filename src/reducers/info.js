let defaultInfo = {
    version: '1.0.12',
    releasedate: new Date(2018,11,22,10,34,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
