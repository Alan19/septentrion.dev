import {Container} from "../../../ui/Container.tsx";
import {format} from "date-fns";
import Markdown from "react-markdown";

export function Changelog() {
    const entries: {version: string, date: Date, description: string}[] = [
        {
            version: "2.1.0",
            date: new Date(2025, 4, 3),
            // language=Markdown
            description: `Start of old-web revival project!
- Add new pages to "About" page
  - List of Vanguard decks
  - Revamped about
  - Added Astral Wave into
  - Mobile friendly navigation drawer
- Start maintaining a changelog`
        }
    ]
    return <Container className={"fade"}>
        <h2 className={"primary-text"}>Changelog</h2>
        <ul className={"list border"}>
            {entries.map(value => <li key={value.version}>
                <div>
                    <h3>{value.version}</h3>
                    <time>{format(value.date, "MM/dd/yyyy")}</time>
                    <Markdown>
                        {value.description}
                    </Markdown>
                </div>
            </li>)}
        </ul>
    </Container>;
}