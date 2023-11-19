import {Stack} from "@mui/material";
import {GitHub, Image, Twitter} from "@mui/icons-material";
import {SocialMediaButton} from "./SocialMediaButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitch} from "@fortawesome/free-brands-svg-icons/faTwitch";
import {faCircle} from "@fortawesome/free-solid-svg-icons/faCircle"
import {faCloud} from "@fortawesome/free-solid-svg-icons/faCloud"
import CollectionsIcon from '@mui/icons-material/Collections';
import {InternalLinkButton} from "./InternalLinkButton";
import {faDragon} from "@fortawesome/free-solid-svg-icons";

export function SocialsLinks() {
    return (
        <Stack spacing={2} alignItems={"stretch"}>
            <SocialMediaButton
                icon={<Twitter/>}
                text={"Twitter"}
                link={"https://twitter.com/FaintAlcor"}
            />
            <SocialMediaButton
                icon={<GitHub/>}
                text={"Github"}
                link={"https://github.com/Alan19/"}
            />
            <SocialMediaButton
                icon={<FontAwesomeIcon icon={faTwitch}/>}
                text={"Twitch"}
                link={"https://www.twitch.tv/starbreaker20"}
            />
            <SocialMediaButton
                icon={<Image/>}
                text={"RefSheets"}
                link={"https://refsheet.net/FaintAlcor/alcor"}
            />
            <SocialMediaButton
                icon={<FontAwesomeIcon icon={faCircle}/>}
                text={"Cohost"}
                link={"https://cohost.org/alcor"}
            />
            <SocialMediaButton
                icon={<FontAwesomeIcon icon={faCloud}/>}
                text="BlueSky"
                link="https://bsky.app/profile/faintalcor.bsky.social"
            />
            <InternalLinkButton icon={<CollectionsIcon/>} text={"Gallery"} link={'/gallery?Featured=1'}/>
            <InternalLinkButton icon={<FontAwesomeIcon icon={faDragon}/>} text={"Alcor's Forms"} link={'/alcor_forms'}/>
        </Stack>
    );
}
