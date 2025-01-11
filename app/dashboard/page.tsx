'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Report, ReportStatus, ReportType } from '@prisma/client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { X, Filter, LogOut, Calendar, MapPin, Tag } from 'lucide-react';

export default function Dashboard() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<ReportType | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/reports', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateReportStatus = async (
    reportId: string,
    newStatus: ReportStatus
  ) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchReports();
      }
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  const filteredReports = (Array.isArray(reports) ? reports : []).filter(
    (report) => {
      const statusMatch = filter === 'ALL' || report.status === filter;
      const typeMatch = typeFilter === 'ALL' || report.type === typeFilter;
      return statusMatch && typeMatch;
    }
  );

  const getStatusColor = (status: ReportStatus) => {
    const colors = {
      PENDING: 'bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/30',
      IN_PROGRESS: 'bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/30',
      RESOLVED: 'bg-green-500/10 text-green-500 ring-1 ring-green-500/30',
      DISMISSED:
        'bg-neutral-500/10 text-neutral-400 ring-1 ring-neutral-500/30',
    };
    return colors[status];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-l-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-neutral-900/50 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-neutral-300">
                  {session?.user?.name || 'Admin'}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-full transition-all"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter className="text-neutral-500" size={20} />
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as ReportStatus | 'ALL')
                }
                className="bg-neutral-900/50 border border-neutral-800 text-neutral-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
              >
                <option value="ALL">All Status</option>
                {Object.values(ReportStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value as ReportType | 'ALL')
                }
                className="bg-neutral-900/50 border border-neutral-800 text-neutral-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
              >
                <option value="ALL">All Types</option>
                {Object.values(ReportType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="px-4 py-2 bg-neutral-900/50 rounded-full text-sm text-neutral-400">
              {filteredReports.length} Reports
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-6 border border-neutral-800/50 hover:border-neutral-700/50 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-medium text-neutral-200 leading-tight group-hover:text-white transition-colors">
                    {report.title}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                </div>

                <p className="text-neutral-400 text-sm leading-relaxed">
                  {report.description}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-neutral-500">
                  <span className="flex items-center gap-2 bg-neutral-900/50 px-3 py-1.5 rounded-full">
                    <Tag size={14} />
                    {report.type}
                  </span>
                  <span className="flex items-center gap-2 bg-neutral-900/50 px-3 py-1.5 rounded-full">
                    <MapPin size={14} />
                    {report.location || 'N/A'}
                  </span>
                  <span className="flex items-center gap-2 bg-neutral-900/50 px-3 py-1.5 rounded-full">
                    <Calendar size={14} />
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {report.image && (
                  <div className="flex justify-center items-center">
                    <Image
                      height={2000}
                      width={2000}
                      src={report.image}
                      alt="Report"
                      className="mt-2 rounded-xl object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity border border-neutral-800/50"
                      onClick={() => setSelectedImage(report.image)}
                    />
                  </div>
                )}
              </div>

              <div className="mt-6">
                <select
                  value={report.status}
                  onChange={(e) =>
                    updateReportStatus(
                      report.id,
                      e.target.value as ReportStatus
                    )
                  }
                  className="w-full bg-neutral-900/50 border border-neutral-800/50 text-neutral-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
                >
                  {Object.values(ReportStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {filteredReports.length === 0 && (
            <div className="col-span-full text-center py-12 text-neutral-500 bg-neutral-900/30 rounded-2xl border border-neutral-800/50">
              No reports found matching the selected filters.
            </div>
          )}
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800/50">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800/50 text-neutral-400 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
            <Image
              src={selectedImage}
              alt="Report Full Size"
              width={2000}
              height={2000}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
