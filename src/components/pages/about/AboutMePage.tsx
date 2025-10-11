import {useDocumentTitle} from "usehooks-ts";
import {Container} from "../../ui/Container.tsx";
import {useIsMobile} from "../../../hooks/useIsMobile.ts";
import {Bio} from "./Bio.tsx";

export function AboutMePage() {
    useDocumentTitle("About Me - septentrion.dev");
    const mobile = useIsMobile()

    // TODO Add more text
    return (
        <Container className={"fade"}>
            <h2 className={"primary-text"}>About Me (IRL)</h2>
            <div style={{display: "flex", gap: '1rem', flexDirection: mobile ? "column" : 'row'}}>
                <img src={"https://alcorsiteartbucket.s3.amazonaws.com/webp/moodboard.webp"} style={{width: '100%', objectFit: "contain", flex: 7}}/>
                <Bio/>
            </div>
        </Container>
    );
}