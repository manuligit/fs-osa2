import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

const Otsikko = (props) => <h1>{props.kurssi}</h1>

const Sisalto = (props) => {
    return (
        <div>
            {props.osat.map((item, i) => <Osa key={i} osa={item.nimi} tehtavia={item.tehtavia}/> )}
        </div>
    )
}

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>

const Yhteensa = (props) => {
    var total = props.osat.reduce(function (sum, osa) {
        return sum + osa.tehtavia;
    }, 0);
    console.log(props)

    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

export default Kurssi