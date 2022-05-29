import {Stack} from "@mui/material";
import React from "react";
import {GitHub, Image, Telegram, Twitter} from "@mui/icons-material";
import {SocialMediaButton} from "./SocialMediaButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitch} from "@fortawesome/free-brands-svg-icons/faTwitch";

export function ButtonStack() {
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
                icon={<Telegram/>}
                text={"Telegram"}
                link={"https://telegram.dog/FaintAlcor"}
            />
        </Stack>
    );
}
