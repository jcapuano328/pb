import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style,IconButton} from 'react-native-nub';
import Icons from '../res';
import CommandChit from './commandChit';
import {resetChitCup,addChitToCup,removeChitFromCup,drawChitFromCup} from '../actions/current';

var CommandView = React.createClass({
    onReset() {
        this.props.resetChitCup();        
    },
    onAdd(chit) {
        return (e) => {
            this.props.addChitToCup(chit);
        }
    },
    onRemove(chit) {
        return (e) => {        
            this.props.removeChitFromCup(chit);
        }
    },    
    onDraw() {        
        this.props.drawChitFromCup();//true);        
    },
    render() {                     
        let chit = this.props.chit || {};        
        return (
            <View style={{flex: 1}}>
                {/*top*/}
                <View style={{flex:2, flexDirection: 'row'}}>
                    <View style={{flex:2}}>
                        <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Current</Text>                        
                        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                            <CommandChit chit={chit} size={88} />
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
                                        marginTop: Style.Scaling.scale(70), 
                                        marginBottom: Style.Scaling.scale(30), 
                                        marginLeft: Style.Scaling.scale(30), 
                                        marginRight: Style.Scaling.scale(30)
                                    }}
                                >                            
                                    {this.props.cup.map((c,i) => 
                                        <CommandChit key={i} chit={c} size={32} onPress={this.onRemove(c)} />
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
    chit: state.current.command.chit
});

const mapDispatchToProps =  ({resetChitCup,addChitToCup,removeChitFromCup,drawChitFromCup});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandView);