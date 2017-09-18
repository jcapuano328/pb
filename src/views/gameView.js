import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import TurnView from './turnView';
import getGame from '../selectors/game';

var GameView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },    
    render() {        
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44),backgroundColor: 'rgba(0,0,0,0.01)'}}>            
                <TurnView logo={this.props.battle.image} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.medium()}}                
                    initialPage={this.state.initialPage}                    
                >
                    <View tabLabel="Command" />
                    <View tabLabel="Combat" />
                </ScrollableTabView>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    game: getGame(state)    
});

module.exports = connect(
  mapStateToProps
)(GameView);
