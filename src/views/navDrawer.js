import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {NavDrawer} from 'react-native-nub';
import Icons from '../res';
import Games from '../services/games';
import {reset} from '../actions/current';

let NavigationDrawer = React.createClass({    
    onSelect(e) {
        let g = Games.game(e);
        this.props.reset(g);
        Actions.game({title: g.title, subtitle: g.subtitle});
    },    
    render () {
        return (            
            <NavDrawer items={Games.games.map((g) => ({key:g.id,name:g.title,desc:g.subtitle,image:Icons[g.image]}))} icons={Icons} onSelect={this.onSelect} >
                {this.props.children}
            </NavDrawer>                
        );
    }
});

module.exports = connect(null,{reset})(NavigationDrawer);
