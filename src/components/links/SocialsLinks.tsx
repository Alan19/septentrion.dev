import {Stack} from "@mui/material";
import {SocialMediaButton} from "./SocialMediaButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CollectionsIcon from '@mui/icons-material/Collections';
import InternalLinkButton from "./InternalLinkButton";
import {faGithub, faTwitch, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faCloud} from "@fortawesome/free-solid-svg-icons";
import {Person} from "@mui/icons-material";

export function SocialsLinks() {
    return (
        <>
            <SocialMediaButton
                icon={<FontAwesomeIcon icon={faTwitter}/>}
                text={"Twitter"}
                link={"https://twitter.com/FaintAlcor"}
            />
            <SocialMediaButton
                icon={<FontAwesomeIcon icon={faGithub}/>}
                text={"Github"}
                link={"https://github.com/Alan19/"}
            />
            <SocialMediaButton
                icon={<FontAwesomeIcon icon={faTwitch}/>}
                text={"Twitch"}
                link={"https://www.twitch.tv/starbreaker20"}
            />
            <SocialMediaButton
                icon={<FontAwesomeIcon icon={faCloud}/>}
                text="BlueSky"
                link="https://bsky.app/profile/faintalcor.bsky.social"
            />

            <Stack marginTop={2} spacing={1}>
                <InternalLinkButton icon={<CollectionsIcon/>} text={"Gallery"} link={'/gallery'}/>
                <InternalLinkButton icon={<Person/>} text={"About Me"} link={'/about'}/>
            </Stack>
        </>
    );
}
