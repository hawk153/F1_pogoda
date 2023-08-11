import React from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";

import "../styles/Location.css"

function Location(props) {
    return (
        <div>
            <YMaps>
                <div className={"map"}>
                    Выбранное местоположение {props.data.name}
                    <div className={"map-container"}>
                        <Map state={{ center: [props.data.lat, props.data.lon], zoom: 8 }} />
                    </div>
                </div>
            </YMaps>
        </div>

    )
}

export default Location;