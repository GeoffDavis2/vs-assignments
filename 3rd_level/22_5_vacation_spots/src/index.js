import React from 'react';
import ReactDOM from 'react-dom';

const vacationSpots = [
    {
        place: "Meridian, Idaho",
        price: 40,
        timeToGo: "Spring"
    }, {
        place: "Cancun",
        price: 900,
        timeToGo: "Winter"
    }, {
        place: "China",
        price: 1200,
        timeToGo: "Fall"
    }, {
        place: "Russia",
        price: 1100,
        timeToGo: "Summer"
    }, {
        place: "Lebanon",
        price: 400,
        timeToGo: "Spring"
    }
]

const Card = ({ spot: { place, price, timeToGo } }) => {
    let pricey = '$';
    if (price > 500) pricey = '$$';
    if (price > 1000) pricey = '$$$';

    return <div className="card" style={timeToGo === 'Spring' ? { backgroundColor: "#8CC152" } : { backgroundColor: "#37BC9B" }}>
        <h2>{pricey} {place}</h2>
        <p>Price: {price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
        <p>Time To Go: {timeToGo}</p>
    </div>
}

const App = () =>
    <div>
        <h1>Vacation Spots</h1>
        {vacationSpots.map(spot => <Card key={spot.place} spot={spot} />)}
    </div>

ReactDOM.render(<App />, document.getElementById('root'));