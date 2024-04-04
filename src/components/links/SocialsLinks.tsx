import {Stack} from "@mui/material";
import {SocialMediaButton} from "./SocialMediaButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CollectionsIcon from '@mui/icons-material/Collections';
import React from "react";
import InternalLinkButton from "./InternalLinkButton";
import {faGithub, faTwitch, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faCloud, faDragon} from "@fortawesome/free-solid-svg-icons";

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
                <InternalLinkButton icon={<CollectionsIcon/>} text={"Gallery"} link={'/gallery?Featured=1'}/>
                <InternalLinkButton icon={<FontAwesomeIcon icon={faDragon}/>} text={"About"} link={'/about'}/>
            </Stack>
        </>
    );
}
