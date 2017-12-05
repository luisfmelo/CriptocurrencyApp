const perPage = 30;

export default {
    _getCriptoCurrencies(page) {
        console.log('Requesting page ' + page);
        return fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=${perPage}&start=${(page - 1) * perPage}`)
            .then((response) => response.json())
            // .then((responseJson) => {
            //     console.log(responseJson);
            // })
            //     let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            //     this.state.dataSource = this.state.dataSource === undefined ?
            //         ds.cloneWithRows(responseJson) :
            //         [this.state.dataSource, ds.cloneWithRows(responseJson)];
            //     this.setState({
            //         isLoading: false,
            //         page: this.state.page + 1
            //     }, function () {
            //     });
            // })
            .catch((error) => {
                console.error(error);
            });
    }
}