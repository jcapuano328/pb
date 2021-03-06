import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {Style,Landing} from 'react-native-nub';
import {splash} from '../res';
import getGame from '../selectors/game';            

var HomeView = React.createClass({
    componentDidUpdate() {
        if (this.props.game && this.props.game.title) {
            Actions.game({title: this.props.game.title, subtitle: this.props.game.subtitle});
        }
    },
    render() {        
        return (
            <Landing splash={splash} top={Style.Scaling.scale(44)} />
        );
    }
});

const mapStateToProps = (state) => ({
    game: getGame(state)
});

module.exports = connect(
  mapStateToProps
)(HomeView);
