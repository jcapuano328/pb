import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import {Style} from 'react-native-nub';
import Icons from '../res';

var CommandChit = React.createClass({
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
        let width = this.props.size || 64;//(this.state.width*0.9) || 32;
        let height = this.props.size || 64;//(this.state.height*0.9) || 32;
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{                
                width: Style.Scaling.scale(width), 
                height: Style.Scaling.scale(height),
                margin: 3
            }} onLayout={this.onLayout}>
                <Image source={Icons['chit-'+this.props.chit.chitcolor]} resizeMode={'stretch'} style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: null,
                    height: null,
                    backgroundColor: 'transparent'
                }}>
                    <Image source={Icons['label-'+this.props.chit.labelcolor]} resizeMode={'stretch'} 
                            style={{width: width, height: height}}>
                        <Image source={Icons['label-'+this.props.chit.code]} resizeMode={'stretch'} 
                            style={{width: width, height: height}}/>
                    </Image>
                </Image>
            </TouchableOpacity>
        );
    }
});

module.exports = CommandChit;