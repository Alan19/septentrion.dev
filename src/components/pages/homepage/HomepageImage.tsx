import logo from "../../../assets/company-logo-colored.png"

export function HomepageImage() {
    return <img className={"border primary-border"} style={{width: "100%", borderRadius: "50%"}} src={logo} alt={"a blue circular with a stylized bow pointing upward and a knife pointing leftward"}/>;
}