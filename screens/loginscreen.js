import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Alert} from 'react-native'
import db from '../config'
import * as firebase from 'firebase'
export default class LoginScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            email:'', password:''
        }
    }

    login = async()=>{
        if(email && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate('Transaction')
                }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                        Alert.alert('User does not exist.')
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('Incorrect email or password.')
                        break;
                }
            }
        }
        else{
            Alert.alert('Enter email and password.')
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style={{alignItems:'center',marginTop:20}}>
                <View><Image source = {require('../assets/booklogo.jpg')} style={{width:200,height:200}}/>
                <Text style={{textAlign:'center',fontSize:35,}}>Wireless Library</Text></View>
                <View>
                    <TextInput style={styles.loginBox}
                    placeholder = 'abc@example.com'
                    keyboardType = 'email-address'
                    onChangeText = {(text)=>{
                        this.setState({
                            email:text
                        })
                    }}/>
                    <TextInput style={styles.loginBox}
                    placeholder = 'enter password'
                    secureTextEntry = {true}
                    onChangeText = {(text)=>{
                        this.setState({
                            password:text
                        })
                    }}/>
                </View>
                <View><TouchableOpacity style={{height:30,width:100,borderwidth:1,marginTop:20,borderRadius:13}} onPress = {()=>{this.login(this.state.email, this.state.password)}}><Text>Login</Text></TouchableOpacity></View>
                <Text>Login Screen</Text>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    loginBox:{width:300,height:70,fontSize:20,margin:10,borderWidth:2}
})