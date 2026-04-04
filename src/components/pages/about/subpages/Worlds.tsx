import {Container} from "../../../ui/Container.tsx";

export function Worlds() {
    const crossoverList: { name: string; description: string }[] = [
        {
            name: "Aire Lake City",
            description: "Renato's skateboarding friend and Tokusatsu actor."
        },
        {
            name: "Flux Destiny",
            description: "National Karmastry Authority (Tinker Agent) as part of Team Extra."
        },
        {
            name: "Splatoon",
            description: "A Painbrush Nouveau-wielding Inkling."
        },
        {
            name: "The World Ends With You",
            description: "A participant in the Reaper's Game, who is a fan of the MONOCROW, Jupiter of the Monkey, and RyuGu brands."
        }
    ]
    return <Container className={"fade"}>
        <h2 className={"primary-text"}>World Crossovers</h2>
        <article>
            <h3 className={"secondary-text"}>Alcor</h3>
            <div>

            </div>
            <ul className={"list border medium-space"}>
                {crossoverList.map(value => <li key={value.name}>
                    <button className="circle">{value.name[0]}</button>
                    <div className="max">
                        <h6 className="small">{value.name}</h6>
                        <span>{value.description}</span>
                    </div>
                </li>)}
            </ul>
        </article>
    </Container>;
}