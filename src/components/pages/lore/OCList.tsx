import {Container} from "../../ui/Container.tsx";
import alcorBadge from "./assets/badges/Character_Badge_-page001.webp"
import castorBadge from "./assets/badges/Character_Badge_-page006.webp"
import rayanBadge from "./assets/badges/Alcor-page007.webp"
import jupiterBadge from "./assets/badges/Alcor-page003.webp"
import soma from "./assets/badges/Character_Badge_-page005.webp"
import wilton from "./assets/badges/Character_Badge_-page004.webp"
import poslani from "./assets/badges/Character_Badge_-page010.webp"

export function OCList() {
    return <Container className={"fade"}>
        <h2 className={"primary-text"}>My OCs</h2>
        <article>
            <h3 className={"secondary-text"}>Astral Wave</h3>
            <div className={"grid"}>
                <a href={"https://vgen.co/c/alcor/rastaban"} target="_blank" rel="noopener noreferrer" style={{display: "contents"}}>
                    <img src={alcorBadge} className={"m3 s6"} style={{width: "100%"}}/>
                </a>
                <a href={"https://vgen.co/c/castor-2"} target="_blank" rel="noopener noreferrer" style={{display: "contents"}}>
                    <img src={castorBadge} className={"m3 s6"} style={{width: "100%"}}/>
                </a>
                <a href={"https://vgen.co/c/rayan-samemoto"} target="_blank" rel="noopener noreferrer" style={{display: "contents"}}>
                    <img src={rayanBadge} className={"m3 s6"} style={{width: "100%"}}/>
                </a>
                <a href={"https://vgen.co/c/jupiter-4"} target="_blank" rel="noopener noreferrer" style={{display: "contents"}}>
                    <img src={jupiterBadge} className={"m3 s6"} style={{width: "100%"}}/>
                </a>
            </div>
        </article>
        <article>
            <h3 className={"tertiary-text"}>TTRPG Characters</h3>
            <div className={"grid"}>
                <a href={"https://vgen.co/c/soma-2"} target="_blank" rel="noopener noreferrer" style={{display: "contents"}}>
                    <img src={soma} className={"m2 s4"} style={{width: "100%"}}/>
                </a>
                <a href={"https://vgen.co/c/wilton"} target="_blank" rel="noopener noreferrer" style={{display: "contents"}}>
                    <img src={wilton} className={"m2 s4"} style={{width: "100%"}}/>
                </a>
                <img src={poslani} className={"m2 s4"} style={{width: "100%"}}/>
            </div>
        </article>
    </Container>;
}