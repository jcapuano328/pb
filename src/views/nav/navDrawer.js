import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {NavDrawer} from 'react-native-nub';
import Icons from '../../res';
import Games from '../../services/games';
import {reset} from '../../actions/current';

let NavigationDrawer = React.createClass({    
    onSelect(e) {
        this.props.reset(e);
        let g = Games.game(e.id);
        Actions.game({title: s.name, subtitle: s.subtitle});
    },    
    render () {
        return (            
            <NavDrawer menuItem={PublisherNavMenuItem} items={Games.games} icons={Icons} onSelect={this.onSelect} >
                {this.props.children}
            </NavDrawer>                
        );
    }
});

module.exports = connect(null,{reset})(NavigationDrawer);
