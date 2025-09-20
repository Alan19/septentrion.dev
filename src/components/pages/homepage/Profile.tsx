import {ProfileInfo} from "./ProfileInfo.tsx";
import {SocialLinksGroup} from "./SocialLinksGroup.tsx";

export function Profile() {
    return <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
        <div>
            <ProfileInfo/>
        </div>
        <div style={{display: "flex", gap: 4}}>
            <SocialLinksGroup/>
        </div>
    </div>;
}