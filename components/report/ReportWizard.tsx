'use client';
import { useState } from 'react';
import { ReportForm } from './ReportForm';
import { ReportSubmitted } from './ReportFormCompleted';
import { ReportData } from '@/app/types/reportData';

export function ReportWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState<ReportData>({}); // Ensure type matches

  const handleStepComplete = (data: ReportData) => {
    setReportData((prev) => ({ ...prev, ...data }));

    if (currentStep === 3) {
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div>
      {currentStep === 1 && <ReportForm onComplete={handleStepComplete} />}
      {currentStep === 2 && (
        <ReportSubmitted data={reportData} onComplete={handleStepComplete} />
      )}
    </div>
  );
}
