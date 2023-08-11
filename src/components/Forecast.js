import React, { useEffect } from "react";

import axios from "axios";
import apiId from "../data/id";

import "../styles/Forecast.css"


const myUrl = "https://api.openweathermap.org/data/2.5/onecall";
let currentPeriodText = "на cегодня";
let myLat = 55.755696;
let myLon = 37.617306;

function Forecast(props) {
    let [currentPeriod, changePeriod] = React.useState(null);
    let [currentTemp, changeTemp] = React.useState(0);
    let [currentId, changeId] = React.useState(0)
    let [currentCondition, changeCondition] = React.useState("нет данных");
    let [currentDate, setDate] = React.useState(new Date());
    let [weeklyData, setWeeklyData] = React.useState([]);

    myLat = props.lat;
    myLon = props.lon;

    const params = {
        appid: apiId,
        units: "metric",
        lang: "ru",
        lat: myLat,
        lon: myLon,
    }

    if (props.period == "day") {
        currentPeriodText = "на cегодня";

    } else if (props.period == "week") {
        currentPeriodText = "на 5 дней";
    }

    if (props.id != currentId | currentPeriod != props.period) {
        axios.get(myUrl, { params: params }).then(resp => {
            changeTemp(resp.data.current.temp.toFixed(0));
            changeCondition(resp.data.current.weather[0].description);
            setWeeklyData(resp.data.daily);
            weeklyData.map((element) => {
                element.ch = Date(element.dt);
            })
            changePeriod(props.period);
            changeId(props.id);
        }).catch((e) => { console.log("нет данных") })
    }

    return (currentPeriodText == "на cегодня" ? (
        <div>
            <h2>Прогноз погоды {currentPeriodText}</h2>
            <h4>{currentDate.toLocaleDateString()}</h4>
            <p>{currentCondition}</p>
            <p>{currentTemp} ℃</p>
        </div>
    ) : (
        <div>
            <h2>Прогноз погоды {currentPeriodText}</h2>
            <table>
                <thead><tr><th>Дата</th><th>Погода</th><th>Температура</th></tr></thead>
                <tbody>
                    {weeklyData.slice(0, 5).map((element) => {
                        let date = new Date(element.dt * 1000).toLocaleDateString();
                        return (<tr key={element.dt}>
                            <td >{date}</td>
                            <td >{element.weather[0].description}</td>
                            <td >от {element.temp.min.toFixed(0)}℃ до {element.temp.max.toFixed(0)}℃</td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
    )
}

export default Forecast;