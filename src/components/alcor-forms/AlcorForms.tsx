import {Container, Divider, Grid, Stack, Typography} from "@mui/material";
import React from "react";

function CharacterAttribute(props: { fieldName: String, fieldValue: String }) {
    return <div>
        <Typography variant={"h6"}>{props.fieldName}</Typography>
        <Typography variant={"subtitle1"}>{props.fieldValue}</Typography>
    </div>;
}

export function AlcorForms() {
    return (
        <Container style={{marginTop: '8px'}}>
            <Typography variant={"h3"} fontFamily={"Origin Tech"}>Alcor's Forms</Typography>
            <Divider style={{marginBottom: '8px'}}/>
            <Grid container spacing={4}>
                <Grid item md={7}>
                    <Typography variant={"h4"}>Aquarius Form</Typography>
                    <Typography variant={"body1"}>
                        A form highly suited for aquatic activity. Boasting extremely high speed in water along with
                        high aural sensitivity, this form does well on combat both on shores and in water. Its shell
                        daggers
                        provides good close range defense on land, and allows for sonic booms in water. Its shark tail
                        provides higher swim speed compared to a normal Samurott while it's buoyant tail orb allows for
                        enhanced vertical speed in water, allowing for unusual aquatic maneuvers.
                    </Typography>
                    <Typography variant={"h5"}>History</Typography>
                    <Typography>
                        Alcor designed this form by combining the DNA of an Azumarill and Unovan Samurott, on top of
                        adding
                        some shark Pokemon DNA, explaining it's highly flexible amphibious parameters. He frequently
                        used this form when participating in athletic activities during college such as swimming and
                        sparring. The placement of the shell daggers make it impractical to wear long sleeved clothing,
                        so Alcor refrains from using this form on land in colder climates. This is slightly remedied by
                        Alcor's custom tailored wetsuit for this form, which allows for slightly higher temperature
                        tolerance by being able to cover more of his body without interfering with his shell daggers.
                    </Typography>
                    <Divider style={{marginTop: '8px', marginBottom: '8px'}}/>
                    <Stack direction={"column"} spacing={1}>
                        <CharacterAttribute fieldName={"Height"} fieldValue={"5'6\""}/>
                        <CharacterAttribute fieldName={"Weapons"} fieldValue={"Supercavitating Shell Daggers"}/>
                        <CharacterAttribute fieldName={"Affinity"} fieldValue={"Water"}/>
                    </Stack>
                </Grid>
                <Grid item md={5}>
                    <img style={{width: '100%'}}
                         src={"https://alcorsiteartbucket.s3.amazonaws.com/aquarius_form_by_mixter.png"}/>
                </Grid>
            </Grid>
            <Divider style={{marginTop: '8px', marginBottom: '8px'}}/>
            <Grid container spacing={4}>
                <Grid item md={7}>
                    <Typography variant={"h4"}>Jupiter Form</Typography>
                    <Typography variant={"body1"}>
                        A form custom built for devastating electricity attacks. This form can store large amounts of
                        electricity using its yellow natural armor and the blue areas on his fur. The black markings on
                        his natural armor light up at full charge. It has extremely high strength and durability through
                        the combination of a Zinogre's large body mass and armored plating, and combined with a slightly
                        modified tail, it is able to execute deadly combos of attacks.
                    </Typography>
                    <Typography variant={"h5"}>History</Typography>
                    <Typography>
                        Alcor designed this form by combining the DNA of a Zinogre and Zeraora, combined with his own
                        DNA, something only made possible through the use of recently discovered mutagenic
                        intelligent subatomic particles. Alcor equipped this form with light
                        berserker armor, as well as energy claws and a double edged spear, both of which are charged
                        with electricity. By default, attempting to integrate Zinogre traits into a body requires tricky
                        balancing of natural armor, ease of use, and flexibility, but by integrating Zeraora
                        traits, Alcor was able to optimize all 3 parameters to a state that he was comfortable with.
                    </Typography>
                    <Divider style={{marginTop: '8px', marginBottom: '8px'}}/>
                    <Stack direction={"column"} spacing={1}>
                        <CharacterAttribute fieldName={"Height"} fieldValue={"8'1\""}/>
                        <CharacterAttribute fieldName={"Weapons"}
                                            fieldValue={"Energy Claws and Double Edged Hardlight Partizan"}/>
                        <CharacterAttribute fieldName={"Affinity"} fieldValue={"Electric"}/>
                    </Stack>
                </Grid>
                <Grid item md={5}>
                    <img style={{width: '100%'}} src={"https://alcorsiteartbucket.s3.amazonaws.com/jupiter_form.png"}/>
                </Grid>
            </Grid>
            <Divider style={{marginTop: '8px', marginBottom: '8px'}}/>
            <Grid container spacing={4}>
                <Grid item md={7}>
                    <Typography variant={"h4"}>AICore Form</Typography>
                    <Typography variant={"body1"}>
                        Alcor's form when combined with Castor. Its body is made of exotic matter, which infuses its
                        flesh to create a fairly durable symbiote suit while still looking like skin. Faint particles
                        gradually radiate off his body, creating a ghost-like effect, which is the basis for its short
                        range teleportation ability. Its body also contains various tendrils composed of biomechanical
                        mind-machine interfaces that allow him to interface and hack into machinery. These tendrils can
                        be extended and retracted at will, but usually curl around his limbs by default. The form also
                        sports a pair of clawed gauntlets that drastically enhances the force of its punches, while its
                        claws can slice through light armor with ease. It also sports Castor's signature phantasmal
                        butterfly wing augment, allowing for complex midair maneuvers.
                    </Typography>
                    <Typography variant={"h5"}>History</Typography>
                    <Typography>
                        Castor is a symbiote Alcor resurrected from a meteor he bought from an exotic market. Castor
                        appears to be made out of a special form of matter that responds to imagination, causing changes
                        in himself and it's host based on people they hang out with. However, he is looking into
                        possible enhancements to this form to make it more battle ready instead. He is slightly nervous
                        about using this form during the daytime, often opting to use it at night for parkour or
                        patrolling. Castor's assistance allows Alcor to easily swap between all of his forms in the
                        field and bypassing the need for immobile infrastructure.
                    </Typography>
                    <Divider style={{marginTop: '8px', marginBottom: '8px'}}/>
                    <Stack direction={"column"} spacing={1}>
                        <CharacterAttribute fieldName={"Height"} fieldValue={"6'6\""}/>
                        <CharacterAttribute fieldName={"Weapons"} fieldValue={"Exotic Matter Clawed Gauntlet"}/>
                        <CharacterAttribute fieldName={"Affinity"} fieldValue={"Light"}/>
                    </Stack>
                </Grid>
                <Grid item md={5}>
                    <img style={{width: '100%'}}
                         src={"https://alcorsiteartbucket.s3.amazonaws.com/ai_core_raffle_sketch.jpg"}/>
                </Grid>
            </Grid>
            <Divider style={{marginTop: '8px', marginBottom: '8px'}}/>
            <Grid container spacing={4}>
                <Grid item md={7}>
                    <Typography variant={"h4"}>M⬡ Form</Typography>
                    <Typography variant={"body1"}>
                        Alcor's form when his body absorbs Castor's exotic matter using an alternate procedure. It does
                        not take on Castor's standard colors, but its eyes show signs of Castor's influence. While it
                        does not have any of AICore's special features besides its energy wings, it does enhance Alcor's
                        physical prowess to the next level, effectively functioning as his first evolved form. This form
                        features a much stronger tail with two rows of spikes with much higher spike density, along with
                        a muscle system that is optimized for physical strength without losing dexterity. Exotic matter
                        constantly pulses through its stripes, replenishing its body with energy.
                    </Typography>
                    <Typography variant={"h5"}>History</Typography>
                    <Typography>
                        Alcor discovered this form when he wanted to use all of his enhanced strength that is only
                        accessible when he is merged with Castor, but without turning into a form unrecognized by the
                        public. By having Castor slowly infuse his cells from the inside of his body, he can effectively
                        stay recognizable while showing off the changes to his body. He also is impressed by the
                        enhanced tail, hair, and horns on his body, giving him a more confident demeanor when he's in
                        this form. As a result, Alcor usually wears a tank top and shorts in this form, allowing him to
                        show off his enhanced body better. He often uses this form when he needs to do anything that
                        requires higher than normal
                        physical ability while there's no state of emergency that necessitates the use of his AICore
                        form.
                    </Typography>
                    <Divider style={{marginTop: '8px', marginBottom: '8px'}}/>
                    <Stack direction={"column"} spacing={1}>
                        <CharacterAttribute fieldName={"Height"} fieldValue={"6'6\""}/>
                        <CharacterAttribute fieldName={"Weapons"} fieldValue={"Bare Fists and Spiked Tail"}/>
                        <CharacterAttribute fieldName={"Affinity"} fieldValue={"Light"}/>
                    </Stack>
                </Grid>
                <Grid item md={5}>
                    <img style={{width: '100%'}} src={"https://alcorsiteartbucket.s3.amazonaws.com/m6_form.jpg"}/>
                </Grid>
            </Grid>
            <Divider style={{marginTop: '8px', marginBottom: '8px'}}/>
            <Grid container spacing={4}>
                <Grid item md={7}>
                    <Typography variant={"h4"}>Triangulum Form</Typography>
                    <Typography variant={"body1"}>
                        Alcor's form when his body fully completely absorbs the energy from Castor's exotic matter while
                        siphoning energy from variations of him in alternate universes. It sports a more dragonic snout
                        and horns, as well as bone and metal plating on its body. The energy wings have also changed
                        into a slightly more dragonic shape. The exotic matter circulation has also been changed to be
                        managed through his horns, causing its eyes to glow blue. Its physical strength and size is much
                        higher in this form, due to this form's having higher parameters in managing exotic matter. This
                        form specializes in short and mid range defense. It sports three tails, which are even further
                        enhanced compared to his M⬡ Form, with higher length and much sharper spikes that are designed
                        to impale targets. Each tail also powers three drones each, which can fire lasers are distant
                        targets to make it harder for them to approach. It also uses a pair of exotic matter clawed
                        gauntlets to fight in close range.
                    </Typography>
                    <Typography variant={"h5"}>History</Typography>
                    <Typography>
                        Alcor developed this form out of a curiosity to discover the limits of his and Castor's
                        potential. This form is often used when there is an emergency, which usually ends
                        up with Alcor shredding his clothes as his body rapidly evolves into this form. The bone and
                        metal plating are influenced by Lycanrocs and various steel type Pokemon, which greatly
                        increases his defense. Alcor has a much wilder personality in this form, and acts slightly
                        uninhibited as a result, and is greatly impressed by how it combines the power of both M⬡ and
                        AICore.
                    </Typography>
                    <Divider style={{marginTop: '8px', marginBottom: '8px'}}/>
                    <Stack direction={"column"} spacing={1}>
                        <CharacterAttribute fieldName={"Height"} fieldValue={"8'1\""}/>
                        <CharacterAttribute fieldName={"Weapons"}
                                            fieldValue={"Exotic Energy Gauntlet, Triple Spiked Tails, and Laser Drones"}/>
                        <CharacterAttribute fieldName={"Affinity"} fieldValue={"Light"}/>
                    </Stack>
                </Grid>
                <Grid item md={5}>
                    <img style={{width: '100%'}}
                         src={"https://alcorsiteartbucket.s3.amazonaws.com/triangulum_form.jpg"}/>
                </Grid>
            </Grid>

        </Container>
    );
}