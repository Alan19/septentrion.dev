import {Profile} from "./Profile.tsx";
import {useDocumentTitle} from "usehooks-ts";
import {HomepageImage} from "./HomepageImage.tsx";

export function Homepage() {
    useDocumentTitle("septentrion.dev");

    return <div className={"grid middle-align"} style={{height: "100%", padding: '8rem'}}>
        <div className={"s12 l7"}>
            <Profile/>
        </div>
        <div className={"s12 l5"}>
            <HomepageImage/>
        </div>
    </div>
}