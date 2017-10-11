import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {Style,MultiSelectList} from 'react-native-nub';
import {Dice,DiceTray,RollButton} from 'react-native-dice';
import getModifiers from '../selectors/modifiers';

var CombatResolution = React.createClass({
    render() {
        return (
            <View style={{flex: 1}}>                
                <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>{this.props.title}</Text>
                <View style={{flex: 2}}>
                    <View style={{flex: 2, paddingTop: 30}}>
                        <DiceTray size={Style.Scaling.scale(48)} perrow={3}
                            dice={this.props.dice} values={this.props.dice.map((d) => d.value())}
                            onDie={this.props.onDieChanged}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: Style.Font.large(), alignSelf:'center'}}>{this.hits()}</Text>
                    </View>
                </View>
                <View style={{flex: 4}}>
                    <MultiSelectList title={'Target'}
                                    items={this.props.modifiers.map((m) => ({name: m.name, selected: this.props.mods[m.name]}))}
                                    onChanged={this.props.onModChanged}/>
                </View>
            </View>
        );
    },
    hits() {
        return this.props.values.reduce((a,v) => a + (v >= 4 ? 1 : 0), 0) + ' hits';
    }
});

var CombatView = React.createClass({
    diceAttack: new Dice([
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
    ]),
    diceDefend: new Dice([
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'}
    ]),
    getInitialState() {
        return {
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1,
            die5: 1,
            die6: 1,
            attackmods: {},
            defendmods: {}
        };
    },
    onDieChangedAttack(d,v) {
        this.diceAttack.die(d,v);
        this.onResolve();
    },
    onModChangedAttack(m) {
        this.state.attackmods[m.name] = m.selected;
        this.onResolve();
    },
    onDieChangedDefend(d,v) {
        this.diceDefend.die(d,v);        
        this.onResolve();
    },
    onModChangedDefend(m) {
        this.state.defendmods[m.name] = m.selected;
        this.onResolve();
    },
    onDiceRoll() {
        //this.roll(this.diceAttack, 0);
        //this.roll(this.diceDefend, 3);
        this.diceAttack.roll();
        this.diceDefend.roll();

        this.onResolve();
    },
    onResolve() {
        this.state.die1 = this.diceAttack.die(1);
        this.state.die2 = this.diceAttack.die(2);
        this.state.die3 = this.diceAttack.die(3);
        this.state.die4 = this.diceDefend.die(1);
        this.state.die5 = this.diceDefend.die(2);
        this.state.die6 = this.diceDefend.die(3);        
        
        this.applyModifiers(this.state.attackmods, this.props.modifiers, ['die1','die2','die3']);
        this.applyModifiers(this.state.defendmods, this.props.modifiers, ['die4','die5','die6']);

        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1, marginTop:3}}>
                {/*top*/}
                <View style={{flex:1, flexDirection: 'row', backgroundColor: 'gainsboro'}}>
                    <View style={{flex:3}} />
                    <View style={{flex:2, paddingLeft:3, paddingRight: 3}}>
                        <RollButton direction={'horizontal'} onRoll={this.onDiceRoll} />
                    </View>
                    <View style={{flex:3}} />
                </View>
                {/*bottom*/}                
                <View style={{flex:6, flexDirection:'row'}}>
                    {/*left*/}
                    <View style={{flex:1, borderRightColor: 'gray', borderRightWidth: 1}}>
                        <CombatResolution title={'Attacker'} 
                            dice={this.diceAttack} values={[this.state.die1,this.state.die2,this.state.die3]} 
                            onDieChanged={this.onDieChangedAttack} 
                            modifiers={this.props.modifiers} mods={this.state.attackmods} 
                            onModChanged={this.onModChangedAttack} />
                    </View>
                    {/*right*/}
                    <View style={{flex:1}}>
                        <CombatResolution title={'Defender'} 
                        dice={this.diceDefend} values={[this.state.die4,this.state.die5,this.state.die6]} 
                        onDieChanged={this.onDieChangedDefend} 
                        modifiers={this.props.modifiers} mods={this.state.defendmods} 
                        onModChanged={this.onModChangedDefend} />                        
                    </View>
                </View>                
            </View>
        );
    },
    roll(dice,offset) {
        dice.roll();
        dice.dice().forEach((die,i) => this.state.dice['die'+(i+offset)] = die.value);        
    },
    applyModifiers(mods, modifiers, dice) {
        Object.keys(mods).filter((m) => mods[m]).forEach((m) => {
            var mv = modifiers.find((mod) => mod.name == m);
            if (mv) {
                dice.forEach((d) => {
                    var v = this.state[d] + mv.value;
                    if (v < 0) {v = 0;}
                    if (v > 6) {v = 6;}                        
                    this.state[d] = v;
                });
            }
        });
    }
});

const mapStateToProps = (state) => ({    
    modifiers: getModifiers(state)
});


module.exports = connect(
  mapStateToProps  
)(CombatView);

