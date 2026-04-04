import {Container} from "../../../ui/Container.tsx";

export function Credits() {
    const credits: ({ name: string; link: string })[] = [
        {name: "Kyzer", link: "https://kyzer.xyz/"},
        {name: "NerdyWoffy", link: "https://nerdywoffy.me/"},
        {name: "GodBirdArt", link: "https://godbirdart.com/"},
        {name: "Material You", link: "https://m3.material.io"},
        {name: "BeerCSS", link: "https://www.beercss.com/"}
    ]
    return <Container className={"fade"}>
        <h2 className={"primary-text"}>Credits and Inspirations</h2>
        Here's a list of people and concepts who I was inspired by when making this website!
        <ul>
            {credits.map(value => <li key={value.name}>
                <a className={"primary-text"} href={value.link}>{value.name}</a>
            </li>)}
        </ul>
    </Container>;
}