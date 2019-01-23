let defaultInfo = {
    version: '1.0.22',
    releasedate: new Date(2019,0,22,21,48,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
