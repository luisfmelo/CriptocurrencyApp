// const perPage = 10;
//
// export default {
//     _getCriptoCurrencies(page) {
//         console.log('Requesting page ' + page);
//         return fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=${perPage}&start=${(page - 1) * perPage}`)
//             .then((response) => response.json())
//             .catch((error) => {
//                 console.error(error);
//             });
//     }
// }