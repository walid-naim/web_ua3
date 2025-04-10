
import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

// GET event by ID
export async function GET(request, { params }) {
    try {
        const id = Number(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const event = await prisma.event.findUnique({
            where: { id },
        });

        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
    }
}

// PUT (update) event by ID
export async function PUT(request, { params }) {
    try {
        const id = Number(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const data = await request.json();

        // Check if event exists
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });

        if (!existingEvent) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Update event
        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                ...(data.date && { date: new Date(data.date) }),
                ...(data.title && { title: data.title }),
                ...(data.location && { location: data.location }),
                ...(data.description && { description: data.description }),
                ...(data.imageUrl && { imageUrl: data.imageUrl }),
            },
        });

        return NextResponse.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}

// DELETE event by ID
export async function DELETE(request, { params }) {
    try {
        const id = Number(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        // Check if event exists
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });

        if (!existingEvent) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Delete event
        await prisma.event.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
}