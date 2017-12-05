import React, {Component} from 'react';
import {ActivityIndicator, AppRegistry, ListView, RefreshControl, StyleSheet, Text, View} from 'react-native';
import API from './API';

const LoadingIndicator = ({loading}) => (
    loading ? (
        <View style={styles.loading}>
            <ActivityIndicator
                animating={true}
                style={[styles.loading]}
                size="large"
            />
        </View>
    ) : null
);

class CriptoCurrency extends Component {
    render() {
        return (
            <Text>{this.props.criptoCurrency.symbol} | {this.props.criptoCurrency.name}</Text>
        );
    }
}

export default class App extends Component {

    // https://api.coinmarketcap.com/v1/ticker/?limit=10
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                page: 1,
                lastPage: false,
                pageLoading: false
            },
            criptoCurrencies: [],
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    };

    componentWillMount() {
        this._getCriptoCurrencies(1)
    };

    _getCriptoCurrencies(page) {
        const pagination = { ...this.state.pagination, pageLoading: true, page: page };
        this._updateState(this.state.criptoCurrencies, pagination);

        API._getCriptoCurrencies(page)
            .then(result => {
                const pagination = { ...this.state.pagination, pageLoading: false };
                const criptoCurrencies = this.state.pagination.page === 1 ? result : [...this.state.criptoCurrencies, ...result];
                this._updateState(criptoCurrencies, pagination)
            })
            .catch(error => {
                const pagination = { ...this.state.pagination, pageLoading: true };
                this._updateState(this.state.criptoCurrencies, pagination);
                console.error(error)
            })
    }

    _updateState(criptoCurrencies, pagination) {
        const loading = {
            type: 'Loading',
            loading: pagination.pageLoading
        };

        this.setState({
            pagination: pagination,
            criptoCurrencies: criptoCurrencies,
            ds: this.state.ds.cloneWithRows([...criptoCurrencies, loading])
        })
    }

    _renderRow(row) {
        if (row.type === 'Loading') {
            return <LoadingIndicator loading={row.loading}/>
        } else {
            return (
                <View style={styles.row}>
                    <Text>{row.symbol} | {row.name}</Text>
                    <Text>$ {row.price_usd}</Text>
                    <Text>24h: {row.percent_change_24h}</Text>
                    <Text>7d: {row.percent_change_7d}</Text>
                    {/*<Text style={ styles.desc }>{ row.description }</Text>*/}
                </View>
            )
        }
    }

    _onRefresh() {
        this._getCriptoCurrencies(1)
    }

    _onEndReached() {
        console.log(this.state.pagination.page + '-' + this.state.pagination.lastPage);
        // const {pagination} = this.state;
        // const {page, perPage, pageCount, totalCount} = pagination;
        // const lastPage = totalCount <= (page - 1) * perPage + pageCount;

        if (!this.state.pagination.pageLoading && !this.state.pagination.lastPage) {
            this._getCriptoCurrencies(this.state.pagination.page + 1);
        }
    }


    render() {
        return (
            <ListView
                style={styles.container}
                enableEmptySections={true}
                automaticallyAdjustContentInsets={false}
                dataSource={this.state.ds}
                renderRow={row => this._renderRow(row)}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => this._onRefresh()}
                    />
                }
                onEndReached={() => this._onEndReached()}
                onEndReachedThreshold={10}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#F5FCFF'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    },
    desc: {
        fontSize: 13
    }
});


// skip this line if using Create React Native App
AppRegistry.registerComponent('CriptoCurrencyApp', () => CriptoCurrency);
