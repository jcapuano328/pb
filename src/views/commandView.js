import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style,IconButton} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
//import {Dice,DiceTray,RollButton} from 'react-native-dice';
import Icons from '../res';
import CommandChit from './commandChit';
import {resetChitCup,addChitToCup,removeChitFromCup,drawChitFromCup,addChitToCurrent,removeChitFromCurrent,delayCurrentChit,returnDelayedChitToCup} from '../actions/current';

var CommandView = React.createClass({
    dice: /*new Dice(*/[
        {num: 1, low: 1, high: 6, diecolor: 'green', dotcolor:'white'}
    ],//),    
    getInitialState() {
        return {
            die: 1
        };
    },
    onReset() {
        this.props.resetChitCup();        
    },
    onAdd(chit) {
        return (e) => {
            this.props.addChitToCup(chit);
        }
    },
    onDelay() {
        this.props.delayCurrentChit();
    },    
    onReturn() {
        this.props.returnDelayedChitToCup();
    },
    onComplete(chit) {
        return (e) => {        
            this.props.removeChitFromCurrent(chit);
        }
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
    onDiceRoll(d) {
        //this.dice.roll();
        //this.state.die = this.dice.die(0);
        this.state.die = d[0].value;
        this.setState(this.state);
    },    
    render() {                     
        return (
            <View style={{flex: 1}}>
                {/*top*/}
                <View style={{flex:2, flexDirection: 'row'}}>
                    <View style={{flex:2}}>
                        <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Current</Text>
                        <View style={{flex:1, flexDirection:'row'}}>
                            {/*current*/}
                            <View style={{flex:3, flexDirection: 'row'}}>
                                {this.props.current.map((c,i) => 
                                    <View key={i} style={{alignItems: 'center', justifyContent: 'center'}}>
                                        <CommandChit chit={c} size={48} onPress={this.onComplete(c)} />
                                    </View>
                                )}
                            </View>    
                            {/*delay*/}                            
                            <View style={{flex:1, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                    <IconButton image={Icons.delay} height={64} width={64} resizeMode='stretch' onPress={this.onDelay} />
                                </View>
                                <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>                            
                                    {this.props.delay 
                                    ? <CommandChit chit={this.props.delay} size={32} onPress={this.onReturn} />
                                    : <View />
                                    }                                
                                </View>   
                            </View>                                                        
                            {/*dice*/}
                            <View style={{flex:1}}>
                                <View style={{flex:1}} />
                                <View style={{flex:2}}>
                                <DiceRoll dice={this.dice} values={[this.state.die]} onRoll={this.onDiceRoll} />
                                </View>
                                <View style={{flex:1}} />
                                {/*<View style={{flex: 1}}>
                                    <DiceTray size={Style.Scaling.scale(32)} dice={this.dice} values={[this.state.die]} />
                                </View>     
                                <View style={{flex:1, alignItems:'flex-start', justifyContent: 'flex-start'}}>
                                    <RollButton direction={'vertical'} onRoll={this.onDiceRoll} />
                                </View>
                                */}
                            </View>
                        </View>
                    </View>   
                </View>
                {/*bottom*/}
                <View style={{flex:8}}>
                    <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Available</Text>
                    <View style={{flex:1, flexDirection: 'row'}}>                    
                        {/*left*/}
                        <View style={{flex:1}}>                        
                            {/*contentContainerStyle={{flex:1, justifyContent:'flex-start', alignItems:'center'}}*/}
                            <ScrollView 
                                automaticallyAdjustContentInsets={false}
                                scrollEventThrottle={200}>
                                {this.props.game.command.map((c,i) => 
                                    <View key={i} style={{paddingBottom: 5, justifyContent: 'center'}}>
                                        <CommandChit chit={c} size={64} onPress={this.onAdd(c)} />                                        
                                    </View>
                                )}
                            </ScrollView>                        
                        </View>    
                        {/*center*/}
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                <IconButton image={Icons.draw} height={64} width={64} resizeMode='stretch' onPress={this.onDraw} />                            
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                <IconButton image={Icons.resetcup} height={64} width={64} resizeMode='stretch' onPress={this.onReset} />                        
                            </View>                        
                        </View>                        
                        {/*right*/}
                        <View style={{flex:2.5}}>
                            <Image source={Icons.drawcup} resizeMode={'stretch'} style={{
                                flex: 1,
                                width: null,
                                height: null,
                                backgroundColor: 'transparent'
                            }}>                        
                                <View style={{flex:1, flexDirection:'row', flexWrap: 'wrap', 
                                        justifyContent:'space-around', alignItems:'flex-start', 
                                        marginTop: Style.Scaling.scale(90), 
                                        marginBottom: Style.Scaling.scale(30), 
                                        marginLeft: Style.Scaling.scale(30), 
                                        marginRight: Style.Scaling.scale(30)
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
            </View>
        );
    }
});

const mapStateToProps = (state) => ({    
    cup: state.current.command.cup || [],
    current: state.current.command.chits || [],
    delay: state.current.command.delay
});

const mapDispatchToProps =  ({
    resetChitCup,
    addChitToCup,
    removeChitFromCup,
    drawChitFromCup,
    addChitToCurrent,
    removeChitFromCurrent,
    delayCurrentChit,
    returnDelayedChitToCup
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandView);