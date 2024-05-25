const greeting = 'Hello'
console.log(greeting)
// {
//     "id": 3,
//     "name": "Clementine Bauch",
//     "username": "Samantha",
//     "email": "Nathan@yesenia.net",
//     "address": {
//     "street": "Douglas Extension",
//         "suite": "Suite 847",
//         "city": "McKenziehaven",
//         "zipcode": "59590-4157",
//         "geo": {
//         "lat": "-68.6102",
//             "lng": "-47.0653"
//     }
// }

interface user <T> {
    id: number
    name: string
    username: string
    email: T
    address: string
}

interface location {
    street: string
    suite: string
    city: string
    zipcode?: number
    geo: {}
}

const sergiy: user <string> & location = {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: "adsd",
    street: "Douglas Extension",
    suite: "Suite 847",
    city: 'McKenziehaven',
    zipcode: 59590-4157,
    geo: {
    lat: "-68.6102",
    lng: "-47.0653"
    },
}