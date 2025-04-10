// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Delete all existing events
    await prisma.event.deleteMany({});

    // Create events based on existing data
    const events = [
        {
            date: new Date("2025-07-15"),
            title: "Soirée Folk Acoustique",
            location: "Château Laurier, Ottawa",
            description: "Une soirée intime avec Cat Stevens (Yusuf) qui interprètera ses plus grands succès folk et acoustiques ainsi que de nouveaux arrangements dans le cadre historique du Château Laurier.",
            imageUrl: "/images/event/1.jpg",
        },
        {
            date: new Date("2025-08-20"),
            title: "Légendes Américaines",
            location: "Musée canadien de l'histoire, Ottawa",
            description: "Une soirée exceptionnelle en hommage à Johnny Cash, reprenant ses classiques dans leur essence la plus pure.",
            imageUrl: "/images/event/2.jpg",
        },
        {
            date: new Date("2025-09-05"),
            title: "Festival Rock en Bois",
            location: "Parc Major's Hill, Ottawa",
            description: "Notre festival annuel phare réunit nos trois artistes vedettes - Cat Stevens (Yusuf), Johnny Cash Tribute et Dirtwire - pour une journée complète de musique acoustique et folk.",
            imageUrl: "/images/event/3.jpg",
        },
        {
            date: new Date("2025-12-15"),
            title: "Fusion Mondiale",
            location: "Centre National des Arts, Ottawa",
            description: "Dirtwire présente un spectacle unique au Centre National des Arts, fusionnant instruments traditionnels du monde entier avec des innovations sonores contemporaines.",
            imageUrl: "/images/event/4.jpg",
        }
    ];

    for (const event of events) {
        await prisma.event.create({
            data: event,
        });
    }

    console.log('Seed data created successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });