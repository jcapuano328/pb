import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {About} from 'react-native-nub';
import {logo} from '../res';

const AboutView = (props) => {
    return (
        <About logo={logo}
            title={'About Pub Battles Assistant'}
            version={props.version}
            releasedate={moment(props.releasedate).format("MMMM Do YYYY, h:mm:ss a")}
            description={'A no frills assistant for the Pub Battles system of wargames.'}
            credit={{
                description: 'All glory to them that made it possible!',
                links: [
                    {label: 'Command Post Games', url: 'http://http://www.commandpostgames.com/'}
                ]
            }}
            dependencies={[
                {description: 'react-redux', url: 'https://github.com/reactjs/react-redux'},
                {description: 'react-native-router-flux', url: 'https://github.com/aksonov/react-native-router-flux'},
                {description: 'react-native-drawer', url: 'https://github.com/root-two/react-native-drawer'},
                {description: 'react-native-scrollable-tab-view', url: ''},
                {description: 'react-native-sound', url: ''},                
                {description: 'redux-persist', url: ''},
                {description: 'moment', url: ''}
            ]}
        />
    );
}

const mapStateToProps = (state) => ({
    version: state.info.version,
    releasedate: state.info.releasedate
});

module.exports = connect(
  mapStateToProps
)(AboutView);
