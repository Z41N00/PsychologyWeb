import { useState } from "react";

const C = {
  bg: "#0f0f13", card: "#1c1c26", nav: "#18181f", border: "#2a2a3a",
  purple: "#a78bfa", purpleDim: "#7C3AED22", purpleBorder: "#7C3AED44",
  text: "#e2e2e8", muted: "#9ca3af", bright: "#f1f1f5", dim: "#6b7280",
  green: "#6ee7b7", greenBg: "#0f1f18", greenBorder: "#05966944",
  amber: "#fbbf24", red: "#f87171", blue: "#60a5fa",
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const EXAM_DATES = [
  { paper: "Paper 1", date: "Thursday 7th May 2026", days: Math.ceil((new Date("2026-05-07") - new Date()) / 86400000) },
  { paper: "Paper 2", date: "Thursday 14th May 2026", days: Math.ceil((new Date("2026-05-14") - new Date()) / 86400000) },
];

const PAST_PAPERS = {
  "Paper 1": [
    { year: "June 2024", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/June%202024%20QP%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/June%202024%20MS%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf" },
    { year: "June 2023", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/June%202023%20QP%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/June%202023%20MS%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf" },
    { year: "June 2022", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/June%202022%20QP%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/June%202022%20MS%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf" },
    { year: "Nov 2021", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/November%202021%20QP%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/November%202021%20MS%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf" },
    { year: "June 2020", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/June%202020%20QP%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/June%202020%20MS%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf" },
    { year: "June 2019", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/June%202019%20QP%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/June%202019%20MS%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf" },
    { year: "Specimen", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/Specimen%20QP%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-1/Specimen%20MS%20-%20Paper%201%20OCR%20Psychology%20GCSE.pdf" },
  ],
  "Paper 2": [
    { year: "June 2024", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/June%202024%20QP%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/June%202024%20MS%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf" },
    { year: "June 2023", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/June%202023%20QP%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/June%202023%20MS%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf" },
    { year: "June 2022", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/June%202022%20QP%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/June%202022%20MS%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf" },
    { year: "Nov 2021", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/November%202021%20QP%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/November%202021%20MS%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf" },
    { year: "June 2020", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/June%202020%20QP%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/June%202020%20MS%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf" },
    { year: "June 2019", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/June%202019%20QP%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/June%202019%20MS%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf" },
    { year: "Specimen", qp: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/Specimen%20QP%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf", ms: "https://pmt.physicsandmathstutor.com/download/Psychology/GCSE/Past-Papers/OCR/Paper-2/Specimen%20MS%20-%20Paper%202%20OCR%20Psychology%20GCSE.pdf" },
  ],
};

const TOPICS = [
  {
    id: "memory", name: "Memory", paper: 2, color: "#a78bfa",
    keyDebates: ["Nature (biological) vs. Nurture (influenced by environment)", "Reductionism (MSM & theory of reconstructive memory)", "Lab Experiments (Braun) vs. Case Studies (Wilson)"],
    keyConcepts: [
      { term: "Information Processing", def: "Brain works like a computer: input (senses) → encoding → storage → retrieval." },
      { term: "Hippocampus", def: "Part of limbic system. Information must pass through here before entering long-term storage. Important for semantic memories/autobiographical memories." },
      { term: "Cerebellum", def: "Responsible for learning movements and procedural memory (motor skills)." },
      { term: "Amnesia", def: "Anterograde amnesia: unable to form new memories (hippocampus damage). Retrograde amnesia: unable to recall existing memories (frontal lobe damage)." },
    ],
    sections: [
      { title: "Multi-Store Model of Memory", content: `Memory has THREE separate stores: sensory store, short-term memory (STM), and long-term memory (LTM).\n\nSensory Store: Information from our senses enters briefly (few seconds), limited capacity. If we don't pay attention it decays.\n\nSTM: Limited capacity (7±2 items) and duration (30 seconds). Info goes from sensory → STM. If not rehearsed it becomes displaced or decays.\n\nLTM: Unlimited capacity and duration. When info in STM goes through maintenance rehearsal (repeating) or elaborative rehearsal (giving meaning), it transfers into LTM. Encoding is mainly semantic but can also be visual and auditory.\n\nLimitations:\n- Over-emphasises the importance of rehearsal. Attaching meaning just as effective.\n- The model is reductionist in its explanation of memory.\n- Isn't supported by neuropsychological evidence — LTM more than one store.` },
      { title: "Theory of Reconstructive Memory", content: `Memory is influenced by our prior experiences and schemas (mental representation of an object or situation). We fill in the gaps to make memories.\n\nSchemas: People construct memories based on prior experiences but we don't tend to recall them in chronological order. Our beliefs can influence the memory.\n\nPrior Experiences: Our memories are influenced by prior experiences so are never entirely accurate.\n\nExpectations: Our knowledge & beliefs can influence schemas & distort memories.\n\nLeading Questions: Can be particularly effective in manipulating people's memories through suggestion.\n\nConfabulation: Making up details to fill in the blanks in a memory — 'honest lying'.\n\nLimitations:\n- Too reductionist — many complex factors may affect memory recall.\n- Doesn't account for other factors that contribute to recall such as anxiety, age.\n- Doesn't explain how memories are processed.` },
    ],
    studies: [
      { name: "Wilson et al. (2008) — Clive Wearing Study", aim: "To report on the case of Clive Wearing who suffered from a severe case of amnesia.", sample: "One male — Clive Wearing.", method: "Longitudinal case study using interviews, MRI scans, IQ tests.", procedure: "In March 1985, Clive developed HSVE which destroyed large parts of his brain. Over 21 years, researchers conducted interviews and observations. He was given neurological tests and MRI scans.", findings: "Brain scans showed significant abnormalities including significant damage to the hippocampus. Clive suffered from both retrograde & anterograde amnesia. Clive could still talk, read, write, play the piano etc. Procedural memory remained intact. Brain damage can affect memory and result in both anterograde & retrograde amnesia.", limitations: "Study can't be generalised as sample was one person (too small & gender biased). Study was unethical as Clive was repeatedly tested over 21 years (could cause distress)." },
      { name: "Braun et al. (2002) — Adverts & Memory", aim: "To see whether an advert could affect childhood autobiographical memories.", sample: "Experiment 1: 107 USA undergrads. Experiment 2: 167 USA undergrads.", method: "Lab experiment.", procedure: "Exp 1: Participants completed a Life Events Inventory (LEI) measuring confidence shaking hands with a character & their memory of Disney. Exp 2: Then watched a Disney advert or control advert. Did LEI again. Investigation 2: Did LEI as above. Watched 1 of 3 adverts (shaking hands with Bugs Bunny, Ariel or Disney ride info ad). Did LEI again.", findings: "Exp 1: Significantly more in Disney condition increased their 'hand shaking' confidence scores from before & after the advert. Exp 2: More significant in Bugs Bunny (78%) & Ariel ad (76%) compared to control (62%). Autobiographical advertising can affect how people remember the past.", limitations: "Sample age & culturally biased (unrepresentative & can't be generalised). Lab experiment lacks ecological validity (not reflect real life)." },
    ],
    applications: "Techniques used for recall in advertising:\n(a) Cues — create context or feeling linked to product so when consumer is in this context/emotional state it will trigger a memory of the product.\n(b) Repetition — build familiarity with brand by repeating them frequently (prevents decay & encourages positive feelings).\n(c) Avoiding overload — if there is too much information, some is displaced out of STM, reducing information.\n(d) Use of autobiographical advertising — connect emotionally by reminding people of a time in their life.\n\nUse of neuropsychology for measuring memory: Wechsler memory scale evaluates the extent of brain damage in patients. Produces results on 5 different aspects: auditory, visual, visual working, immediate and delayed memory.",
  },
  {
    id: "psych_problems", name: "Psychological Problems", paper: 1, color: "#f87171",
    keyDebates: ["Nature (biological) vs. Nurture (learned/society)", "Reductionism (nature theories) vs. Holism", "Free Will (ABC Model) vs. Determinism (Social Rank)"],
    keyConcepts: [
      { term: "Good mental health", def: "High self-esteem, autonomy, self-actualisation, accurate perception of reality." },
      { term: "Mental Health Act (1959)", def: "Aims to reduce stigma & discrimination." },
      { term: "Mental Health Continuum", def: "Healthy → Mild Disruption → Moderate Disruption → Severe Disruption." },
    ],
    sections: [
      { title: "Schizophrenia", content: `Definition: A psychotic disorder where people lose their sense of reality. Covers 1% of the population.\n\nSymptoms: Hallucinations (see/hear things that aren't there), thought disturbances, disorganised speech, catatonic behaviour (doesn't respond), delusions (errors in reality).\n\nBiological Theory — Dopamine Hypothesis: Dopamine system is overactive — high levels of dopamine binding to receptors.\nBrain dysfunction: Less blood flow in frontal lobe (responsible for logic, reasoning, problem solving). Reduced volume of hippocampus (poor cognitive functioning & accessing/processing memories).\n\nLimitations: Ignores nurture — importance of upbringing & life events. Reductionist — focuses too much on brain abnormalities.\n\nSocial Drift Theory: 'Label' of schizophrenia could lead to the condition worsening due to associated stigma → discrimination. Person withdraws from society due to symptoms & fear of discrimination → rejection by society → further deterioration of mental health.\n\nLimitations: Ignores nature — biological factors (brain dysfunction & hormones). Doesn't explain cause & effect — just effect of diagnosis.` },
      { title: "Clinical Depression", content: `Definition: A mood disorder where people have persistent feelings of sadness over a long period of time.\n\nSymptoms: Low mood (sadness), feeling hopeless, low self-esteem, no motivation/lack of interest in things, suicidal thoughts.\n\nSocial Rank Theory (Evolution): We behave in a certain way for survival reasons. When we lose a level of status we can lose confidence in our abilities (depressed state). If we try to regain our rank we may suffer further losses which would be detrimental to our survival. Therefore depression allows us to accept a subordinate role & reduces further conflict.\n\nLimitations: Ignores nurture — e.g. other life factors (e.g. trauma). Reductionist — ignores complex nature of depression.\n\nABC Model: Depression is the result of an Activating event, which leads to irrational Beliefs, which then cause negative Consequences. According to Ellis the 'B' is the most important part of the model. Depression = result of irrational beliefs; individuals who are prone to depression will perceive events in a more negative way.\n\nLimitations: Ignores nature — disregards role of chemical processes in the brain. Free will — puts responsibility solely on patient.` },
    ],
    studies: [
      { name: "Daniels et al. (1991) — Amphetamines & Schizophrenia", aim: "To see whether amphetamines affect PFC and WCST performance.", sample: "10 chronic schizophrenics from the same hospital.", method: "Lab experiment (double-blind) — repeated measures design.", procedure: "Participant received dose of amphetamine or placebo. Completed the Card Sort test (PFC task) and BAR task (control task) on a computer whilst having SPECT scan. Did same 2–4 days later but swapped (double-blind).", findings: "No difference in BAR task (control). Small difference between amphetamine & placebo in the WCST as some areas of the prefrontal cortex were active. Amphetamines shown to increase the ability of the prefrontal cortex to focus in the WCST.", limitations: "Sample too small (can't be generalised) & culturally biased (unrepresentative). Ethical issues: using brain scans for research not medical reasons." },
      { name: "Tandoc et al. (2015) — Facebook & Depression", aim: "To see whether Facebook use predicted depression.", sample: "854 journalism students from a US university (68% female).", method: "Questionnaire (online survey).", procedure: "Completed questionnaire: 1. Facebook usage and surveillance. 2. Envy Scale. 3. Depression symptoms. *Facebook surveillance involves looking at friends' status but not commenting or posting own information.", findings: "Heavy Facebook users = stronger feelings of envy. Size of the network of FB friends not related to envy. FB envy was a predictor of depression. Use of FB not directly lead to depression. But, FB envy can lead to depression.", limitations: "Sample culturally biased (unrepresentative & can't be generalised). Self-report — participants could have lied due to social desirability." },
    ],
    applications: "Use of drugs to treat conditions:\nDepression: anti-depressant drugs increase the number of neurotransmitters in the brain (serotonin or noradrenaline). Excess serotonin helps the neurons communicate better, which helps people feel less depressed.\nSchizophrenia: anti-psychotic drugs act by blocking some of the dopamine receptors. By reducing the level of dopamine, it reduces the effects of the psychotic episode.\n\nPsychotherapy — talking therapies (no drugs): CBT — aims to change how the individual thinks & behaves: to confront the negative irrational thoughts and how they impact on the individual. Using Ellis' A-B-C model:\nD= Disputing (questioning) the persons irrational beliefs.\nE= Effect of changing the interpretation of an event.",
  },
  {
    id: "social", name: "Social Influence", paper: 2, color: "#60a5fa",
    keyDebates: ["Nature (biological) vs. Nurture (learned/society)", "Reductionism (dispositional & situational factors)", "Determinism (situational factors — external → obedience)"],
    keyConcepts: [
      { term: "Conformity", def: "Giving in to the pressure of the group." },
      { term: "Obedience", def: "Following orders from someone we perceive as having more authority than us." },
      { term: "Majority Influence", def: "When the majority of a group tries to influence others in the group to conform to their beliefs." },
      { term: "Collective & Crowd Behaviour", def: "The way in which people act when they are part of a group. Behaviour of crowds can often be spontaneous and unplanned, causing people to act in a way they normally wouldn't do." },
      { term: "Anti-Social Behaviour", def: "Actions that go against society and harms it in some way." },
      { term: "Pro-Social Behaviour", def: "Actions that benefit society and its people." },
    ],
    sections: [
      { title: "Effects of Dispositional Factors on Behaviour", content: `Locus of Control (LOC) in Crowds:\nHigh internal LOC = believe behaviour is caused by their own efforts and decisions.\nHigh external LOC = believe behaviour is due to luck & external factors outside their control. External LOC = more likely to obey & conform.\n\nMorality of Pro-Social & Anti-Social Behaviour:\nHigh levels of morality = higher levels of pro-social behaviour.\nLower levels of morality = anti-social behaviour.\n\nAuthoritarian Personality on Obedience (Adorno, 1950):\nRefers to a person who has high levels of respect for authority, sees world in black & white and dislikes those inferior = more likely to obey.\n\nThe Influence of the Brain on Conformity:\nSelf-esteem & internal LOC is significantly correlated with hippocampal volume. Small hippocampus = low volume of grey matter = low self-esteem.\nLow self-esteem = more likely to conform to a group.\nPFC damage associated with a lack of empathy & anti-social behaviour and inability to make suitable moral decisions.\n\nLimitations:\n- There is more to obedience/conformity than individual traits — other factors may prevent the person from being influenced.\n- These explanations can be considered reductionist — only focus on certain aspects.\n- Locus of control can vary from situation to situation and is not constant.` },
      { title: "Effects of Situational Factors on Behaviour", content: `Group Norm on Conformity:\nMajority influence = when a person is exposed to the beliefs/behaviours of a larger group and they change their attitudes/actions to go along with the group.\nCompliance = conform to the group behaviour to gain their approval, but will privately disagree.\nInternalisation = majority opinion has led you to change your opinion.\n\nDeindividuation & Collective Behaviour:\nIndividuals become part of a faceless group in crowds and take on collective behaviour of the crowd & do not think about consequences.\nIndividualist culture = focused more on personal goals → more anti-social.\nCollectivist culture = focused on the needs of the community → more pro-social.\n\nAuthority Figures:\nMilgram and The Electric Shock study — with the presence of an authority figure people will commit unreasonable acts.\n\nAgency Theory:\nAutonomous state = we feel responsible for our own actions.\nAgentic state = do not feel responsible as acting under orders from authority figure.\n\nLimitations:\n- Ignores individual differences within collectivist cultures.\n- Ignores free will — research shows individuals do have free will and there are many examples of independent behaviour regardless of situational factors.` },
    ],
    studies: [
      { name: "NatCen [Morrell et al.] (2011) — Tottenham Riots", aim: "To answer the question: 'why did young people get involved in the Tottenham riots?'", sample: "36 participants (evenly split between those older or younger than 18).", method: "Interviews.", procedure: "Participants were interviewed 5 weeks after the riots occurred. Researchers gained full informed consent & confidentiality & anonymity was ensured. Participants were interviewed individually or in groups — 2 or 4.", findings: "Four different types of involvement: watchers, rioters, looters, non-involved. Different factors made people more likely (nudge factors) or less likely (tug factors) to get involved. These were divided into dispositional factors (e.g. having poor job prospects) and situational, nudge factor (friends not being involved). People influenced by what they thought was right or wrong & if benefits outweighed risks.", limitations: "Interviews so could have been dishonest because of social desirability (lacks validity). Many participants were accessed in prison (not representative of all who took part)." },
      { name: "Bickman (1974) — Power of Uniform on Obedience", aim: "To see whether a person's appearance affects obedience.", sample: "153 pedestrians on the streets of Brooklyn, New York.", method: "Field experiment — opportunity sample.", procedure: "3 experimenters who dressed in 3 uniforms (a guard, a milkman and a civilian). In each uniform gave one of three orders: (1) pick up litter, (2) stand the other side of a bus stop or (3) give someone £ for a parking meter. Bickman wanted to know how many people obeyed each researcher in each uniform by following the orders or not. N.B. There are experiments 2 & 3 to look at.", findings: "The higher the (perceived) status of the uniform, the higher the obedience levels. Guard = 89%, Milkman = 57%, Civilian = 33%.", limitations: "Sample culturally biased (unrepresentative & can't be generalised). Field experiment so extraneous variables (noise etc.) an issue." },
    ],
    applications: "Changing Attitudes to Mental Health Stigma & Discrimination:\n1. Minority Influence: where a small group of people can change the opinion and belief of larger groups. Techniques include: Behavioural style — consistent, clear messages. Style of thinking — understand the majority audience. Commitment — strongly supporting the minority view. Flexibility — not being too radical. Use of identification — peer 2 peer delivery.\n\n2. Majority Influence could help change the view of the minority discriminatory view by trying to get them to conform to the group norm and internalise the beliefs.\nLanguage — stop using stigmatised vocabulary.\nTreat mental health as a physical problem.",
  },
  {
    id: "development", name: "Development", paper: 2, color: "#34d399",
    keyDebates: ["Nature (innate development) vs. Nurture (learned/society)", "Reductionism (Piaget — all stages universal & invariant)", "Field Experiment (Blackwell) & Natural Experiment (Piaget)"],
    keyConcepts: [
      { term: "Development", def: "How we change & mature across our lifetime." },
      { term: "Intelligence Quotient Tests (IQ)", def: "Measuring how we learn, think & problem-solve." },
      { term: "Stages of Brain Development", def: "Pre-natal (conception to birth): develop neural tube, cerebral cortex, neurons and simple synapses. Childhood (birth to 12): develop more neural connections, more dense synapses in the prefrontal cortex, understand cause & effect as connections strengthen. Adolescence (13–19): grey matter reaches maximum density, maturation of limbic system, pre-frontal cortex and frontal lobes. Adulthood (20+): fully matured pre-frontal cortex. Neurodegenerative diseases can be developed." },
    ],
    sections: [
      { title: "Piaget's Theory of Cognitive Development", content: `The theory suggests that children progress through universal (same for all across the world) and invariant (occur in the same order) stages of cognitive development.\n\nSensori-Motor Stage (0–2 years): Explore the environment using senses, develop motor movement. Towards the end of this stage they develop object permanence (the ability to understand that objects exist even when not visually present).\n\nPre-Operational Stage (2–7 years): Develop language skills & mental representation of objects & events. Is egocentric (only see the world from their own point of view). Also show animism (treat inanimate objects as if they too are alive) & lack of reversibility (unable to work backwards in their thinking).\n\nConcrete-Operational Stage (7–11 years): Develop the ability to decentrate (multiple aspects), develop and conserve (the ability to understand that properties of objects remain the same even when changed in appearance), develop linguistic humour but cannot imagine the world abstractly.\n\nFormal Operational Stage (11+ years): Children are capable of forming and testing hypothesis, understand rules of formal logic and can solve abstract problems.\n\nLimitations:\n- Too reductionist — all children go through the same stages based on maturation (ignores role of environment — parents, teachers, peers etc.)\n- Saying stages are universal & invariant is over simplistic (e.g. in some countries children learn to conserve much earlier due to survival).` },
      { title: "Dweck & Willingham's Learning Theories", content: `Dweck's learning theory states that mindset relates to the way that we think in relation to where our talents come from and whether these are changeable.\n\nGrowth mindset: believe intelligence can be developed through experiences and if we work hard and learn skills then our abilities and therefore our intelligence will improve.\n\nFixed mindset: believe that intelligence is predefined and we are born with certain abilities. Fear failure as it reflects badly on their innate talents.\n\nPraise for Effort: Teachers & parents play an important role in the development of different mindsets through giving praise for the amount of effort made.\n\nWillingham's learning theory: there is no evidence to support the view that individuals have preferences about how to learn — learning styles don't exist.\n\nLearning occurs through meaning, not styles: Students are different in their abilities, interests and prior knowledge, but not in their learning styles. He argues for the importance of meaning for learning. Most of the information that you are required to learn is not visual or auditory, it is meaning based — most learning takes place through understanding the meaning.\n\nLimitations:\n- Dweck's theory can be criticised for focusing too much on the importance of nurture in that achievement is dependent on effort praise (ignores biological learning difficulties & disabilities).\n- Willingham ignores innate factors in development (e.g. hearing or sight loss).` },
    ],
    studies: [
      { name: "Piaget (1952) — Conservation of Number", aim: "To see the stage of development when children are able to conserve.", sample: "Swiss children in the pre-operational & concrete operational stages.", method: "Natural experiment and cross-sectional study.", procedure: "a) Each child was presented with two identical, parallel lines of counter. b) Was asked 'Is there the same number of counters in each row?' c) Then watched as one of the lines was spread out (no more counters were added). d) Was then asked for a 2nd time 'Is there the same number of counters in each row?'", findings: "Children at the beginning of the pre-operational stage (3–4 years) = more in stretched row. Children at the end of the pre-operational stage (5–6 years) = both the same, couldn't say why. Children in the concrete operational stage (7+) = both rows he same & could explain why. Children in the concrete operational stage were able to conserve.", limitations: "Sample too small & culturally biased (Swiss, own children) — cannot be generalised. Design is invalid — asked same question twice so some answered based thinking it was wrong the 1st time." },
      { name: "Blackwell et al. (2007) — Fixed & Growth Mindset", aim: "To see the impact of growth mindset on maths motivation and achievement.", sample: "373 NY students / 99 NY students.", method: "Correlation study / Field experiment.", procedure: "a) 7th grade students were given a maths test & motivation questionnaire. b) Students had either a 8-week growth mindset intervention or control. c) 3 weeks after intervention — given motivation questionnaire again (measuring fixed and growth mindset). Teacher reports & maths grades also used.", findings: "Start of 7th grade: GM = no correlation between mindset and maths. End of 7th grade = fixed/growth mindset a predictor of maths results. Growth mindset (GM) is related to maths ability & teaching GM has a positive impact on maths achievement. GM group had more a growth mindset after the intervention & were reported by teachers to be more motivated & got better maths grades.", limitations: "Sample culturally biased (can't be generalised). Study too reductionist — only focuses on student mindset not influence of others." },
    ],
    applications: "Readiness for Questioning: Ensuring that teachers ask students questions in a way that mirrors their development stage. Why? Piaget claimed that children need to have learning experiences based on their developmental stage in order to confidently tackle & learn from the question.\n\nReadiness for Key Stages: Key stages are aged related stages of development used to organise the education of children. Why? Piaget's stages are linked to the different key stages in education.\n\nGrowth Mindset — Praise for Effort: Teachers set small but doable tasks to make progress & praise for effort rather than attainment/intelligence so they develop a love of learning & seek to improve & try new things.\n\nMeaning not Learning Styles: Teachers support students to think about meaning of information and linking to prior experiences etc.",
  },
  {
    id: "criminal", name: "Criminal Psychology", paper: 1, color: "#fb923c",
    keyDebates: ["Nature (biological) vs. Nurture (learned/society)", "Determinism (trait theory says genetics determine behaviour) vs. Free Will (person chooses their behaviour)"],
    keyConcepts: [
      { term: "Criminal Behaviour", def: "Any act that goes against the law of the land." },
      { term: "Types of Crime", def: "Violent (e.g. assault); drug-related; aquisitive (e.g. theft); sexual (e.g. rape); anti-social (e.g. vandalism)." },
      { term: "Social Construct", def: "Society determines what is considered criminal behaviour, so it can change over time and place." },
      { term: "Deviation from Norms", def: "Crime is when an act or behaviour goes against what is expected in society." },
      { term: "Role of Culture", def: "Collective set of norms that determines a way of life for a group of people. As cultures change, so do their norms." },
      { term: "Measuring Crime", def: "Using self-report methods, which may not be reliable. Not all crimes are necessarily reported." },
    ],
    sections: [
      { title: "Eysenck's Criminal Personality Theory", content: `Criminal personality — traits associated with people who commit crimes. Something that is inherited through genetic inheritance & innate (born with it).\n\nExtraversion: High E score = sociable, lively and sensation seeking. BRAIN: extroverts have a low level of arousal in their cerebral cortex (as stimuli is restricted by RAS) and therefore need more stimulation from their environment, leading to risky & anti-social behaviour.\n\nNeuroticism: High N scores = anxious & react very strongly to aversive stimuli. BRAIN: the ANS becomes over-aroused and affects the limbic system, causing violent & unstable behaviour.\n\nPsychoticism: High P score = aggressive & egocentric. BRAIN: due to an excess of dopaminergic neurons, which causes an overproduction of dopamine and leads to less inhibitions & more aggressive behaviour.\n\nEysenck believed that criminality develops mainly due to genetics but early socialisation and difficulties in conditioning can also play a part.\n\nLimitations:\n- Ignores individual differences — unlikely criminals who commit different crimes all share a similar personality.\n- Too deterministic as it ignores free will.\n- Merely identifies certain characteristics that may link to criminality. It does not inform us why individuals commit criminal acts.` },
      { title: "Social Learning Theory of Criminality", content: `Bandura suggested that all behaviour is learnt through observation & children are particularly influenced by what they see, this includes criminal behaviour.\n\nRole Models & Identification: Children will identify with role models — people we look up to and respect who model behaviour for us. They will decide they want to be like these people.\n\nObservation & Imitation: A child may observe a criminal act — creates a mental representation in their mind because they have seen this particular behaviour they are more likely to copy it.\n\nVicarious Reinforcement: A role model is observed being rewarded for their criminality: financially or through an increased status. More likely to lead to criminality being imitated if positive.\n\nDirect Reinforcement: Observer engages in criminal act and receives reward, likely to continue. N.B. reinforcement can also be negative & can deter.\n\nInternalisation: The behaviour becomes part of us & no longer needs to be reinforced for it to continue — will repeat behaviour despite consequences (e.g. punishment, harm).\n\nLimitations:\n- Ignores the role of nature — e.g. brain dysfunction & genetics.\n- Doesn't explain how criminal behaviour starts in the first place (first wave criminals).\n- If it's correct, should be easier to reduce crime through conditioning.` },
    ],
    studies: [
      { name: "Heaven (1996) — Delinquency & Eysenck's Personality Traits", aim: "To test the correlation between Eysenck's personality traits and delinquency.", sample: "282 teenagers (aged 13–15) from two Catholic schools in Australia.", method: "Questionnaire and longitudinal study.", procedure: "Participants completed questionnaires at Time 1 (around 14 years old) and 2 years later at Time 2 (around 16 years old). 1) Measured psychoticism, extraversion and self-esteem (better measure than neuroticism). 2) Used self-report to measure delinquency (looked at violence, vandalism & theft).", findings: "Males are more likely than females to be involved delinquency at Time 1 & Time 2. There was found to be a positive correlation between psychoticism & delinquency at Time 1 & Time 2. But traits only explain a part of criminal behaviour. Psychoticism is linked to delinquency.", limitations: "Sample culturally biased (unrepresentative & can't be generalised). Limited by social desirability as it was a self-report." },
      { name: "Cooper & Mackie (1986) — Video Games & Aggression", aim: "To see if aggressive video games would lead to increased aggression.", sample: "84 children, aged 9–11 from schools in New Jersey, USA.", method: "Lab experiment, independent measures design.", procedure: "1) Two groups — played or observed either missile command (high agg.), pacman (low agg.), or maze (control). 2) Playroom — observed which toys each child played with (aggressive, active, quiet, skill). 3) Asked questions about reward/punishment using buzzer.", findings: "Children playing aggressive game spent longer playing with aggressive toy. Especially with girls. Boys preferred to play. Type of game had no effect on interpersonal aggression (buzzer questions). Playing or watching an aggressive video game had an impact on aggressive behaviour of girls but not boys.", limitations: "Sample was culturally biased — cannot be generalised. Lacks ecological validity as it was a lab experiment (artificial conditions)." },
    ],
    applications: "Use of Punishment to Reduce Anti-Social Behaviour:\n(a) Prisons: taking away freedom, rights & privileges.\n(b) Fines: money can be an incentive to committing crimes like theft so loss of money should have the opposite effect.\n(c) Community sentences: offenders also pay back to society by giving up their time.\n(d) Deterrent: Many people do not commit crimes in the first place and this is because they want to avoid the negative consequences that they have seen others suffer.\n\nUse of Rehabilitation to Promote Pro-Social Behaviour:\n(a) Restorative justice: The victim of the crime will meet the criminal, the offender has to take responsibility or their crime and face the consequences of their actions when talking with their victim. Offenders are encouraged to apologise, return any property/money and complete community service bringing them back into the community.\n(b) Positive role models: offenders observe the actions of pro-social role models so they can learn how to behave.",
  },
  {
    id: "sleep", name: "Sleep & Dreaming", paper: 1, color: "#818cf8",
    keyDebates: ["Nature (brain processes) vs. Nurture (past experiences)", "Reductionism (focused on narrow view of brain activity)", "Subjective (Freud) vs. Objective (based on brain scans)"],
    keyConcepts: [
      { term: "Functions of Sleep", def: "a) Physical repair to return the body to a normal, healthy state. b) Emotional stability (feeling normal and psychologically healthy). c) Instinctive and necessary for survival (evolved behaviour) — keeps us safe at night." },
      { term: "Sleep Cycle", def: "Stage 1: 10%, Stage 2: 50%, Stage 3: 10%, Stage 4: 10%, Rapid Eye Movement (REM): 20%." },
      { term: "Neuropsychology of Sleep", def: "Endogenous pacemakers: internal biological clocks — manage circadian rhythms (e.g. Suprachiasmatic nucleus). Exogenous Zeitgebers: features of the environment that manage circadian rhythms (e.g. light). Hypothalamus: controls key bodily functions. Melatonin: hormone that induces sleep. Released by the pineal gland." },
    ],
    sections: [
      { title: "Activation Synthesis Theory of Dreaming", content: `The theory suggests that dreams are a result of our mind trying to make sense of brain activation during sleep.\n\nNeuronal Activity Increases in the Pons: During REM sleep, body is paralysed, but activity increases in area of brainstem called the pons — random brain waves are generated.\n\nBrain Waves Travel to Cerebral Cortex: Higher brain areas in the cerebral cortex that would normally interpret sensory information. The information is treated as if it was real sensory information.\n\nSynthesis Occurs — Making Sense of Random Signals: Through interpreting the stimulation synthesis occurs; using stored memories to make sense of the information.\n\nRole of the Limbic System: Because the brain waves activate many different brain areas such as the limbic system (which controls emotions) the resulting dreams are bizarre & emotional. So the theory suggests that dreams have no real meaning.\n\nLimitations:\n- Too reductionist — suggests that dreams are a random result of happens when the mind tries to make sense of brain activity that occurs during sleep.\n- The theory is quite a simplistic view and ignores the view that dreams can be meaningful, it is further reductionist as it does not explain the purpose of dreams, just where they come from.\n- Doesn't explain how people with damage to brainstem can still dream.` },
      { title: "Freudian Theory of Dreaming", content: `The theory suggests that the mind is like an iceberg; it consists of our conscious mind and unconscious mind (we are normally unable to access it).\n\nUnconscious Mind: Contains unacceptable thoughts, feelings and desires that our conscious mind cannot deal with & are considered unacceptable in society. Freud suggested this part of our personality is the ID & is repressed by another part of our personality called the ego.\n\nDreams allow us to access the unconscious mind.\n\nWish Fulfilment: In sleep the ego is weakened & the unconscious mind tries to break through into our consciousness. In order to satisfy these unconscious desires we dream, this is known as wish fulfilment (e.g. being able to eat all the icecream you want).\n\nContent of Dreams: True content of our dreams are hidden through the use of symbols which do not disturb us. So dreams will have two types of content:\nManifest content — what we actually see in our dreams — disguises the latent content through symbolism.\nLatent content — which is the true meaning of our dreams (e.g. being afraid of failing at something).\n\nLimitations:\n- Highly subjective — dream interpretation is dependent on person's opinion.\n- Difficult to test as based on unreliable research where Freud alone conducted interviews & interpreted the dreams of participants.\n- Based on studies that have cultural and historical bias.` },
    ],
    studies: [
      { name: "Williams et al. (1992) — Bizarreness of Dreams & Fantasies", aim: "To see if bizarreness of dreams is different to the bizarreness of daytime fantasies.", sample: "12 biopsychology students from Harvard University, aged 23 to 45.", method: "Natural experiment and self-report journal entries.", procedure: "a) Participants kept a journal for a term recording any dreams they could recall & any day dreams they experienced. b) Researchers selected 60 dreams & 60 day dreams. c) 3 different judges scored for bizarreness (inter-rater reliability).", findings: "Dreams were found to be a lot more bizarre than daytime fantasies (day dreams). There were good levels of inter-rater reliability between the judges (88.7% similar scores). Dreams scored higher than fantasies for: plot discontinuity (greatest difference), plot incongruity, uncertainty, and thought incongruity. The bizarreness of dreams is due to the brain activity during REM sleep.", limitations: "Sample too small & gender biased (10 females) — cannot be generalised. Social desirability — self-report so participants may have lied about/changed their dreams/fantasies." },
      { name: "Freud's (1918) Dream Analysis of 'The Wolfman'", aim: "To see if dream analysis could help treat psychological problems by releasing repressed memories.", sample: "One Russian male in his 20s, suffering from depression.", method: "Longitudinal case study (4 years).", procedure: "The man, known as 'The Wolfman', was interviewed over 4 years. He was thought to suffer from depression after his father & sister had both committed suicide. Freud reported a dream where he woke up and saw 6 or 7 white wolves sitting in a walnut tree outside his bedroom window staring at him.", findings: "1) The wolves represented fear because he had seen a 'primal scene' of his parents having sex. Freud also said the wolves represented fear of his father who he was scared would castrate him. 2) Also thought as the dream was around Christmas, the wolves could represent pleasure, like Christmas presents. Dreams can represent repressed thoughts which hide in the unconscious according to Freud.", limitations: "Sample too small & culturally biased (unrepresentative & can't be generalised). Study too subjective — based only on Freud's interpretations." },
    ],
    applications: "Impact of Neurological Damage on Sleep:\nUnderstanding Insomnia: a) damage to the hypothalamus can occur after surgery, trauma or disease. The SCN is part of the hypothalamus — damage to this can lead to insomnia. b) damage to the pineal gland (regulates melatonin production), can also lead to insomnia.\n\nWays to Improve on Sleep Problems:\n1) Relaxation techniques — Clearing the mind/winding down concerns (to reduce anxiety & worry) AND deep breathing & relieving tension in body through visualisation. Balances the nervous system by calming the sympathetic nervous system & supporting the parasympathetic nervous system to do its job.\n\n2) Sleep Hygiene — make changes to health (diet/exercise/coffee etc.) and physical environment to promote sleep: reduce light/electronic equipment (light-block melatonin production), regulate temperature, comfortable bedding, bedroom decluttered & clocks faces turned away.",
  },
];

const FLASHCARDS = [
  { q: "What are the THREE stores in the Multi-Store Model of Memory?", a: "Sensory store, Short-Term Memory (STM) and Long-Term Memory (LTM).", topic: "Memory" },
  { q: "What is the capacity and duration of STM?", a: "Capacity: 7±2 items. Duration: approximately 30 seconds.", topic: "Memory" },
  { q: "What is confabulation?", a: "Making up details to fill in the blanks in a memory — 'honest lying'.", topic: "Memory" },
  { q: "Name the three personality traits in Eysenck's Criminal Personality Theory.", a: "Extraversion, Neuroticism and Psychoticism.", topic: "Criminal Psychology" },
  { q: "What is the Agentic State according to Agency Theory?", a: "When we do not feel responsible as we are acting under orders from an authority figure.", topic: "Social Influence" },
  { q: "What does 'internalisation' mean in the context of conformity?", a: "The majority opinion has led you to genuinely change your own opinion.", topic: "Social Influence" },
  { q: "What is vicarious reinforcement in Social Learning Theory?", a: "A role model is observed being rewarded for their criminality — making it more likely the behaviour will be imitated.", topic: "Criminal Psychology" },
  { q: "Describe Piaget's Concrete Operational Stage.", a: "Ages 7–11. Children develop the ability to decentrate, conserve, and understand that properties of objects remain the same even when changed in appearance.", topic: "Development" },
  { q: "What is a Growth Mindset according to Dweck?", a: "The belief that intelligence can be developed through experiences, hard work and learning.", topic: "Development" },
  { q: "What is the Dopamine Hypothesis in relation to schizophrenia?", a: "The dopamine system is overactive — high levels of dopamine binding to receptors causes schizophrenia symptoms.", topic: "Psychological Problems" },
  { q: "According to Freud, what is the 'manifest content' of a dream?", a: "What we actually see in our dreams — it disguises the true (latent) content through symbolism.", topic: "Sleep & Dreaming" },
  { q: "What is the function of the Suprachiasmatic Nucleus (SCN)?", a: "An endogenous pacemaker — an internal biological clock that manages circadian rhythms.", topic: "Sleep & Dreaming" },
  { q: "What did Bickman (1974) find about uniform and obedience?", a: "Guard = 89% obeyed, Milkman = 57% obeyed, Civilian = 33% obeyed. The higher the perceived status of the uniform, the higher the obedience.", topic: "Social Influence" },
  { q: "What is the ABC Model of depression?", a: "Activating event → irrational Beliefs → negative Consequences. Ellis argued 'B' is most important.", topic: "Psychological Problems" },
  { q: "What did Clive Wearing's case demonstrate about memory?", a: "Brain damage (to the hippocampus) can cause both anterograde and retrograde amnesia. Procedural memory remained intact.", topic: "Memory" },
  { q: "What are the two stages of dream content according to Freud?", a: "Manifest content (what we see in the dream) and Latent content (the true hidden meaning).", topic: "Sleep & Dreaming" },
  { q: "What is the Social Drift Theory of schizophrenia?", a: "The 'label' of schizophrenia leads to stigma → discrimination → withdrawal from society → rejection → worsening of mental health.", topic: "Psychological Problems" },
  { q: "What did Heaven (1996) find about psychoticism and delinquency?", a: "There was a positive correlation between psychoticism and delinquency at both Time 1 and Time 2.", topic: "Criminal Psychology" },
];

const EXAM_QUESTIONS = [
  { q: "Describe the Multi-Store Model of Memory.", marks: 4, topic: "Memory", command: "Describe", hint: "Include: three stores (sensory, STM, LTM), capacity and duration of STM, the role of rehearsal in transferring to LTM.", paper: 2 },
  { q: "Explain what is meant by 'confabulation'. Use an example in your answer.", marks: 3, topic: "Memory", command: "Explain", hint: "Define confabulation as filling in gaps in memory ('honest lying'), then give an example such as misremembering details of a past event.", paper: 2 },
  { q: "Identify and describe ONE limitation of Braun et al.'s (2002) study into adverts and memory.", marks: 3, topic: "Memory", command: "Identify & Describe", hint: "Choose: sample bias (USA undergrads only) OR lacks ecological validity (lab experiment).", paper: 2 },
  { q: "Describe the symptoms of schizophrenia.", marks: 4, topic: "Psychological Problems", command: "Describe", hint: "Include at least 4: hallucinations, thought disturbances, disorganised speech, catatonic behaviour, delusions.", paper: 1 },
  { q: "Explain the ABC Model of depression.", marks: 4, topic: "Psychological Problems", command: "Explain", hint: "A = Activating event, B = irrational Beliefs (most important), C = negative Consequences. Mention Ellis.", paper: 1 },
  { q: "Evaluate the biological theory of schizophrenia.", marks: 6, topic: "Psychological Problems", command: "Evaluate", hint: "Strengths: supported by drug treatments (anti-psychotics reduce dopamine). Weaknesses: reductionist, ignores nurture (upbringing/life events), correlation not causation.", paper: 1 },
  { q: "Describe Eysenck's Criminal Personality Theory.", marks: 4, topic: "Criminal Psychology", command: "Describe", hint: "Cover all three traits: Extraversion (E), Neuroticism (N), Psychoticism (P) with brain explanations for each.", paper: 1 },
  { q: "Explain how vicarious reinforcement can lead to criminal behaviour.", marks: 3, topic: "Criminal Psychology", command: "Explain", hint: "Define vicarious reinforcement → role model rewarded → observer more likely to imitate the behaviour.", paper: 1 },
  { q: "Describe and evaluate Heaven's (1996) study into delinquency.", marks: 6, topic: "Criminal Psychology", command: "Describe & Evaluate", hint: "AO1: aim, sample, method, findings. AO3: culturally biased, self-report (social desirability), longitudinal strength.", paper: 1 },
  { q: "Explain the difference between the autonomous state and the agentic state.", marks: 3, topic: "Social Influence", command: "Explain", hint: "Autonomous = feel responsible for own actions. Agentic = do not feel responsible, acting under orders from authority.", paper: 2 },
  { q: "Describe the findings and conclusions of Bickman's (1974) study.", marks: 4, topic: "Social Influence", command: "Describe", hint: "State the obedience levels for each uniform: Guard 89%, Milkman 57%, Civilian 33%. Conclude: higher perceived status = higher obedience.", paper: 2 },
  { q: "Evaluate the dispositional explanation for obedience.", marks: 6, topic: "Social Influence", command: "Evaluate", hint: "Strengths: Milgram's variations support. Weaknesses: reductionist, ignores situational factors, LOC varies across situations.", paper: 2 },
  { q: "Describe Piaget's Sensori-Motor and Pre-Operational stages of development.", marks: 4, topic: "Development", command: "Describe", hint: "Sensori-Motor (0–2): senses, motor movement, object permanence. Pre-Operational (2–7): egocentric, animism, lack of reversibility.", paper: 2 },
  { q: "Explain Willingham's theory of learning. Why does he reject learning styles?", marks: 4, topic: "Development", command: "Explain", hint: "Students differ in ability/interests, not learning styles. Learning is meaning-based. Most info is not visual or auditory.", paper: 2 },
  { q: "Identify ONE limitation of Piaget's (1952) study into conservation of number.", marks: 2, topic: "Development", command: "Identify", hint: "Sample bias (Swiss children only — can't generalise) OR design flaw (asked same question twice — demand characteristics).", paper: 2 },
  { q: "Describe the Activation Synthesis Theory of dreaming.", marks: 4, topic: "Sleep & Dreaming", command: "Describe", hint: "REM sleep → pons generates random waves → travel to cerebral cortex → synthesis makes sense of signals using stored memories → limbic system → bizarre/emotional dreams.", paper: 1 },
  { q: "Compare the Activation Synthesis Theory and Freud's Theory of dreaming.", marks: 6, topic: "Sleep & Dreaming", command: "Compare", hint: "Both explain dreams but differ on meaning. Activation Synthesis = no real meaning (random). Freud = dreams meaningful, reveal unconscious desires. Activation Synthesis = objective/scientific. Freud = subjective.", paper: 1 },
  { q: "Identify and explain ONE way to improve sleep problems.", marks: 3, topic: "Sleep & Dreaming", command: "Identify & Explain", hint: "Either: relaxation techniques (calms sympathetic nervous system) OR sleep hygiene (reduce light/electronics to allow melatonin production).", paper: 1 },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const s = {
  wrap: { minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "system-ui,sans-serif" },
  nav: { background: C.nav, borderBottom: `1px solid ${C.border}`, padding: "0 1.25rem", display: "flex", alignItems: "center", gap: "0.25rem", flexWrap: "wrap" },
  logo: { color: C.purple, fontWeight: 700, fontSize: 17, marginRight: "0.75rem", padding: "1rem 0", whiteSpace: "nowrap" },
  nb: (a) => ({ background: a ? "#7C3AED22" : "transparent", color: a ? C.purple : C.muted, border: "none", borderBottom: a ? `2px solid #7C3AED` : "2px solid transparent", padding: "0.9rem 0.6rem", cursor: "pointer", fontSize: 13, fontWeight: a ? 600 : 400, whiteSpace: "nowrap" }),
  main: { maxWidth: 920, margin: "0 auto", padding: "1.5rem 1rem" },
  card: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "1.25rem", marginBottom: "0.875rem" },
  h1: { fontSize: 26, fontWeight: 700, color: C.bright, marginBottom: 6 },
  h2: { fontSize: 18, fontWeight: 700, color: C.bright, marginBottom: 10 },
  muted: { color: C.muted, fontSize: 13 },
  pill: (c) => ({ display: "inline-block", background: c + "22", color: c, borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700, marginBottom: 6 }),
  btn: (c = "#7C3AED") => ({ background: c, color: "#fff", border: "none", borderRadius: 8, padding: "0.55rem 1.1rem", cursor: "pointer", fontWeight: 600, fontSize: 13 }),
  obtn: { background: "transparent", color: C.purple, border: `1px solid #7C3AED`, borderRadius: 8, padding: "0.45rem 0.9rem", cursor: "pointer", fontSize: 13 },
  grid: (min = 180) => ({ display: "grid", gridTemplateColumns: `repeat(auto-fit,minmax(${min}px,1fr))`, gap: 10 }),
  label: { color: C.purple, fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 3 },
  sel: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "0.4rem 0.75rem", fontSize: 13, cursor: "pointer" },
  ta: { width: "100%", minHeight: 110, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "0.7rem", fontSize: 14, resize: "vertical", boxSizing: "border-box" },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Para({ text }) {
  return text.split("\n\n").map((p, i) => (
    <p key={i} style={{ color: "#d1d5db", lineHeight: 1.75, marginBottom: "0.875rem", fontSize: 14 }}>
      {p.split(/(\*\*[^*]+\*\*)/).map((c, j) =>
        c.startsWith("**") ? <strong key={j} style={{ color: C.bright }}>{c.replace(/\*\*/g, "")}</strong> : c
      )}
    </p>
  ));
}

function PaperTable({ paper }) {
  const rows = PAST_PAPERS[paper];
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.border}` }}>
            <th style={{ textAlign: "left", padding: "8px 12px", color: C.muted }}>Year</th>
            <th style={{ textAlign: "center", padding: "8px 12px", color: C.muted }}>Question Paper</th>
            <th style={{ textAlign: "center", padding: "8px 12px", color: C.muted }}>Mark Scheme</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.border}22` }}>
              <td style={{ padding: "10px 12px", color: C.bright, fontWeight: 500 }}>{r.year}</td>
              <td style={{ padding: "10px 12px", textAlign: "center" }}>
                <a href={r.qp} target="_blank" rel="noreferrer" style={{ color: C.purple, textDecoration: "none", fontWeight: 600 }}>QP ↗</a>
              </td>
              <td style={{ padding: "10px 12px", textAlign: "center" }}>
                <a href={r.ms} target="_blank" rel="noreferrer" style={{ color: C.green, textDecoration: "none", fontWeight: 600 }}>MS ↗</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────
function Home({ go }) {
  return (
    <div>
      {/* Countdown banner */}
      <div style={{ background: "#1a1228", border: `1px solid ${C.purpleBorder}`, borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
        <div style={{ color: C.purple, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>UPCOMING EXAM DATES — OCR GCSE PSYCHOLOGY</div>
        <div style={s.grid(200)}>
          {EXAM_DATES.map(e => (
            <div key={e.paper} style={{ background: "#0f0f13", borderRadius: 10, padding: "0.75rem 1rem", border: `1px solid ${C.border}` }}>
              <div style={{ color: C.purple, fontWeight: 700, fontSize: 15 }}>{e.paper}</div>
              <div style={{ color: C.bright, fontSize: 13, marginTop: 2 }}>{e.date}</div>
              <div style={{ color: e.days <= 14 ? C.red : C.amber, fontWeight: 700, fontSize: 20, marginTop: 6 }}>{e.days} days</div>
            </div>
          ))}
        </div>
      </div>

      <h1 style={s.h1}>OCR GCSE Psychology Revision Hub</h1>
      <p style={{ color: C.muted, fontSize: 14, marginBottom: "1.5rem" }}>All topics from your knowledge organisers — Criminal Psychology, Development, Psychological Problems, Sleep & Dreaming, Memory, Social Influence.</p>

      <div style={s.grid(160)}>
        {[
          { icon: "📚", label: "Topics", sub: "6 topic areas with full notes", page: "Topics" },
          { icon: "🔬", label: "Key Studies", sub: "All studies with A·M·R·E", page: "Studies" },
          { icon: "🃏", label: "Flashcards", sub: "18 cards to test yourself", page: "Flashcards" },
          { icon: "📝", label: "Exam Questions", sub: "Exam-style Qs with mark schemes", page: "Exam" },
          { icon: "📄", label: "Past Papers", sub: "Every year from PMT", page: "Papers" },
        ].map(item => (
          <div key={item.label} style={{ ...s.card, cursor: "pointer" }} onClick={() => go(item.page)}>
            <div style={{ fontSize: 26, marginBottom: 6 }}>{item.icon}</div>
            <div style={{ fontWeight: 600, fontSize: 15, color: C.bright }}>{item.label}</div>
            <div style={s.muted}>{item.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ ...s.card, marginTop: "1rem", background: "#1a1228", border: `1px solid ${C.purpleBorder}` }}>
        <div style={{ color: C.purple, fontWeight: 600, marginBottom: 8, fontSize: 13 }}>TOPICS COVERED</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TOPICS.map(t => (
            <span key={t.id} style={{ background: t.color + "22", color: t.color, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{t.name} · Paper {t.paper}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Topics() {
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState(0);
  if (!sel) return (
    <div>
      <h1 style={s.h1}>Topics</h1>
      <p style={s.muted}>Select a topic to view full notes, key concepts and applications.</p>
      <div style={{ ...s.grid(200), marginTop: "1rem" }}>
        {TOPICS.map(t => (
          <div key={t.id} style={{ ...s.card, cursor: "pointer", borderLeft: `4px solid ${t.color}` }} onClick={() => { setSel(t); setTab(0); }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: C.bright, marginBottom: 4 }}>{t.name}</div>
            <div style={{ color: t.color, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>PAPER {t.paper}</div>
            {t.sections.map(sec => <div key={sec.title} style={s.muted}>{sec.title}</div>)}
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = ["Notes", "Key Concepts", "Applications"];
  return (
    <div>
      <button style={s.obtn} onClick={() => setSel(null)}>← Back to Topics</button>
      <div style={{ marginTop: "1.25rem", marginBottom: "1rem" }}>
        <span style={s.pill(sel.color)}>{sel.name} · Paper {sel.paper}</span>
        <h1 style={s.h1}>{sel.name}</h1>
        <div style={{ color: C.muted, fontSize: 13 }}>Key debates: {sel.keyDebates.join(" | ")}</div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: "1rem" }}>
        {tabs.map((t, i) => <button key={t} style={{ ...s.nb(tab === i), padding: "0.5rem 1rem", borderRadius: 8, border: `1px solid ${tab === i ? sel.color : C.border}`, color: tab === i ? sel.color : C.muted, background: tab === i ? sel.color + "22" : "transparent", fontSize: 13, cursor: "pointer", fontWeight: tab === i ? 600 : 400 }} onClick={() => setTab(i)}>{t}</button>)}
      </div>
      {tab === 0 && sel.sections.map(sec => (
        <div key={sec.title} style={s.card}>
          <h2 style={s.h2}>{sec.title}</h2>
          <Para text={sec.content} />
        </div>
      ))}
      {tab === 1 && (
        <div style={s.grid(220)}>
          {sel.keyConcepts.map(k => (
            <div key={k.term} style={{ ...s.card, borderTop: `3px solid ${sel.color}` }}>
              <div style={{ color: sel.color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{k.term}</div>
              <div style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.65 }}>{k.def}</div>
            </div>
          ))}
        </div>
      )}
      {tab === 2 && <div style={s.card}><Para text={sel.applications} /></div>}
    </div>
  );
}

function Studies() {
  const [filter, setFilter] = useState("All");
  const all = TOPICS.flatMap(t => t.studies.map(st => ({ ...st, topic: t.name, color: t.color })));
  const shown = filter === "All" ? all : all.filter(s => s.topic === filter);
  return (
    <div>
      <h1 style={s.h1}>Key Studies</h1>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
        {["All", ...TOPICS.map(t => t.name)].map(f => (
          <button key={f} style={{ ...s.obtn, background: filter === f ? "#7C3AED22" : "transparent", color: filter === f ? C.purple : C.muted, fontSize: 12 }} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      {shown.map((st, i) => (
        <div key={i} style={{ ...s.card, borderLeft: `4px solid ${st.color}` }}>
          <span style={s.pill(st.color)}>{st.topic}</span>
          <h2 style={s.h2}>{st.name}</h2>
          <div style={s.grid(200)}>
            {[["AIM", st.aim], ["SAMPLE", st.sample], ["METHOD", st.method], ["PROCEDURE", st.procedure], ["FINDINGS & CONCLUSION", st.findings], ["LIMITATIONS", st.limitations]].map(([lbl, val]) => (
              <div key={lbl} style={{ gridColumn: ["PROCEDURE", "FINDINGS & CONCLUSION", "LIMITATIONS"].includes(lbl) ? "span 2" : "span 1" }}>
                <div style={s.label}>{lbl}</div>
                <div style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.65 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Flashcards() {
  const [filter, setFilter] = useState("All");
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const cards = filter === "All" ? FLASHCARDS : FLASHCARDS.filter(c => c.topic === filter);
  const cur = cards[idx] || cards[0];
  const topics = ["All", ...new Set(FLASHCARDS.map(c => c.topic))];
  return (
    <div>
      <h1 style={s.h1}>Flashcards</h1>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
        <select style={s.sel} value={filter} onChange={e => { setFilter(e.target.value); setIdx(0); setFlipped(false); }}>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <span style={s.muted}>Card {idx + 1} of {cards.length}</span>
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "2rem 1.5rem", minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", cursor: "pointer" }} onClick={() => setFlipped(f => !f)}>
        {!flipped ? (
          <>
            <div style={{ color: C.dim, fontSize: 12, marginBottom: 10 }}>Tap to reveal answer</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.bright, lineHeight: 1.6, maxWidth: 560 }}>{cur.q}</div>
            <div style={{ marginTop: 14, background: C.border, borderRadius: 6, padding: "2px 10px", fontSize: 11, color: C.muted }}>{cur.topic}</div>
          </>
        ) : (
          <>
            <div style={{ color: C.purple, fontSize: 11, fontWeight: 700, marginBottom: 10 }}>ANSWER</div>
            <div style={{ fontSize: 15, color: "#d1d5db", lineHeight: 1.7, maxWidth: 560 }}>{cur.a}</div>
          </>
        )}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        <button style={s.obtn} disabled={idx === 0} onClick={() => { setIdx(i => i - 1); setFlipped(false); }}>← Prev</button>
        <button style={s.btn()} onClick={() => { setFlipped(false); setIdx(i => (i + 1) % cards.length); }}>Next →</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "1rem", justifyContent: "center" }}>
        {cards.map((_, i) => (
          <button key={i} style={{ width: 28, height: 28, borderRadius: 6, border: "none", background: i === idx ? "#7C3AED" : C.border, color: i === idx ? "#fff" : C.muted, cursor: "pointer", fontSize: 12, fontWeight: 600 }} onClick={() => { setIdx(i); setFlipped(false); }}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}

function Exam() {
  const [filter, setFilter] = useState("All");
  const [paperF, setPaperF] = useState("All");
  const [idx, setIdx] = useState(0);
  const [ans, setAns] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showMS, setShowMS] = useState(false);

  const qs = EXAM_QUESTIONS.filter(q =>
    (filter === "All" || q.topic === filter) &&
    (paperF === "All" || q.paper === Number(paperF))
  );
  const cur = qs[idx % Math.max(qs.length, 1)];
  const topics = ["All", ...new Set(EXAM_QUESTIONS.map(q => q.topic))];

  const reset = () => { setAns(""); setShowHint(false); setShowMS(false); };

  if (!cur) return <div style={s.main}><h1 style={s.h1}>Exam Questions</h1><p style={s.muted}>No questions match the current filters.</p></div>;

  return (
    <div>
      <h1 style={s.h1}>Exam Questions</h1>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1rem", alignItems: "center" }}>
        <select style={s.sel} value={filter} onChange={e => { setFilter(e.target.value); setIdx(0); reset(); }}>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select style={s.sel} value={paperF} onChange={e => { setPaperF(e.target.value); setIdx(0); reset(); }}>
          <option value="All">All Papers</option>
          <option value="1">Paper 1</option>
          <option value="2">Paper 2</option>
        </select>
        <span style={s.muted}>{qs.length} questions</span>
      </div>

      <div style={s.card}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={s.pill("#a78bfa")}>{cur.topic}</span>
            <span style={{ background: C.border, color: C.muted, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>Paper {cur.paper}</span>
            <span style={{ background: "#7C3AED22", color: C.purple, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{cur.command}</span>
          </div>
          <span style={{ background: "#7C3AED44", color: C.purple, borderRadius: 8, padding: "3px 12px", fontSize: 14, fontWeight: 700 }}>{cur.marks} marks</span>
        </div>
        <p style={{ color: C.bright, fontSize: 16, fontWeight: 500, marginBottom: "1rem", lineHeight: 1.5 }}>{cur.q}</p>
        <textarea style={s.ta} placeholder="Write your answer here..." value={ans} onChange={e => setAns(e.target.value)} />
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          <button style={s.obtn} onClick={() => setShowHint(h => !h)}>{showHint ? "Hide hint" : "Show hint"}</button>
          <button style={s.obtn} onClick={() => setShowMS(m => !m)}>{showMS ? "Hide mark scheme" : "Show mark scheme"}</button>
          <button style={{ ...s.btn(), marginLeft: "auto" }} onClick={() => { setIdx(i => (i + 1) % qs.length); reset(); }}>Next →</button>
        </div>
        {showHint && <div style={{ marginTop: 10, background: "#1a1228", border: `1px solid ${C.purpleBorder}`, borderRadius: 8, padding: "0.75rem", color: C.purple, fontSize: 13, lineHeight: 1.6 }}><strong>Hint:</strong> {cur.hint}</div>}
        {showMS && <div style={{ marginTop: 10, background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: 8, padding: "0.75rem", color: C.green, fontSize: 13, lineHeight: 1.6 }}><strong>Mark scheme guidance ({cur.marks} marks):</strong> {cur.hint} — Use clear, separate points. {cur.marks >= 6 ? "For extended questions: AO1 (describe/outline) + AO2/AO3 (apply/evaluate). Write in paragraphs." : cur.marks >= 4 ? "Make sure each point is distinct. Avoid repetition." : "Keep concise — each mark = one distinct point."}</div>}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
        {qs.map((q, i) => (
          <button key={i} style={{ minWidth: 28, height: 28, borderRadius: 6, border: "none", background: i === idx % qs.length ? "#7C3AED" : C.border, color: i === idx % qs.length ? "#fff" : C.muted, cursor: "pointer", fontSize: 12, fontWeight: 600, padding: "0 6px" }} onClick={() => { setIdx(i); reset(); }}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}

function Papers() {
  const [tab, setTab] = useState("Paper 1");
  return (
    <div>
      <h1 style={s.h1}>Past Papers</h1>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: "1rem" }}>All past papers sourced from PMT (physicsandmathstutor.com). Click QP for the question paper and MS for the mark scheme.</p>

      <div style={{ ...s.card, background: "#1a1228", border: `1px solid ${C.purpleBorder}`, marginBottom: "1rem" }}>
        <div style={{ color: C.purple, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>EXAM DATES 2026</div>
        {EXAM_DATES.map(e => (
          <div key={e.paper} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.border}22`, fontSize: 14 }}>
            <span style={{ color: C.bright, fontWeight: 600 }}>{e.paper}</span>
            <span style={{ color: C.muted }}>{e.date}</span>
            <span style={{ color: e.days <= 14 ? C.red : C.amber, fontWeight: 700 }}>{e.days}d</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: "1rem" }}>
        {["Paper 1", "Paper 2"].map(p => (
          <button key={p} style={{ ...s.obtn, background: tab === p ? "#7C3AED22" : "transparent", color: tab === p ? C.purple : C.muted, fontWeight: tab === p ? 700 : 400 }} onClick={() => setTab(p)}>{p}</button>
        ))}
      </div>

      <div style={s.card}>
        <div style={{ color: C.purple, fontWeight: 600, fontSize: 13, marginBottom: 12 }}>
          {tab === "Paper 1" ? "Paper 1: Psychological Problems · Criminal Psychology · Sleep & Dreaming" : "Paper 2: Memory · Development · Social Influence"}
        </div>
        <PaperTable paper={tab} />
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const pages = ["Home", "Topics", "Studies", "Flashcards", "Exam", "Papers"];
  const labels = { Home: "Home", Topics: "Topics", Studies: "Key Studies", Flashcards: "Flashcards", Exam: "Exam Qs", Papers: "Past Papers" };

  return (
    <div style={s.wrap}>
      <nav style={s.nav}>
        <span style={s.logo}>🧠 PsychRevise OCR</span>
        {pages.map(p => <button key={p} style={s.nb(page === p)} onClick={() => setPage(p)}>{labels[p]}</button>)}
      </nav>
      <main style={s.main}>
        {page === "Home" && <Home go={setPage} />}
        {page === "Topics" && <Topics />}
        {page === "Studies" && <Studies />}
        {page === "Flashcards" && <Flashcards />}
        {page === "Exam" && <Exam />}
        {page === "Papers" && <Papers />}
      </main>
    </div>
  );
}

export default App;
