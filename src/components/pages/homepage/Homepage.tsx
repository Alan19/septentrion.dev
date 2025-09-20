import {Profile} from "./Profile.tsx";
import {useDocumentTitle} from "usehooks-ts";
import {HomepageImage} from "./HomepageImage.tsx";
import {ModeToggle} from "../../ui/ModeToggle.tsx";
import {clsx} from "clsx";
import {useIsMobile} from "../../../hooks/useIsMobile.ts";
import "./homepage.css"
import {Container} from "../../ui/Container.tsx";

export function Homepage() {
    useDocumentTitle("septentrion.dev");

    return <>
        {useIsMobile() && <div style={{position: "absolute", right: "1rem", top: "1rem"}}><ModeToggle className={clsx("transparent circle")}/></div>}
        <Container className={"middle homepage-content"}>
            <div className={"profile"}>
                <Profile/>
            </div>
            <div className={"homepage-icon"}>
                <HomepageImage/>
            </div>
        </Container>
    </>
}