import React from 'react';
import { View, Text, Switch } from 'react-native';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';

var FireView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'},
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1,
            die5: 1,
            die6: 1,
            die7: 1
        };
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.onResolve();
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.state.die3 = d[2].value;
        this.state.die4 = d[3].value;
        this.state.die5 = d[4].value;
        this.state.die6 = d[5].value;
        this.state.die7 = d[6].value;
        
        this.onResolve();
    },
    onResolve() {
        this.setState(this.state);
    },
    render() {
        //console.log(this.props);
        let attsize = this.props.attsize || 2;
        return (
            <View style={{flex: 1}}>                
                <View style={{flex: 1, backgroundColor: 'whitesmoke', justifyContent:'flex-start'}}>
                    <View style={{flex: .75, flexDirection: 'row', alignItems: 'center', marginTop:5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4,this.state.die5,this.state.die6,this.state.die7]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                    <View style={{flex: 1}}>
                        <DiceModifiersView onChange={this.onDiceModifierChanged} />
                    </View>
                    <View style={{flex:2.15}}>                        
                        <CombatResultsView odds={this.state.odds}
                            results={Fire.resolvePossible((this.state.die1*10) + this.state.die2)}
                            combatdice={(this.state.die1*10) + this.state.die2}
                            lossdie={this.state.die3}
                            durationdie1={this.state.die4}
                            durationdie2={this.state.die5}
                            moraledice={(this.state.die6*10) + this.state.die7}                            
                        />                        
                    </View>
                    <View style={{flex: 0.35, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                        <Text style={{fontSize: Style.Font.medium()}}>Cannister</Text>
                        <Switch value={this.state.cannister} onValueChange={this.onCannisterChanged} />
                    </View>                    
                </View>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:attsize}}>                        
                        <FireAttackerView value={this.state.attack}
                            onAdd={this.onAttackerAdd}
                            onChanged={this.onAttackerChanged}
                            onModifierChanged={this.onAttackerModifierChanged}
                            detailView={this.props.attackerDetail}
                            battle={this.props.battle} />
                    </View>
                    <View style={{flex:2}}>                        
                        <FireDefenderView value={this.state.defend}
                            onAdd={this.onDefenderAdd}
                            onChanged={this.onDefenderChanged}
                            onIncrementsChanged={this.onDefenderIncrementsChanged}                             
                            detailView={this.props.defenderDetail}
                            battle={this.props.battle} />                        
                    </View>
                </View>                
            </View>
        );
    }
});

module.exports = FireView;
