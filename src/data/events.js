//imports...
import eventImg1 from "../assets/images/event1.png"
import eventImg2 from "../assets/images/event2.png"
import eventImg3 from "../assets/images/event3.png"
import eventImg4 from "../assets/images/event4.png"
import eventImg5 from "../assets/images/event5.png"
import eventImg6 from "../assets/images/event6.png"
import eventImg7 from "../assets/images/event7.png"
import eventImg8 from "../assets/images/event8.png"
import eventImg9 from "../assets/images/event9.png"
import eventImg10 from "../assets/images/event10.png"

const events = [
    {
        id: "1",
        title: "ROBOWAR COMPETITION",
        venue: "GCE KANNUR",
        type: "competition",
        description: `Step into the ultimate battleground of engineering and innovation – ROBOWAR at Aurora ’25. This event is where creativity meets combat as teams design and unleash their robots to battle head-to-head in an electrifying arena powered by ROBOCEK.

Participants must rely on their technical skills, strategy, and quick thinking to survive each round. Teams are expected to build bots within the specified guidelines, ensuring safety, fair play, and adherence to the given budget and design constraints. Every move counts – from weapon design to defense tactics – as robots face off in a test of durability, speed, and control.

To raise the stakes even higher, ROBOWAR offers a prize pool worth ₹18k, rewarding the most innovative and resilient teams who prove their dominance in the arena.
This isn’t just a contest – it’s an adrenaline-charged battle of machines, where only the strongest and smartest bots claim victory.`,
        imageUrl: eventImg1,
        price: "₹600 (per team)",
        priceForIeeeMembers: "₹600 (per team)",
        date: "October 18, 2025",
        time: "10:00 AM - 12:00 PM",
    },
    {
        id: "2",
        title: "LINE FOLLOWER COMPETITION",
        venue: "GCE KANNUR",
        type: "competition",
        description: `The track is ready, the challenge is set, and the spotlight is on precision and control. The Line Follower Competition at Aurora ’25, powered by ROBOCEK, is the ultimate test of engineering mastery where robots must sense, adapt, and stay on course as they race against time.

More than just speed, this competition demands intelligence, accuracy, and innovative design. Every twist and turn pushes the limits of sensor integration, programming skills, and mechanical stability. It’s a true showcase of how technology and teamwork combine to create bots that think on their feet.

With a prize pool worth ₹13,000, the competition rewards not just the fastest bots, but the smartest builders who can balance control with performance.The Line Follower Competition is where creativity meets competition, and where every second counts toward glory.`,
        imageUrl: eventImg2,
        price: "₹400 (per team)",
        priceForIeeeMembers: "₹400 (per team)",
        date: "October 19, 2025",
        time: "10:00 AM - 12:00 PM",
    },
    {
        id: "3",
        title: "RETROFIT HACKATHON",
        venue: "GCE KANNUR",
        type: "competition",
        description: `Step into RETROFIT at AURORA ’25, where old systems get a new lease on life! This is your chance to reverse, rebuild, and reinvent broken or outdated electronics, mechanical devices, or hybrid systems. The challenge is not just about repair – it’s about creativity, technical skill, and sustainable thinking. Transform ordinary systems into innovative, functional, and eco-friendly solutions while showcasing your problem-solving abilities.

Participants will work hands-on with real components, compete for prizes worth ₹13,000, and demonstrate their creations to judges. Emphasis will be on innovation, functionality, and sustainable approaches, making this a true test of ingenuity and technical expertise. Teams should consist of 2–4 members. Projects must involve revamping, upgrading, or repairing existing systems, with sustainable and energy-efficient methods encouraged. Each team must demonstrate their working system and submit a brief report or presentation explaining the concept and improvements.`,
        imageUrl: eventImg3,
        price: "₹400 (per team)",
        priceForIeeeMembers: "₹400 (per team)",
        date: "October 18 - 19, 2025",
        time: "18th 01:00 PM - 19th 01:00 PM",
    },
    {
        id: "4",
        title: "ROBO RACE COMPETITION",
        venue: "GCE KANNUR",
        type: "competition",
        description: `The Robo Race Competition at Aurora ’25, powered by ROBOCEK, is a high-energy contest where innovation meets speed. Teams build and race their own robots through a specially designed track filled with twists, turns, and challenges that test control, stability, and precision. Victory here depends not just on how fast a bot can move, but on how intelligently it adapts to obstacles and maintains balance under pressure.

Participants must design fully autonomous bots capable of sensing and navigating the track without assistance. All teams must follow safety protocols, maintain proper documentation, and stay within the specified budget and component limits.

With a prize pool worth ₹18k, Robo Race rewards not only the fastest bots but also the most efficient and well-engineered designs. This is where creativity, precision, and teamwork come together to decide who truly deserves the title of champion.`,
        imageUrl: eventImg4,
        price: "₹600 (per team)",
        priceForIeeeMembers: "₹400 (per team)",
        date: "October 19, 2025",
        time: "09:00 AM - 12:00 PM",
    },
    {
        id: "5",
        title: "3D PRINTING WORKSHOP",
        venue: "Civil CAD Lab",
        type: "workshop",
        description: `Unleash your creativity with the 3D Printing Workshop.Dive into the world of additive manufacturing and learn how digital designs come to life. This hands-on session covers everything from 3D modeling and printer operation to real-world applications across industries.

Perfect for innovators, designers, and tech enthusiasts, this workshop is your gateway to exploring creativity, technology, and practical innovation through 3D printing.`,
        imageUrl: eventImg5,
        price: "Included in the Fest Ticket",
        priceForIeeeMembers: "Included in the Fest Ticket",
        date: "October 19, 2025",
        time: "09:00 AM - 12:00 PM",
    },
    {
        id: "6",
        title: "UI/UX WORKSHOP",
        venue: "HiTech Room",
        type: "workshop",
        description: `Design meets innovation at the UI/UX Workshop of Aurora’25!
Discover the art of creating engaging, user-friendly digital experiences through this hands-on workshop powered by Algon Developer Community (ADC). Learn the principles of user interface design, user experience strategy, and prototyping, using modern tools and techniques.

Whether you're a beginner or a design enthusiast, this workshop offers the perfect platform to explore creativity, enhance design thinking, and craft impactful digital solutions.`,
        imageUrl: eventImg6,
        price: "Included in the Fest Ticket",
        priceForIeeeMembers: "Included in the Fest Ticket",
        date: "October 19, 2025",
        time: "09:00 AM - 12:00 PM",
    },
    {
        id: "7",
        title: "CYBER SECURITY WORKSHOP",
        venue: "CAD Mech Lab",
        type: "workshop",
        description: `Step into the realm of ethical hacking and cyber defense! Gain hands-on skills in securing networks, safeguarding data, and tackling real-world cyber threats.`,
        imageUrl: eventImg7,
        price: "Included in the Fest Ticket",
        priceForIeeeMembers: "Included in the Fest Ticket",
        date: "October 18, 2025",
        time: "11:00 AM - 4:00 PM",
    },
    {
        id: "8",
        title: "GAME DEVELOPMENT WORKSHOP",
        venue: "Mech CAD Lab",
        type: "workshop",
        description: `Be part of creativity and technology with our GAME DEVELOPMENT Workshop, part of Aurora’25 .This hands-on workshop is designed to introduce participants to the exciting realm of game design and development. Learn how games are conceptualized, built, and brought to life using modern tools and engines. From designing characters and environments to coding gameplay mechanics, you’ll gain insights into every stage of the process.

Whether you’re a beginner curious about game creation or an enthusiast eager to refine your skills, this workshop offers the perfect platform to explore, learn, and innovate.`,
        imageUrl: eventImg8,
        price: "Included in the Fest Ticket",
        priceForIeeeMembers: "Included in the Fest Ticket",
        date: "October 19, 2025",
        time: "09:00 AM - 12:00 PM",
    },
    {
        id: "9",
        title: "EV WORKSHOP",
        venue: "HiTech Room",
        type: "workshop",
        description: `Step into the future of mobility with our Electric Vehicle (EV) Workshop, where innovation meets sustainability. This hands-on session is designed to introduce participants to the fundamentals of electric vehicles - from their design and working principles to real-world applications.

Gain practical knowledge about EV components, battery management systems, motor control, and charging technologies, guided by industry experts. Whether you’re an engineering student, tech enthusiast, or future innovator, this workshop offers the perfect platform to explore how EVs are shaping the next generation of transportation.
`,
        imageUrl: eventImg9,
        price: "Included in the Fest Ticket",
        priceForIeeeMembers: "Included in the Fest Ticket",
        date: "October 18, 2025",
        time: "01:00 PM - 4:00 PM",
    },
    {
        id: "10",
        title: "ROS WORKSHOP",
        venue: "CCF",
        type: "workshop",
        description: `Unlock the world of intelligent robotics with our ROS (Robot Operating System) Workshop, designed to introduce participants to one of the most powerful platforms in modern robotics.

This interactive session covers the basics of ROS architecture, communication between nodes, sensor integration, and robot simulation using real-time tools. Guided by experts, you’ll gain hands-on experience in programming and controlling robots, helping you understand how ROS bridges hardware and software seamlessly.

Whether you’re a beginner exploring robotics or an enthusiast aiming to enhance your technical skills, this workshop will empower you to build, program, and innovate with confidence in the field of robotics.`,
        imageUrl: eventImg10,
        price: "Included in the Fest Ticket",
        priceForIeeeMembers: "Included in the Fest Ticket",
        date: "October 18, 2025",
        time: "11:00 AM - 04:00 PM",
    }
];


export default events;