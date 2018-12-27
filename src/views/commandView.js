import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style,IconButton} from 'react-native-nub';
//import {DiceRoll} from 'react-native-dice';
import {Dice,DiceTray,RollButton} from 'react-native-dice';
import Icons from '../res';
import CommandChit from './commandChit';
import {resetChitCup,addChitToCup,removeChitFromCup,drawChitFromCup,addChitToCurrent,removeChitFromCurrent,addChitToPool,removeChitFromOptional,delayCurrentChit,returnDelayedChitToCup} from '../actions/current';

var CommandView = React.createClass({
    dice: new Dice([
        {num: 1, low: 1, high: 6, diecolor: 'green', dotcolor:'white'}
    ]),    
    getInitialState() {
        return {
            die: 1,

            diewidth: 0,
            dieheight: 0,
            delaywidth: 0,
            delayheight: 0,            
        };
    },
    onReset() {
        this.props.resetChitCup();
    },
    onDelay() {
        this.props.delayCurrentChit();
    },    
    onReturnToCup(chit) {
        return (e) => {
            this.props.removeChitFromCurrent(chit);
            this.props.addChitToCup(chit);
        }
    },
    onReturnDelayed() {
        this.props.returnDelayedChitToCup();
    },
    onJump(chit) {
        return (e) => {                    
            this.props.addChitToCurrent(chit);
            this.props.removeChitFromCup(chit);
        }
    },    
    onDraw() {        
        this.props.drawChitFromCup();//true);        
        this.props.returnDelayedChitToCup();
    },
    onAddToPool(chit) {
        return (e) => {
            this.props.removeChitFromOptional(chit);
            this.props.addChitToPool(chit);
            this.props.addChitToCup(chit);
        }
    },
    onDiceRoll(d) {
        this.dice.roll();
        this.state.die = this.dice.die(1);
        //this.state.die = d[0].value;
        this.setState(this.state);
    },    
    render() {                     
        let diesize = (this.state.diewidth * 0.95) || 48;
        let delaysize = (this.state.delaywidth * 0.95) || 56;
        return (
            <View style={{flex: 1}}>
                {/*top*/}
                <View style={{flex:4, flexDirection: 'row'}}>
                    <View style={{flex:2}}>
                        <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Current</Text>
                        <View style={{flex:1, flexDirection:'row'}}>
                            {/*left*/}
                            <View style={{flex:6, marginRight: 5, borderRightColor: 'gray', borderRightWidth: 1}}>
                                {/*current*/}
                                <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap', 
                                            justifyContent:'flex-start', alignItems:'flex-start'}}>
                                    {this.props.current.map((c,i) => 
                                        <View key={i} style={{alignItems: 'center', justifyContent: 'center'}}>
                                            <CommandChit chit={c} size={40} onPress={this.onReturnToCup(c)}/>
                                        </View>
                                    )}
                                </View>                                         
                            </View>
                            {/*right*/}
                            <View style={{flex:2}}>
                                {/*dice*/}
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex: 1/*, paddingTop: 20*/}} onLayout={(e) => {
                                        if (this.state.diewidth != e.nativeEvent.layout.diewidth ||
                                            this.state.dieheight != e.nativeEvent.layout.dieheight) {
                                            this.setState({
                                                diewidth: e.nativeEvent.layout.width,
                                                dieheight: e.nativeEvent.layout.height
                                            });
                                        }                                        
                                    }}>
                                        <DiceTray size={diesize} perrow={1} dice={this.dice} values={this.dice.map((d) => d.value())} />
                                    </View>     
                                    <View style={{flex:1, paddingRight:5}}>
                                        <RollButton direction={'horizontal'} onRoll={this.onDiceRoll} />
                                    </View>
                                </View>
                                {/*delay*/}                            
                                <View style={{flex:1, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}} onLayout={(e) => {                                        
                                        if (this.state.delaywidth != e.nativeEvent.layout.delaywidth ||
                                            this.state.delayheight != e.nativeEvent.layout.delayheight) {
                                            this.setState({
                                                delaywidth: e.nativeEvent.layout.width,
                                                delayheight: e.nativeEvent.layout.height
                                            });
                                        }                                        
                                    }}>
                                        <IconButton image={Icons.delay} height={delaysize} width={delaysize} resizeMode='stretch' onPress={this.onDelay} />
                                    </View>
                                    <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>                            
                                        {this.props.delay 
                                        ? <CommandChit chit={this.props.delay} size={32} onPress={this.onReturnDelayed} />
                                        : <View />
                                        }                                
                                    </View>
                                </View>
                                <View style={{flex:1}}/>
                                <View style={{flex:1}}/>
                            </View>                            
                        </View>
                    </View>   
                </View>
                {/*bottom*/}
                <View style={{flex:4, flexDirection: 'row'}}>
                    {/*left*/}
                    <View style={{flex:4}}>
                        <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Available</Text>
                        <View style={{flex:1, flexDirection: 'row'}}>                    
                            {/*left*/}
                            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                    <IconButton image={Icons.draw} height={Style.Scaling.scale(80)} width={Style.Scaling.scale(80)} resizeMode='stretch' onPress={this.onDraw} />                            
                                </View>
                                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                    <IconButton image={Icons.resetcup} height={Style.Scaling.scale(80)} width={Style.Scaling.scale(80)} resizeMode='stretch' onPress={this.onReset} />
                                </View>                        
                            </View>                        
                            {/*right*/}
                            <View style={{flex:3}}>
                                <Image source={Icons.drawcup} resizeMode={'stretch'} style={{
                                    flex: 1,
                                    width: null,
                                    height: null,
                                    backgroundColor: 'transparent'
                                }}>                        
                                    <View style={{flex:1, flexDirection:'row', flexWrap: 'wrap', 
                                            justifyContent:'space-around', alignItems:'flex-start', 
                                            marginTop: Style.Scaling.scale(45), 
                                            marginBottom: Style.Scaling.scale(10), 
                                            marginLeft: Style.Scaling.scale(20), 
                                            marginRight: Style.Scaling.scale(20)
                                        }}
                                    >                            
                                        {this.props.cup.map((c,i) => 
                                            <CommandChit key={i} chit={c} size={32} onPress={this.onJump(c)} />
                                        )}
                                    </View>
                                </Image>                        
                            </View>                        
                        </View>
                    </View>
                    {/*right*/}
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Optional</Text>
                        <View style={{flex:1, flexDirection:'row', flexWrap: 'wrap', 
                                justifyContent:'space-around', alignItems:'flex-start',                                 
                                margin: 2,
                                borderLeftColor: 'gray', borderLeftWidth: 1                                
                            }}
                        >                            
                            {this.props.optional.map((c,i) => 
                                <CommandChit key={i} chit={c} size={32} onPress={this.onAddToPool(c)} />
                            )}
                        </View>
                    </View>
                </View>            
            </View>
        );
    }
});

const mapStateToProps = (state) => ({    
    cup: state.current.command.cup || [],
    current: state.current.command.chits || [],
    optional: state.current.command.optional || [],
    delay: state.current.command.delay
});

const mapDispatchToProps =  ({
    resetChitCup,
    addChitToCup,
    removeChitFromCup,
    drawChitFromCup,
    addChitToCurrent,
    removeChitFromCurrent,
    addChitToPool,
    removeChitFromOptional,
    delayCurrentChit,
    returnDelayedChitToCup
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandView);