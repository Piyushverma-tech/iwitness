import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ReportType, ReportStatus } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const {
      reportId,
      type,
      specificType,
      title,
      description,
      location,
      latitude,
      longitude,
      image,
    } = await request.json();

    const report = await prisma.report.create({
      data: {
        reportId,
        type: type as ReportType,
        title,
        description,
        reportType: specificType,
        location,
        latitude: latitude || null,
        longitude: longitude || null,
        image: image || null,
        status: ReportStatus.PENDING,
      },
    });

    return NextResponse.json({
      success: true,
      reportId: report.reportId,
      message: 'Report submitted successfully',
    });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit report',
      },
      { status: 500 }
    );
  }
}
