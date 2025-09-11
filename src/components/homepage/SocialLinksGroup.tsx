import {SocialMediaButton} from "../ui/SocialMediaButton.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBluesky, faGithub, faTwitch, faTwitter} from "@fortawesome/free-brands-svg-icons";

export function SocialLinksGroup() {
    return <article>
        <SocialMediaButton
            icon={<FontAwesomeIcon icon={faTwitter}/>}
            link={"https://twitter.com/FaintAlcor"}
        />
        <SocialMediaButton
            icon={<FontAwesomeIcon icon={faGithub}/>}
            link={"https://github.com/Alan19/"}
        />
        <SocialMediaButton
            icon={<FontAwesomeIcon icon={faTwitch}/>}
            link={"https://www.twitch.tv/starbreaker20"}
        />
        <SocialMediaButton
            icon={<FontAwesomeIcon icon={faBluesky}/>}
            link="https://bsky.app/profile/faintalcor.bsky.social"
        />
    </article>;
}