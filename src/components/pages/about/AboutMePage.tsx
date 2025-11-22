import {useDocumentTitle} from "usehooks-ts";
import {Container} from "../../ui/Container.tsx";
import moodboard from "./moodboard.webp"
export function AboutMePage() {
    useDocumentTitle("About Me - septentrion.dev");

    // TODO Add more text
    return (
        <Container className={"fade"}>
            <div className={"grid medium-space top-margin"}>
                <div className={"m6 s12"}>
                    <h2 className={"primary-text"}>About Me (IRL)</h2>
                    <div><b>Name:</b> Alan</div>
                    <div><b>Country:</b> USA</div>
                    <div><b>Hobbies:</b> Gardening, Tabletop Roleplaying Games, TCGs, Video Games</div>
                    <p>Hello, I'm Alan, a software engineer who lives in New York City! This is my website for archiving my commissioned artworks and documenting my OCs' lore and the world they live in (soon™)! I also use this as a way to learn more about web development, especially in regards to CSS and CI/CD! I also play Pokemon Go, Maplestory, and Pathfinder 2nd Edition in my spare time. I hope you have a nice time looking at the artwork and at my very amateurish worldbuilding!</p>
                    <p>If you're curious about how this website is made, the front end uses React and Typescript. I use BeerCSS to implement the Material You design language. For uploading and compressing images, I use an Express backend, and the compressed images are stored on an S3 bucket at multiple file sizes to reduce the amount people have to download on low download speeds or mobile data. This website is updated on every commit to the main branch using a Github action that builds the website and
                        deploys it to this URL through GitHub pages!</p>

                </div>
                <img src={moodboard} style={{width: '100%', objectFit: "contain"}} className={"m6 s12"}/>
            </div>
        </Container>
    );
}