import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style,IconButton} from 'react-native-nub';
//import {DiceRoll} from 'react-native-dice';
import {Dice,DiceTray,RollButton} from 'react-native-dice';
import Icons from '../res';
import CommandChit from './commandChit';
import {resetChitCup,addChitToCup,removeChitFromCup,drawChitFromCup,addChitToCurrent,removeChitFromCurrent,delayCurrentChit,returnDelayedChitToCup} from '../actions/current';

var CommandView = React.createClass({
    dice: new Dice([
        {num: 1, low: 1, high: 6, diecolor: 'green', dotcolor:'white'}
    ]),    
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
        this.dice.roll();
        this.state.die = this.dice.die(1);
        //this.state.die = d[0].value;
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
                            {/*left*/}
                            <View style={{flex:6, marginRight: 5, borderRightColor: 'gray', borderRightWidth: 1}}>
                                {/*current*/}
                                <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap', 
                                            justifyContent:'flex-start', alignItems:'flex-start'}}>
                                    {this.props.current.map((c,i) => 
                                        <View key={i} style={{alignItems: 'center', justifyContent: 'center'}}>
                                            <CommandChit chit={c} size={40} onPress={this.onComplete(c)} />
                                        </View>
                                    )}
                                </View>                                         
                            </View>
                            {/*right*/}
                            <View style={{flex:2}}>
                                {/*dice*/}
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex: 1/*, paddingTop: 20*/}}>
                                        <DiceTray size={Style.Scaling.scale(48)} perrow={1} dice={this.dice} values={this.dice.map((d) => d.value())} />
                                    </View>     
                                    <View style={{flex:1, paddingRight:5}}>
                                        <RollButton direction={'horizontal'} onRoll={this.onDiceRoll} />
                                    </View>
                                </View>
                                {/*delay*/}                            
                                <View style={{flex:1, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                        <IconButton image={Icons.delay} height={56} width={56} resizeMode='stretch' onPress={this.onDelay} />
                                    </View>
                                    <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>                            
                                        {this.props.delay 
                                        ? <CommandChit chit={this.props.delay} size={32} onPress={this.onReturn} />
                                        : <View />
                                        }                                
                                    </View>   
                                </View>                                
                            </View>                            
                        </View>
                    </View>   
                </View>
                {/*bottom*/}
                <View style={{flex:6}}>
                    <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Available</Text>
                    <View style={{flex:1, flexDirection: 'row'}}>                    
                        {/*left*/}
                        <View style={{flex:1}}>                        
                            {/*contentContainerStyle={{flex:1, justifyContent:'flex-start', alignItems:'center'}}*/}
                            <ScrollView 
                                automaticallyAdjustContentInsets={false}
                                scrollEventThrottle={200}>
                                {this.available().map((c,i) => 
                                    <View key={i} style={{paddingBottom: 5, justifyContent: 'center'}}>
                                        <CommandChit chit={c} size={56} onPress={this.onAdd(c)} />                                        
                                    </View>
                                )}
                            </ScrollView>                        
                        </View>    
                        {/*center*/}
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                <IconButton image={Icons.draw} height={80} width={80} resizeMode='stretch' onPress={this.onDraw} />                            
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                <IconButton image={Icons.resetcup} height={80} width={80} resizeMode='stretch' onPress={this.onReset} />                        
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
    },
    available() {
        // only those command chits that are not in the cup or current or delayed
        return this.props.game.command.filter((c) => 
            !this.props.cup.find((cc) => cc.side === c.side && cc.code === c.code)
            &&
            !this.props.current.find((cc) => cc.side === c.side && cc.code === c.code)
            &&
            (this.props.delay == null || this.props.delay.side !== c.side || this.props.delay.code !== c.code)
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