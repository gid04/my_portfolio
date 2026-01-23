import { mutation, internalMutation } from "./_generated/server";

// Hardcoded data from frontend
const DUMMY_PROJECTS = [
    {
        title: 'Fintech Dashboard',
        description: 'A comprehensive dashboard for managing financial assets.',
        fullDescription: 'This fintech dashboard allows users to track their assets, view real-time market data, and manage their portfolio with ease. The design focuses on clarity and data legibility, using a strict monochrome palette to reduce cognitive load.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        tags: ['UI/UX', 'Dashboard', 'Fintech'],
        category: 'UI/UX Design',
        tools: ['Figma', 'React'],
        link: '#'
    },
    {
        title: 'E-commerce App',
        description: 'Mobile-first shopping experience with seamless checkout.',
        fullDescription: 'Designed for a seamless shopping experience on mobile devices. Key features include one-click checkout, personalized recommendations, and a clean product discovery interface.',
        imageUrl: 'https://images.unsplash.com/photo-1523206485973-279961db41e3?q=80&w=2670&auto=format&fit=crop',
        tags: ['Mobile App', 'E-commerce', 'React Native'],
        category: 'UI/UX Design',
        tools: ['Figma', 'React Native'],
        link: '#'
    },
    {
        title: 'Travel Agency',
        description: 'Immersive travel booking platform with virtual tours.',
        fullDescription: 'An immersive web platform that lets users explore destinations through virtual tours before booking. The design uses large typography and high-quality imagery to inspire travel.',
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
        tags: ['Web Design', 'Travel', 'Minimalism'],
        category: 'Web Design',
        tools: ['Figma', 'Webflow'],
        link: '#'
    }
];

const SERVICES = [
    {
        title: "UI/UX Design",
        imageUrl: "/images/ui-ux-cover.jpg", // Note: this might be broken if not a real URL, but keeping as placeholder
        overview: "Crafting intuitive and aesthetically pleasing digital experiences.",
        tools: ["Figma", "Sketch", "Protopie"],
    },
    {
        title: "Brand Strategy",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
        overview: "Defining the unique voice and visual identity of your business.",
        tools: ["Illustrator", "Photoshop", "Keynote"],
    },
    {
        title: "Web Design",
        imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop",
        overview: "Building responsive, high-performance websites that convert.",
        tools: ["Webflow", "React", "Framer"],
    },
    {
        title: "Prototyping",
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
        overview: "Bringing ideas to life with high-fidelity interactive mockups.",
        tools: ["Framer", "Protopie", "After Effects"],
    }
];

const EXPERIENCES = [
    {
        company: "Freelance",
        role: "Senior UI/UX Designer",
        period: "2023 - Present",
        description: "Leading design projects for various clients, focusing on branding and web applications."
    },
    {
        company: "Tech Solutions Inc.",
        role: "Product Designer",
        period: "2021 - 2023",
        description: "Collaborated with engineering sizing to launch a fintech dashboard used by 50k+ users."
    },
    {
        company: "Creative Studio",
        role: "Junior Web Designer",
        period: "2020 - 2021",
        description: "Assisted in creating visual assets and landing pages for marketing campaigns."
    }
];

export const seed = mutation({
    args: {},
    handler: async (ctx) => {
        // 1. Seed Projects
        for (const p of DUMMY_PROJECTS) {
            await ctx.db.insert("projects", p);
        }

        // 2. Seed Services
        for (const s of SERVICES) {
            await ctx.db.insert("services", s);
        }

        // 3. Seed Experiences
        for (const e of EXPERIENCES) {
            await ctx.db.insert("experiences", e);
        }

        return "Database Seeded Successfully!";
    },
});
