export function SocialMediaButton(props: { icon: React.ReactNode, link: string }) {
    const {icon, link} = props;

    return <a target={"noreferrer noopener"} href={link}>
        <button className={"transparent circle no-margin primary-text"}>
            {icon}
        </button>
    </a>;
}
