import moodboard from "../../../../assets/about.webp";
import {Container} from "../../../ui/Container.tsx";
import Markdown from "react-markdown";

export function AboutMe() {
    // language=Markdown
    let intro = `**Name**: Alan  
**Country**: USA  
**Hobbies**: Gardening, TTRPGs, Tea, TCGs, Video Games

Hello, I'm Alan, a software engineer living in NYC! This is my personal website for archiving my commissioned artworks and documenting the lore of my original characters and the world they live in! I also use this as a way to learn more about web development, especially in regard to CSS and CI/CD! I also play _Pokémon GO_, _Maplestory_, _Cardfight!! Vanguard_, and _Pathfinder 2nd Edition_ in my spare time. I hope you have a nice time looking at the artwork and at my very amateurish worldbuilding!

If you're curious about how this website is made, the front end uses ReactJS and Typescript, using BeerCSS to implement the Material You design language. For uploading and compressing images, I use an Express backend, and the compressed images are stored on an S3 bucket at multiple file sizes to reduce the amount people have to download on low download speeds or mobile data. This website is updated on every commit to the main branch using a Github action that builds the
  website and deploys it to this URL through GitHub pages!
`;
    return <Container className={"fade"}>
        <div className={"grid medium-space"}>
            <div className={"m6 s12"}>
                <h2 className={"primary-text"}>About Me (IRL)</h2>
                <div className={"large-text"}>
                    <Markdown>
                        {intro}
                    </Markdown>
                </div>
            </div>
            <img alt={"me and Alcor"} src={moodboard} style={{width: "100%", objectFit: "contain"}} className={"m6 s12"}/>
        </div>
    </Container>
    ;
}