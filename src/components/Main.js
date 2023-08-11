import React from "react";

import Forecast from "./Forecast";
import Location from "./Location";

import CITIES from "../data/cities";

import "../styles/Main.css"

function Main() {
    let [myPeriod, changePeriod] = React.useState("day")
    let [currentCity, cityChange] = React.useState(CITIES[0]);
    let [cityLat, latChange] = React.useState(CITIES[0].lat);
    let [cityLon, lonChange] = React.useState(CITIES[0].lon);
    let [cityId, IdChange] = React.useState(CITIES[0].id);

    const citySelection = function (e) {
        cityChange(CITIES[e.currentTarget.value]);
        latChange(CITIES[e.currentTarget.value].lat);
        lonChange(CITIES[e.currentTarget.value].lon);
        IdChange(CITIES[e.currentTarget.value].id);
    }
    const forecastSelection = function (e) {
        changePeriod(e.currentTarget.value)
    }
    return (
        <React.Fragment>
            <main>
                <div className="selector">
                    <h3>Выберите город</h3>
                    <select onChange={citySelection} >
                        <option disabled >выберите город</option>
                        {CITIES.map((element) => {
                            return <option key={element.id} value={element.id}>{element.name}</option>
                        })}
                    </select>
                    <h3>Выберите период</h3>
                    <select onChange={forecastSelection}>
                        <option disabled >выберите период</option>
                        <option value="day">Сегодня</option>
                        <option value="week">Неделя</option>
                    </select>

                </div>
                <Forecast id={cityId} period={myPeriod} lat={cityLat} lon={cityLon} />
                <Location data={currentCity} />
            </main>
        </React.Fragment>
    )
}

export default Main;