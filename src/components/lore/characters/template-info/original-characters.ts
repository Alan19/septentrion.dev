import {FormInformation} from "../TemplatedLorePage";
import alcorIcon from "../../assets/icons/alcor_icon.png";
import alcorSplash from "../../assets/splash/alcor-splash.png";
import castorIcon from "../../assets/icons/castor_icon.png";
import castorSplashImage from "../../assets/splash/castor-splash.png";
import castor2SplashImage from "../../assets/castor-evolved.webp";

export const originalCharacters: FormInformation[] = [
    {
        name: "Alcor",
        thumbnail: alcorIcon,
        link: "alcor",
        description: "",
        image: alcorSplash,
        imageAspectRatio: 0.6218760142810775,
        body: "Alcor is a cougar-dragon hybrid with telekinetic powers. His works as an inventor as his day job, but also enjoys streaming video games, archery, and coding. He prefers daggers as his primary weapon, as he tries to adopt a stealthy and rouge-like fighting style, although he is not actually formally trained in combat. His body is fairly fit, but not overly muscular... at least in his normal form. Almost everything Alcor uses can be claimed to be unique, as he's modified almost everything to fit his preferences. This even includes things like his clothes, computer personalization, and weapons.",
        history: "Alcor was originally a human, but he eventually had his body modified to become an anthropomorphic cougar-dragon hybrid once he was an adult. His reasons for choosing a cougar-dragon hybrid are that it would be unique, and it was species of the character he played in a role playing game he was playing for a long time. While his transformation to his new body went seamlessly, he also liked his human body. However, he cannot revert back to it easily until he created Castor, his symbiote, who can manage basic transformation effects for him.",
        specs: [
            {md: 4, content: {tableContents: {Height: `5'5"`, Weapons: "Nanotech Daggers", Armor: "Technical Outerwear", Affinity: "Kinesis"}}},
            {md: 4, xs: 12, content: [2, 1, 5, 5, 3, 4]},
            {md: 4, content: {tableContents: {"Favorite Food": "Strawberries", "Zodiac Sign": "Virgo", "Average Bedtime": "2AM"}},},
            {md: 6, content: {tableContents: {Role: "Technical Rogue", Mutable: "Yes", "Average Power Class": "Thuban / Rastaban"}},},
            {md: 6, xs: 12, content: 'https://alcorsiteartbucket.s3.amazonaws.com/webp/character_movement_studies_but_blue.webp'}
        ],
        gallery: [
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/supportive_sidekick.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/lance_hero.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/sci_fi_mode_on.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/astrologist_monk_rogue.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/chill_season_painbrush.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/streetwear_x_traditional_clothing.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/yuru_alcor.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/cafe_superhero.webp",
        ]
    },
    {
        name: "Castor",
        thumbnail: castorIcon,
        link: "castor",
        description: "Alcor's symbiote companion, who helps keep him emotionally stable and also powers him up.",
        image: castorSplashImage,
        imageAspectRatio: 1,
        body: "Castor is a symbiote that Alcor made by extracting alien DNA from a meteorite, which was then fused with his own DNA to increase the symbiote's compatibility with his own body. While he looks a bit scary and spooky, he's actually really helpful, and helps Alcor destress and unwind from work. When Alcor is incapacitated, Castor is able to seamlessly assume control of Alcor's body to defend him from further harm. This increases the percentage of exotic matter in Alcor's body, allowing Castor to mold Alcor's body into an evolved form personalized for Castor, dubbed Sentinel Mode. In Sentinel Mode, Castor tries his best to shield Alcor from further harm and heal his injuries as quickly as possible by focusing on crowd control, speed, and perception. Castor can also assume this form for short periods of time outside of combat, but with severly dimished combat abilites, so it is purely cosmetic.",
        history: "Castor's body is made up of exotic matter, which powers a large chunk of Alcor's inventions with space warping and interfacing abilities. However, the generation rate of exotic matter is slow, so there is a long waitlist for commissions that use said material. On top of that, Alcor has his own personal projects he is working on, which makes the waitlist even longer.",
        specs: [
            {md: 5, content: {tableContents: {Height: `1'6" (Default) / 5'5" (Transformed)`, Weapons: "EM Bullets", Armor: "EM Accessories", Affinity: "Light"}}},
            {content: castor2SplashImage, md: 3},
            {content: [1, 3, 4, 5, 4, 3], md: 4}
        ],
        gallery: [
            "https://alcorsiteartbucket.s3.amazonaws.com/thumbnail/castor_evolved.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/thumbnail/the_hamburger_accident.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/alts/the_hamburger_accident_1.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/thumbnail/castor_shading_test.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/couple_s_sketchpage_2022.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/monocolor_alcor_and_castor.webp",
            "https://alcorsiteartbucket.s3.amazonaws.com/webp/ai_core_reference_sheet.webp"
        ]
    }
]