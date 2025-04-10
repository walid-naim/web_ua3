
import prisma from '../../lib/prisma';
import { NextResponse } from 'next/server';

// GET all events
export async function GET() {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                date: 'asc',
            },
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

// POST new event
export async function POST(request) {
    try {
        const data = await request.json();

        // Validate required fields
        const requiredFields = ['date', 'title', 'location', 'description', 'imageUrl'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Create event
        const event = await prisma.event.create({
            data: {
                date: new Date(data.date),
                title: data.title,
                location: data.location,
                description: data.description,
                imageUrl: data.imageUrl,
            },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}