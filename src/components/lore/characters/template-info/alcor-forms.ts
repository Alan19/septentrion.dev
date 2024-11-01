import {FormInformation} from "../TemplatedLorePage";
import aquariusIcon from "../../assets/icons/aquarius-icon.webp";
import aquariusSplashImage from "../../assets/splash/aquarius-splash.webp";
import jupiterIcon from "../../assets/icons/jupiter-icon.webp";
import jupiterSplashImage from "../../assets/splash/jupiter-splash.webp";
import aicoreIcon from "../../assets/icons/aicore-icon.webp";
import aicore3SplashImage from "../../assets/splash/aicore-splash-3.webp";
import aicoreSplashImage from "../../assets/splash/aicore-splash-1.webp";
import aicore2SplashImage from "../../assets/splash/aicore-splash-2.webp";
import triangulumIcon from "../../assets/icons/triangulum-icon.webp";
import triangulumSplashImage from "../../assets/splash/triangulum-splash.webp";
import gemeniIcon from "../../assets/icons/gemini-icon.webp"

export const templatedLorePageInfo: FormInformation[] = [
    {
        name: "Aquarius Form",
        thumbnail: aquariusIcon,
        link: "aquarius",
        description: "A Samurott-Azumarill hybrid designed for aquatic activities.",
        history: "Alcor designed this form by combining the DNA of an Azumarill and Unovan Samurott, on top of adding some shark Pokemon DNA, explaining it's highly flexible amphibious parameters. He frequently used this form when participating in athletic activities during college such as swimming and sparring. The placement of the shell daggers make it impractical to wear long sleeved clothing, so Alcor refrains from using this form on land in colder climates. This is slightly remedied by Alcor's custom tailored wetsuit for this form, which allows for slightly higher temperature tolerance by being able to cover more of his body without interfering with his shell daggers.",
        image: aquariusSplashImage,
        body: "A form highly suited for aquatic activity. Boasting extremely high speed in water along with high aural sensitivity, this form does well on combat both on shores and in water. Its shell daggers provides good close range defense on land, and allows for sonic booms in water. Its shark tail provides higher swim speed compared to a normal Samurott while it's buoyant tail orb allows for enhanced vertical speed in water, allowing for unusual aquatic maneuvers.",
        imageAspectRatio: 0.83,
        specs: [
            {
                md: 4,
                xl: 4,
                content: {
                    tableContents: {
                        Height: "6\"6'",
                        Weapons: "Shell Daggers",
                        Armor: "Shell Armor",
                        Affinity: "Water"
                    }
                },

            },
            {
                md: 4,
                xl: 5,
                content: {
                    tableContents: {
                        Role: "Amphibious Scouting",
                        Mutable: "Yes",
                        "Mutation Type": "Infusion",
                        "Average Power Class": "Rastaban"
                    }
                },
            },
            {
                md: 4,
                xl: 3,
                content: [3, 2, 4, 5, 1, 2]
            },
            {
                md: 2,
                xl: 1,
                content: "https://alcorsiteartbucket.s3.amazonaws.com/webp/aquarius_combat_outfit_v2.webp"
            },
            {
                md: 10,
                xl: 11,
                content: {
                    tableHeader: {
                        header1: "Skill",
                        header2: "Effect"
                    },
                    tableContents: {
                        "Quick-Draw": "Withdraws daggers from scabbard, while striking at off-guard targets in range.",
                        "Dual Slash": "Basic strike with dual daggers.",
                        "Liquidating Jet": "Converts part of body into water to reposition or tackle a target.",
                        "Specialty Boost": "Temporarily increases aural sensitivity and shell armor hardness"
                    }
                }
            },
            {
                md: 2,
                xl: 1,
                content: "https://alcorsiteartbucket.s3.amazonaws.com/webp/aquarius_deep_sea_%25CE%25B2.webp"
            },
            {
                md: 10,
                xl: 11,
                content: {
                    tableHeader: {
                        header1: "Mutation Skill",
                        header2: "Effect"
                    },
                    tableContents: {
                        Transform: "Infuses body with symbiote matter, transforming into a form specialized for deep sea combat. Activates Specialty Boost.",
                        "Venom Strike": "Thrashes with phantasmal tendrils, paralyzing targets hit.",
                        "Tail Stab": "Strikes target with barbed tail.",
                        "Luminescence Boost": "Increases bioluminescence of the orb on the chest."
                    }
                }
            }
        ]
    },
    {
        name: "Jupiter Form",
        thumbnail: jupiterIcon,
        link: "jupiter",
        description: "A Zinogre-Zeraora hybrid with powerful electrical abilities.",
        body: "A form custom built for devastating electricity attacks. This form can store large amounts of electricity using its yellow natural armor and the blue areas on his fur. The black markings on his natural armor light up at full charge. It has extremely high strength and durability through the combination of a Zinogre's large body mass and armored plating, and combined with a slightly modified tail, it is able to execute deadly combos of attacks.",
        image: jupiterSplashImage,
        history: "Alcor designed this form by combining the DNA of a Zinogre and Zeraora, combined with his own DNA, something only made possible through the use of recently discovered mutagenic intelligent subatomic particles. Alcor equipped this form with light berserker armor, as well as energy claws and a double edged spear, both of which are charged with electricity. By default, attempting to integrate Zinogre traits into a body requires tricky balancing of natural armor, ease of use, and flexibility, but by integrating Zeraora traits, Alcor was able to optimize all 3 parameters to a state that he was comfortable with.\n",
        imageAspectRatio: 2516 / 2176,
        specs: [
            {
                md: 4,
                xl: 4,
                content: {
                    tableContents: {
                        Height: `8"1'`,
                        Weapons: "Energy Spear",
                        Armor: "Techwear Barbarian Wear",
                        Affinity: "Electric"
                    }
                },

            },
            {
                md: 4,
                xl: 5,
                content: {
                    tableContents: {
                        Role: "Lightning Bruiser",
                        Mutable: "Yes",
                        "Mutation Type": "Armored Phenomenon",
                        "Average Power Class": "Eltanin"
                    }
                },
            },
            {
                md: 4,
                xl: 3,
                content: [4, 4, 3, 2, 2, 5]
            },
            {
                md: 2,
                xl: 1,
                content: "https://alcorsiteartbucket.s3.amazonaws.com/webp/future_spark.webp"
            },
            {
                md: 10,
                xl: 11,
                content: {
                    tableHeader: {
                        header1: "Skill",
                        header2: "Effect"
                    },
                    tableContents: {
                        "Spear Thrust": "Basic jab with spear.",
                        "Electric Charge": "Rushes forward at the speed of lightning.",
                        "Shocking Grasp": "Emits lightning from hands to briefly stun target.",
                        "Primal Trance": "Increases reaction speed and pain tolerance. Causes jaw guard to rapidly grow into place."
                    }
                }
            },
            {
                md: 2,
                xl: 1,
                content: "https://alcorsiteartbucket.s3.amazonaws.com/webp/jupiter_armored_phenomenon_ver_feat_sutunununu.webp"
            },
            {
                md: 10,
                xl: 11,
                content: {
                    tableHeader: {
                        header1: "Mutation Skill",
                        header2: "Effect"
                    },
                    tableContents: {
                        "Transform - Armormerge": "Symbiote matter envelops body to form futuristic armor. Activates Primal Trance.",
                        "Cosmic Flight": "Temporarily bends space and gravity to increase maneuverability.",
                        "Radiant Spark": "Strikes target with blinding ball of electricity.",
                        Overcharge: "Enhances electricity output to the limit, increasing speed and electric damage."
                    }
                }
            }
        ]
    },
    {
        name: "AICore Form",
        thumbnail: aicoreIcon,
        link: "aicore",
        description: "Alcor and Castor's first attempt at a symbiotic fusion.",
        history: "Castor is a symbiote Alcor resurrected from a meteor he bought from an exotic market. Castor appears to be made out of a special form of matter that responds to imagination, causing changes in himself and it's host based on people they hang out with. However, he is looking into possible enhancements to this form to make it more battle ready instead. He is slightly nervous about using this form during the daytime, often opting to use it at night for parkour or patrolling. Castor's assistance allows Alcor to easily swap between all of his forms in the field and bypassing the need for immobile infrastructure.",
        image: aicore3SplashImage,
        body: "Alcor's form when combined with Castor. Its body is made of exotic matter, which infuses its flesh to create a fairly durable symbiote suit while still looking like skin. Faint particles gradually radiate off his body, creating a ghost-like effect, which is the basis for its short range teleportation ability. Its body also contains various tendrils composed of biomechanical mind-machine interfaces that allow him to interface and hack into machinery. These tendrils can be extended and retracted at will, but usually curl around his limbs by default. The form also sports a pair of clawed gauntlets that drastically enhances the force of its punches, while its claws can slice through light armor with ease. It also sports Castor's signature phantasmal butterfly wing augment, allowing for complex midair maneuvers.",
        imageAspectRatio: 3340 / 2300,
        specs: [
            {
                md: 4,
                xl: 4,
                content: {
                    tableContents: {
                        Height: `6'6"`,
                        Weapons: "Exotic Matter Claws",
                        Armor: "Techwear Vest and Shorts",
                        Affinity: "Light"
                    }
                },

            },
            {
                md: 4,
                xl: 5,
                content: {
                    tableContents: {
                        Role: "Warp Striker",
                        Mutable: "Yes",
                        "Mutation Type": "Evolution Shift",
                        "Average Power Class": "Rastaban"
                    }
                },
            },
            {
                md: 4,
                xl: 3,
                content: [3, 3, 5, 5, 2, 3]
            },
            {
                md: 2,
                xl: 1,
                content: aicoreSplashImage
            },
            {
                md: 10,
                xl: 11,
                content: {
                    tableHeader: {
                        header1: "Skill",
                        header2: "Effect"
                    },
                    tableContents: {
                        "Warp Strike": "Warps forward a short at the speed of light, then slashes target with claws.",
                        "Tendril Lasso": "Quickly coils a tendril around a target. Max warp range is increased on bound targets.",
                        Hack: "Activates biomechanical interfaces on electronics connected to tendrils, allowing for hacks on those devices.",
                        "Frequency Boost": "Increases body frequency, causing incoming attacks to have a small chance of phasing through as well as increasing max warp distance."
                    }
                }
            },
            {
                md: 2,
                xl: 1,
                content: aicore2SplashImage
            },
            {
                md: 10,
                xl: 11,
                content: {
                    tableHeader: {
                        header1: "Mutation Skill",
                        header2: "Effect"
                    },
                    tableContents: {
                        "Mutate - Modeshift": "Shifts over to Castor's autonomous mode configuration. Activates Frequency Boost.",
                        "Glob Barrage": "Fires immobilizing globs of exotic matter at target",
                        Detonate: "Detonates exotic matter globs that are stuck to targets.",
                        "Paralytic Infusion": "Command exotic matter globs to emit paralyzing toxins."
                    }
                }
            }
        ]
    }, {
        name: "Gemini Form",
        thumbnail: gemeniIcon,
        link: "gemini",
        description: "Alcor after being infused with Castor's exotic matter.",
        body: "Alcor's form when his body absorbs Castor's exotic matter using an alternate procedure. It does not take on Castor's standard colors, but its eyes show signs of Castor's influence. While it does not have any of AICore's special features besides its energy wings, it does enhance Alcor's physical prowess to the next level, effectively functioning as his first evolved form. This form features a much stronger tail with two rows of spikes with much higher spike density, along with a muscle system that is optimized for physical strength without losing dexterity. Exotic matter constantly pulses through its stripes, replenishing its body with energy.",
        image: "https://alcorsiteartbucket.s3.amazonaws.com/webp/gemini_fighting_game_outfit.webp",
        history: "Alcor discovered this form when he wanted to use all of his enhanced strength that is only accessible when he is merged with Castor, but without turning into a form unrecognized by the public. By having Castor slowly infuse his cells from the inside of his body, he can effectively stay recognizable while showing off the changes to his body. He also is impressed by the enhanced tail, hair, and horns on his body, giving him a more confident demeanor when he's in this form. As a result, Alcor usually wears a tank top and shorts in this form, allowing him to show off his enhanced body better. He often uses this form when he needs to do anything that requires extra strength or endurance, or when showing off.",
        imageAspectRatio: 1.2111057922450934,
        specs: [
            {
                md: 4,
                xl: 4,
                content: {
                    tableContents: {
                        Height: `6'6"`,
                        Weapons: "Bare Fists and Tail",
                        Armor: "Street Fighter Clothes",
                        Affinity: "Light"
                    }
                },

            },
            {
                md: 4,
                xl: 5,
                content: {
                    tableContents: {
                        Role: "Martial Artist",
                        Mutable: "No",
                        "Average Power Class": "Eltanin"
                    }
                },
            },
            {
                md: 4,
                xl: 3,
                content: [4, 4, 3, 3, 1, 5]
            },
            {
                md: 2,
                xl: 1,
                content: 'https://alcorsiteartbucket.s3.amazonaws.com/webp/move_it_up_boys.webp'
            },
            {
                md: 10,
                xl: 11,
                content: {
                    tableHeader: {
                        header1: "Skill",
                        header2: "Effect"
                    },
                    tableContents: {
                        "Punch Barrage": "Attacks with a series of powerful blows.",
                        "Piercing Jab": "Jabs the target with symbiotically enhanced nails.",
                        "Tail Smash": "Smashes target with spiked tail.",
                        Overclock: "Infuses body with extra symbiote matter, causing stripes to light up. Increases strength and deploys energy wings."
                    }
                }
            }
        ]
    }, {
        name: "Triangulum Form",
        thumbnail: triangulumIcon,
        link: "triangulum",
        description: "An evolved form of Gemini that sacrifices mobility for defence.",
        history: "Alcor developed this form out of a curiosity to discover the limits of his and Castor's potential. This form is often used when there is an emergency, which usually ends up with Alcor shredding his clothes as his body rapidly evolves into this form. The bone and metal plating are influenced by Midnight Lycanroc and various steel type Pokemon, which greatly increases his defense. Alcor has a much wilder personality in this form, and acts slightly uninhibited as a result. Alcor is greatly impressed by how it combines the power of both Gemini and AICore without having much drawbacks.",
        body: "Alcor's form when his body fully completely absorbs the energy from Castor's exotic matter while siphoning energy from variations of him in alternate universes. It sports a more dragonic snout and horns, as well as bone and metal plating on its body. The energy wings have also changed into a slightly more dragonic shape. The exotic matter circulation has also been changed to be managed through his horns, causing its eyes to glow blue. Its physical strength and size is much higher in this form, due to this form's having higher parameters in managing exotic matter. This form specializes in short and mid range defense. It sports three tails, which are even further enhanced compared to his Gemini Form, with higher length and much sharper spikes that are designed to impale targets. Each tail also powers three drones each, which can fire lasers are distant targets to make it harder for them to approach. It also uses a pair of exotic matter clawed gauntlets to fight in close range.",
        image: triangulumSplashImage,
        imageAspectRatio: 0.7761194029850746,
        specs: [
            {
                md: 4,
                xl: 4,
                content: {
                    tableContents: {
                        Height: `8'1"`,
                        Weapons: "Clawed Energy Gauntlet, Triple Spiked Tails, and Laser Drones",
                        Armor: "N/A",
                        Affinity: "Light"
                    }
                },

            },
            {
                md: 4,
                xl: 5,
                content: {
                    tableContents: {
                        Role: "Martial Artist",
                        Mutable: "No",
                        "Average Power Class": "Tyl"
                    }
                },
            },
            {
                md: 4,
                xl: 3,
                content: [4, 5, 1, 2, 4, 5]
            },
            {
                md: 12,
                content: {
                    tableHeader: {
                        header1: "Skill",
                        header2: "Effect"
                    },
                    tableContents: {
                        "Devastating Swipe": "Swipes close up enemies with energy claws.",
                        "Piercing Jab": "Jabs the target with symbiotically enhanced nails.",
                        "Triple Tail Whip": "Uses three tails to drive targets back.",
                        Overclock: "Infuses body with extra symbiote matter, causing stripes to light up. Increases strength and deploys energy wings."
                    }
                }
            }
        ]
    }
]