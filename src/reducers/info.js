let defaultInfo = {
    version: '1.0.3',
    releasedate: new Date(2017,9,1,10,0,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
