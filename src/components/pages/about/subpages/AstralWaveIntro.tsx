import {Container} from "../../../ui/Container.tsx";
import Markdown from "react-markdown";
import cover from "../../../../assets/astral_wave.webp"

export function AstralWaveIntro() {
    // language=Markdown
    const markdown = `In the early 22nd century, an incident involving quantum computing caused a tear in reality that led to the Astral Plane. Monsters emerged from those rifts, and gravitated towards areas with high cultural relevance, rendering them uninhabitable. They converted their victims into memetic building blocks that created more rifts and monsters, which led to the creation of **Contamination Zones** that required specialized teams of remediators to contain and ameliorate.

However, the tear in reality allowed humanity to conduct research into the Astral Plane and harvest its exotic materials, resulting in scientific breakthroughs that drastically increased the quality of life for humanity, and empowered humanity both physically and mentally. With global regulations on labor laws that eliminated the cost of basic necessities and reducing the full-time workweek to 25-60% of modern expectations, humanity was able to spend their free time learning and figuring out the best way to express themselves.

Over the next five centuries, humanity has slowly pushed back the Contamination Zones and started colonizing the Astral Plane by creating 'safe' and navigable zones called the **Astral Wave**. Advancements in **Astral Tech**, particularly the **Projection** system, allowed humans to effectively fight in **Contamination Zones**, leading to the creation of **Wave Skirmishes**, a 'simulation' that trains people on fighting in the **Contamination Zones**. Since combat skill in the **Contamination Zone** scales off imagination, self-expression, and self-actualization in addition to standard martial and tactical prowess, **Wave Skirmishes** allows people to improve their skills by teaching the importance of teamwork, tactical thinking, and customization.

Astral Wave will focus on a small group of friends: Alcor, Rayan, and Giove, who live in New York City in the early 27th century, as they form a remediation crew to stabilize New York City's **Astral Wave**. Along the way, they'll learn more about themselves, their goals, and their dreams.`
    return <Container className={"fade"}>
        <div className={"grid"}>
            <div className={"s12 l4"}>
                <div className={"secondary-container"} style={{display: "flex", height: '100%', flexDirection: "column"}}>
                    <div className={"middle large-padding"}>
                        <h2 className={"primary-text"}>Astral Wave</h2>
                        <div style={{fontSize: "large"}}>
                            <Markdown>
                                **Astral Wave** is a personal worldbuilding project as a way to create a quasi-utopian society that mixes Solarpunk and Cyberpunk aesthetics for my OCs.
                            </Markdown>
                        </div>
                    </div>
                </div>
            </div>
            <img src={cover} alt={"An image for showing off the street Alcor lives on in Astral Wave"} className={"s12 l8 "} style={{width: "100%", height: "100%", objectFit: "cover"}}/>
        </div>
        <div className={"margin-top large-text"}>
            <Markdown>
                {markdown}
            </Markdown>
        </div>
    </Container>;
}