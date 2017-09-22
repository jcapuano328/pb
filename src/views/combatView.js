import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {Style,MultiSelectList} from 'react-native-nub';
import {Dice,DiceTray,RollButton} from 'react-native-dice';

var CombatResolution = React.createClass({
    render() {
        return (
            <View style={{flex: 1}}>                
                <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>{this.props.title}</Text>
                <View style={{flex: 1}}>
                    <DiceTray size={Style.Scaling.scale(64)} dice={this.props.dice} values={this.props.dice.map((d) => d.value)} onDie={this.props.onDieChanged}/>
                </View>
                <View style={{flex: 1}}>
                    <Text>Tally number of hits</Text>
                </View>
                <View style={{flex: 1}}>
                    <MultiSelectList title={'Modifiers'}
                                    items={this.props.modifiers.map((m) => ({name: m.name, selected: this.props.mods[m.name]}))}
                                    onChanged={this.props.onModChanged}/>
                </View>
            </View>
        );
    }
});

var CombatView = React.createClass({
    diceAttack: new Dice.Dice([
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
    ]),
    modifiersAttack: [
        {name: 'Woods', value: -1},
        {name: 'Hills', value: -1},
        {name: 'River', value: -1},
        {name: 'Buildings', value: -1},
        {name: 'Flank', value: 1},
        {name: 'Cav vs Fresh Inf', value: -1},
        {name: 'Cav vs Spent Inf', value: 1}
    ],
    diceDefend: new Dice.Dice([
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'}
    ]),
    modifiersDefend: [
        {name: 'Woods', value: -1},
        {name: 'Hills', value: -1},
        {name: 'River', value: 1},
        {name: 'Buildings', value: -1},
        {name: 'Flank', value: -1},
        {name: 'Cav vs Fresh Inf', value: -1},
        {name: 'Cav vs Spent Inf', value: 1}
    ],    
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
        this.state.die1 = this.diceAttack.die(0);
        this.state.die2 = this.diceAttack.die(1);
        this.state.die3 = this.diceAttack.die(2);
        this.state.die4 = this.diceDefend.die(0);
        this.state.die5 = this.diceDefend.die(1);
        this.state.die6 = this.diceDefend.die(2);
        
        applyModifiers(this.state.attackmods, this.modifiersAttack, ['die1','die2','die3']);
        applyModifiers(this.state.defendmods, this.modifiersDefend, ['die4','die5','die6']);

        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>                
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:3}}>
                        <CombatResolution title={'Attacker'} dice={this.diceAttack} onDieChanged={this.onDieChangedAttack} />
                    </View>
                    <View style={{flex:1, alignItems:'flex-start', justifyContent: 'flex-start'}}>
                        <RollButton direction={'vertical'} onRoll={this.onDiceRoll} />
                    </View>
                    <View style={{flex:3}}>                        
                        <CombatResolution title={'Defender'} dice={this.diceDefend} onDieChanged={this.onDieChangedDefend} />                        
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
        mods.filter((m) => m.selected).forEach((m) => {
            var mv = modifiers.find((mod) => mod.name == m.name);
            if (mv) {
                dice.forEach((d) => this.state[d] += mv.value);
            }
        });
    }
});

module.exports = CombatView;
