import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { ReportStatus, ReportType } from '@prisma/client';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as ReportStatus | null;
    const type = searchParams.get('type') as ReportType | null;

    // Build the where clause based on filters
    const where = {
      ...(status && { status }),
      ...(type && { type }),
    };

    // Add timeout and retry logic
    const reports = await Promise.race([
      prisma.report.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          reportId: true,
          type: true,
          title: true,
          description: true,
          location: true,
          latitude: true,
          longitude: true,
          image: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database timeout')), 15000)
      ),
    ]);

    return NextResponse.json(reports);
  } catch (error) {
    // Casting error to a known structure
    const prismaError = error as { code?: string; message?: string };
    console.error('Failed to fetch reports:', prismaError);

    // More specific error messages
    if (prismaError.code === 'P1001') {
      return NextResponse.json(
        { error: 'Cannot connect to database. Please try again later.' },
        { status: 503 }
      );
    }

    if (prismaError.code === 'P2024') {
      return NextResponse.json(
        { error: 'Database connection timeout. Please try again.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: prismaError.message || 'Failed to fetch reports' },
      { status: 500 }
    );
  } finally {
    // Optional: Disconnect for serverless environments
    if (process.env.VERCEL) {
      await prisma.$disconnect();
    }
  }
}
