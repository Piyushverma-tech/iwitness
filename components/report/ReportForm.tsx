'use client';

import { useState, useCallback } from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { LocationInput } from './LocationInput';
import Image from 'next/image';
import crypto from 'crypto';

const REPORT_TYPES = [
  'Theft',
  'Fire Outbreak',
  'Medical Emergency',
  'Natural Disaster',
  'Violence',
  'Other',
] as const;

type ReportType = 'EMERGENCY' | 'NON_EMERGENCY';

interface ReportData {
  incidentType: ReportType;
  specificType: string;
  location: string;
  description: string;
  title: string;
}

interface ReportFormProps {
  onComplete: (data: ReportData) => void;
}

export function ReportForm({ onComplete }: ReportFormProps) {
  const [formData, setFormData] = useState<ReportData>({
    incidentType: '' as ReportType,
    specificType: '',
    location: '',
    description: '',
    title: '',
  });

  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [coordinates, setCoordinates] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);

    try {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await response.json();

      if (data.title && data.description && data.reportType) {
        setFormData((prev) => ({
          ...prev,
          title: data.title,
          description: data.description,
          specificType: data.reportType,
        }));
        setImage(base64 as string);
      }
    } catch (error) {
      console.error('Error analyzing image', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateReportId = useCallback(() => {
    const timestamp = Date.now().toString();
    const randomBytes = crypto.randomBytes(16).toString('hex');
    const combinedString = `${timestamp}-${randomBytes}`;

    return crypto
      .createHash('sha256')
      .update(combinedString)
      .digest('hex')
      .slice(0, 16);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reportData = {
        reportId: generateReportId(),
        type: formData.incidentType,
        specificType: formData.specificType,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        image: image,
        status: 'PENDING',
      };

      const response = await fetch('/api/reports/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit report');
      }
      onComplete(result);
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto  bg-neutral-900/40 backdrop-blur-sm border-2 border-neutral-800/50">
      <CardHeader className="pb-4"></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emergency type selection */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, incidentType: 'EMERGENCY' }))
              }
              className={`p-6 rounded-2xl border-2 w-full h-full transition-all duration-200 ${
                formData.incidentType === 'EMERGENCY'
                  ? 'bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20'
                  : 'bg-zinc-900/50 border-zinc-800 hover:bg-red-500/10 hover:border-red-500/10'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                {/* Emergency icon */}
                <BsExclamationTriangle className="sm:text-3xl text-2xl text-red-500" />

                <span className="font-medium text-[0.9rem] sm:text-[1rem] text-red-500">
                  Emergency
                </span>
                <span className="text-xs text-zinc-400">
                  Immediate Response Required
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  incidentType: 'NON_EMERGENCY',
                }))
              }
              className={`p-6 rounded-2xl border-2 w-full h-full transition-all duration-200 ${
                formData.incidentType === 'NON_EMERGENCY'
                  ? 'bg-orange-500/20 border-orange-500 shadow-lg shadow-orange-500/20'
                  : 'bg-zinc-900/50 border-zinc-800 hover:bg-orange-500/10 hover:border-orange-500/10'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                {/* Non-Emergency SVG */}
                <IoIosInformationCircleOutline className="sm:text-4xl text-3xl text-orange-500" />

                <span className="font-medium text-[0.9rem] sm:text-[1rem] text-orange-500">
                  Non Emergency
                </span>
                <span className="text-xs text-zinc-400">General Report</span>
              </div>
            </button>
          </div>

          {/* Image Upload */}
          <div className="relative group mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="block w-full aspect-video relative rounded-xl border-2 border-dashed border-zinc-700 
                       hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-300
                       cursor-pointer overflow-hidden"
            >
              {image ? (
                <div className="w-full h-full relative">
                  <Image
                    src={image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-sm text-white font-medium">
                      Click to change image
                    </p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                  <div className="p-4 rounded-full bg-zinc-800/50">
                    <svg
                      className="h-8 w-8 text-zinc-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="sm:text-sm text-xs text-zinc-400">
                    Drop an image here or click to upload
                  </p>
                </div>
              )}
            </label>
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <svg
                    className="animate-spin h-5 w-5 text-sky-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-sky-500 font-medium">
                    Analyzing image...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Incident Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              * Incident Type
            </label>
            <Select
              value={formData.specificType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, specificType: value }))
              }
            >
              <SelectTrigger className="w-full bg-zinc-900/50  text-white border-zinc-800">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900  text-white border-zinc-800">
                {REPORT_TYPES.map((type, i) => (
                  <SelectItem key={i} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Input */}
          <LocationInput
            value={formData.location}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, location: value }))
            }
            onCoordinatesChange={(lat, lng) =>
              setCoordinates({ latitude: lat, longitude: lng })
            }
          />

          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              * Report Title
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="bg-zinc-900/50 text-white border-zinc-800"
              required
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              * Report Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className="bg-zinc-900/50  text-white border-zinc-800 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative group overflow-hidden rounded-xl 
                    bg-gradient-to-r from-blue-600 to-red-600
                     px-6 py-3.5 text-sm font-medium text-white
                     transition-all duration-300 
                     hover:from-red-600 hover:to-blue-600
                     disabled:opacity-50 disabled:cursor-not-allowed
                    "
          >
            <div className="relative flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Report</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </div>
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
