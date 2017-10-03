let defaultInfo = {
    version: '1.0.4',
    releasedate: new Date(2017,9,3,9,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
