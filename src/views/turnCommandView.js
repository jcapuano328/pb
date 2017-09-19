import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icons from '../res';
import getCommand from '../selectors/command';

var TurnCommandView = React.createClass({
    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width ||
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },    
    render() {
        //console.log(this.props);        
        let width = this.state.width || 96;
        let height = this.state.height || 88;
        return (            
            <View onLayout={this.onLayout}>
                <Image style={{width: width,height: height,resizeMode: 'contain'}} source={Icons[this.props.command.image]} />
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    command: getCommand(state)
});

module.exports = connect(
  mapStateToProps
)(TurnCommandView);
