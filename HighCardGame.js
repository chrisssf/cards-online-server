// const fetchDecks = () => {
//     let numberOfDecks = 1
//     let deck = []

//     fetch('https://deckofcardsapi.com/api/deck/new/shuffle?deck_count=' + numberOfDecks)
//     .then(res => res.json())
//     .then(results => {
//         fetch('https://deckofcardsapi.com/api/deck/' + results.deck_id + '/draw/?count=' + (52 * numberOfDecks))
//         .then(res => res.json())
//         .then(results => {
//             deck = results.cards
//         })
//     })
//     .catch(err => console.log(err))
// }

// const fetch = require("node-fetch")
const got = require('got');

const fetchDecks = async () => {
    let numberOfDecks = 1


    let deckResponse  = await got('https://deckofcardsapi.com/api/deck/new/shuffle?deck_count=' + numberOfDecks)
    console.log(deckResponse.body)
    return deckResponse.body
    // let x = await deckResponse.body
    // console.log("x", x[0].deck_id)
    // let deckDetails = await deckResponse.json()
    // console.log(deckDetails)

    // let cardsResponse = await got('https://deckofcardsapi.com/api/deck/' + deckResponse.body.deck_id + '/draw/?count=' + (52 * numberOfDecks))
    // let cards = await cardsResponse.json()
    // console.log(cardsResponse.body)

    // return await cards.cards

    // let deckResponse  = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle?deck_count=' + numberOfDecks)
    // let deckDetails = await deckResponse.json()
    // let cardsResponse = await fetch('https://deckofcardsapi.com/api/deck/' + deckDetails.deck_id + '/draw/?count=' + (52 * numberOfDecks))
    // let cards = await cardsResponse.json()

    // return await cards.cards

    // got('https://deckofcardsapi.com/api/deck/new/shuffle?deck_count=' + numberOfDecks)
    // .then(res => console.log(res.body))
    // .then(res => res.json())
    // .then(results => {
    //     fetch('https://deckofcardsapi.com/api/deck/' + results.deck_id + '/draw/?count=' + (52 * numberOfDecks))
    //     .then(res => res.json())
    //     .then(results => {
    //         console.log(results.cards)
    //     })
    // })
    // .catch(err => console.log(err))
}




const dealCards = () => {

}


module.exports = { fetchDecks }