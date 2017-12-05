import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';

import Store from './src/Store';
import {CryptoContainer, Header} from './src/components';


export default class App extends Component {
    componentDidMount() {
        console.log('Starting App');
    }

    render() {
        return (
            <Provider store={Store}>
                <View>
                    <Header/>
                    <CryptoContainer/>
                </View>
            </Provider>
        );
    }
}