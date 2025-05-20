import React, { useState, useEffect } from 'react';
import { 
  DownloadIcon, 
  RefreshIcon, 
  ChartBarIcon, 
  CalendarIcon, 
  DocumentTextIcon,
  UserGroupIcon,
  GlobeIcon,
  ClockIcon,
  PresentationChartLineIcon,
  CursorClickIcon
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

// Define TypeScript interfaces
interface OverviewData {
  totalForms: number;
  totalResponses: number;
  responseRate: number;
  averageTimeToComplete: string;
  activeUsers: number;
}

interface RecentActivity {
  id: number;
  formName: string;
  action: string;
  timestamp: string;
}

interface TopForm {
  id: number;
  name: string;
  responses: number;
  completionRate: number;
}

interface GeoData {
  id: number;
  country: string;
  responses: number;
}

interface TimelineItem {
  date: string;
  responses: number;
}

interface DeviceData {
  device: string;
  count: number;
  percentage: number;
}

interface CompletionTimeData {
  range: string;
  count: number;
}

interface AnalyticsData {
  overview: OverviewData;
  recentActivity: RecentActivity[];
  topForms: TopForm[];
  geo: GeoData[];
  timeline: TimelineItem[];
  byDevice: DeviceData[];
  completionTime: CompletionTimeData[];
}

// Interface for chart component props
interface TimelineChartProps {
  data: AnalyticsData;
}

interface ChartItem {
  count: number;
}

interface PieChartProps {
  data: ChartItem[];
}

interface BarChartProps {
  data: CompletionTimeData[];
}

// Mock data for analytics
const mockAnalyticsData: AnalyticsData = {
  overview: {
    totalForms: 8,
    totalResponses: 423,
    responseRate: 68,
    averageTimeToComplete: '2m 34s',
    activeUsers: 125,
  },
  recentActivity: [
    { id: 1, formName: 'Customer Feedback', action: 'New response', timestamp: '2025-05-18T14:22:00Z' },
    { id: 2, formName: 'Event Registration', action: 'Form edited', timestamp: '2025-05-18T12:35:00Z' },
    { id: 3, formName: 'Product Survey', action: '5 new responses', timestamp: '2025-05-17T16:48:00Z' },
    { id: 4, formName: 'Job Application', action: 'Form created', timestamp: '2025-05-16T09:12:00Z' },
    { id: 5, formName: 'Newsletter Signup', action: '12 new responses', timestamp: '2025-05-15T17:30:00Z' },
  ],
  topForms: [
    { id: 1, name: 'Customer Feedback Form', responses: 156, completionRate: 85 },
    { id: 2, name: 'Event Registration', responses: 128, completionRate: 92 },
    { id: 3, name: 'Product Survey', responses: 87, completionRate: 68 },
    { id: 4, name: 'Job Application', responses: 52, completionRate: 76 },
    { id: 5, name: 'Newsletter Signup', responses: 42, completionRate: 95 },
  ],
  geo: [
    { id: 1, country: 'United States', responses: 218 },
    { id: 2, country: 'United Kingdom', responses: 84 },
    { id: 3, country: 'Germany', responses: 56 },
    { id: 4, country: 'France', responses: 43 },
    { id: 5, country: 'Canada', responses: 22 },
  ],
  timeline: [
    { date: '2025-05-01', responses: 8 },
    { date: '2025-05-02', responses: 12 },
    { date: '2025-05-03', responses: 7 },
    { date: '2025-05-04', responses: 5 },
    { date: '2025-05-05', responses: 15 },
    { date: '2025-05-06', responses: 23 },
    { date: '2025-05-07', responses: 18 },
    { date: '2025-05-08', responses: 14 },
    { date: '2025-05-09', responses: 16 },
    { date: '2025-05-10', responses: 12 },
    { date: '2025-05-11', responses: 8 },
    { date: '2025-05-12', responses: 19 },
    { date: '2025-05-13', responses: 26 },
    { date: '2025-05-14', responses: 32 },
    { date: '2025-05-15', responses: 28 },
    { date: '2025-05-16', responses: 21 },
    { date: '2025-05-17', responses: 24 },
    { date: '2025-05-18', responses: 20 },
    { date: '2025-05-19', responses: 17 },
    { date: '2025-05-20', responses: 28 },
  ],
  byDevice: [
    { device: 'Desktop', count: 245, percentage: 58 },
    { device: 'Mobile', count: 142, percentage: 33 },
    { device: 'Tablet', count: 36, percentage: 9 },
  ],
  completionTime: [
    { range: '<1 min', count: 78 },
    { range: '1-2 min', count: 132 },
    { range: '2-5 min', count: 156 },
    { range: '5-10 min', count: 46 },
    { range: '>10 min', count: 11 },
  ]
};

// Simple responsive SVG charts
const TimelineChart: React.FC<TimelineChartProps> = ({ data }) => (
  <div className="h-64 w-full">
    <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
      {/* X-axis */}
      <line x1="40" y1="260" x2="780" y2="260" stroke="#6B7280" strokeWidth="1" />
      
      {/* Y-axis */}
      <line x1="40" y1="40" x2="40" y2="260" stroke="#6B7280" strokeWidth="1" />
      
      {/* Plot line */}
      <polyline
        fill="none"
        stroke="#6366F1"
        strokeWidth="2"
        points={data.timeline.map((item: TimelineItem, index: number) => {
          const x = 40 + (index * (740 / (data.timeline.length - 1)));
          const max = Math.max(...data.timeline.map((d: TimelineItem) => d.responses));
          const y = 260 - ((item.responses / max) * 200);
          return `${x},${y}`;
        }).join(' ')}
      />
      
      {/* Fill area under the line */}
      <path
        d={`M40,260 ${data.timeline.map((item: TimelineItem, index: number) => {
          const x = 40 + (index * (740 / (data.timeline.length - 1)));
          const max = Math.max(...data.timeline.map((d: TimelineItem) => d.responses));
          const y = 260 - ((item.responses / max) * 200);
          return `L${x},${y}`;
        }).join(' ')} L${40 + (19 * (740 / (data.timeline.length - 1)))},260 Z`}
        fill="url(#gradient)"
        opacity="0.2"
      />
      
      {/* Data points */}
      {data.timeline.map((item: TimelineItem, index: number) => {
        const x = 40 + (index * (740 / (data.timeline.length - 1)));
        const max = Math.max(...data.timeline.map((d: TimelineItem) => d.responses));
        const y = 260 - ((item.responses / max) * 200);
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="4"
            fill="#6366F1"
          />
        );
      })}
      
      {/* X-axis labels (every 4th date) */}
      {data.timeline.filter((_: TimelineItem, i: number) => i % 4 === 0).map((item: TimelineItem, index: number) => {
        const x = 40 + ((index * 4) * (740 / (data.timeline.length - 1)));
        const date = new Date(item.date);
        const label = `${date.getMonth() + 1}/${date.getDate()}`;
        return (
          <text
            key={index}
            x={x}
            y="280"
            textAnchor="middle"
            fontSize="12"
            fill="#6B7280"
          >
            {label}
          </text>
        );
      })}
      
      {/* Y-axis labels */}
      {[0, 10, 20, 30, 40].map((value, index) => {
        const max = Math.max(...data.timeline.map((d: TimelineItem) => d.responses));
        const adjustedValue = Math.round((value / 40) * max);
        return (
          <text
            key={index}
            x="35"
            y={260 - (index * 50)}
            textAnchor="end"
            fontSize="12"
            fill="#6B7280"
          >
            {adjustedValue}
          </text>
        );
      })}
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const total = data.reduce((sum: number, item: ChartItem) => sum + item.count, 0);
  let startAngle = 0;
  
  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160">
          {data.map((item: any, index: number) => {
            const percentage = item.count / total;
            const endAngle = startAngle + percentage * 360;
            
            // Convert angles to radians for SVG arc
            const startAngleRad = (startAngle - 90) * (Math.PI / 180);
            const endAngleRad = (endAngle - 90) * (Math.PI / 180);
            
            // Calculate the points for the arc
            const x1 = 80 + 70 * Math.cos(startAngleRad);
            const y1 = 80 + 70 * Math.sin(startAngleRad);
            const x2 = 80 + 70 * Math.cos(endAngleRad);
            const y2 = 80 + 70 * Math.sin(endAngleRad);
            
            // Determine if we need to use the large arc flag
            const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
            
            // Create the SVG path
            const path = `M 80 80 L ${x1} ${y1} A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            
            // Colors for each slice
            const colors = ['#6366F1', '#8B5CF6', '#EC4899'];
            
            // Update for the next slice
            startAngle = endAngle;
            
            return (
              <path
                key={index}
                d={path}
                fill={colors[index % colors.length]}
                stroke="#FFFFFF"
                strokeWidth="1"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{total}</span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">Total</span>
          </div>
        </div>
      </div>
      <div className="ml-8">
        {data.map((item: any, index: number) => {
          const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
          const percentage = Math.round((item.count / total) * 100);
          
          return (
            <div key={index} className="flex items-center mb-2">
              <div className={`w-3 h-3 ${colors[index % colors.length]} rounded-full mr-2`}></div>
              <div className="text-sm">
                <span className="text-gray-700 dark:text-gray-300">{'device' in item ? item.device : item.range}</span>
                <span className="ml-2 text-gray-500 dark:text-gray-400">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.count));
  
  return (
    <div className="h-64 w-full flex items-end space-x-4 px-6">
      {data.map((item: CompletionTimeData, index: number) => {
        const height = (item.count / maxValue) * 100;
        const colors = ['bg-indigo-500', 'bg-indigo-600', 'bg-indigo-700', 'bg-indigo-800', 'bg-indigo-900'];
        
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`${colors[index % colors.length]} rounded-t-md w-full`}
              style={{ height: `${height}%` }}
            ></div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.range}</div>
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.count}</div>
          </div>
        );
      })}
    </div>
  );
};

// Main Analytics component
const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('30d');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<AnalyticsData>(mockAnalyticsData);

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate API call - would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd fetch different data based on the time range
      setData({
        ...mockAnalyticsData,
        overview: {
          ...mockAnalyticsData.overview,
          totalResponses: timeRange === '7d' ? 124 : timeRange === '30d' ? 423 : 982
        }
      });
      
      setIsLoading(false);
    };
    
    fetchData();
  }, [timeRange]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
            <button
              className={`px-3 py-1.5 text-sm ${timeRange === '7d' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'} rounded-l-md`}
              onClick={() => setTimeRange('7d')}
            >
              7D
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${timeRange === '30d' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setTimeRange('30d')}
            >
              30D
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${timeRange === '90d' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'} rounded-r-md`}
              onClick={() => setTimeRange('90d')}
            >
              90D
            </button>
          </div>
          
          <button
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1000);
            }}
          >
            <RefreshIcon className={`h-5 w-5 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <span className="ml-3 text-gray-700 dark:text-gray-300">Loading analytics data...</span>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <DocumentTextIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{data.overview.totalForms}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Forms</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                  <UserGroupIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{data.overview.totalResponses}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Responses</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900">
                  <CursorClickIcon className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{data.overview.responseRate}%</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Response Rate</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <ClockIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{data.overview.averageTimeToComplete}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Time</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <UserGroupIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{data.overview.activeUsers}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Response Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Response Trend</h2>
            </div>
            <div className="p-6">
              <TimelineChart data={data} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Top Forms */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Top Performing Forms</h2>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Form Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Responses</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completion Rate</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {data.topForms.map(form => (
                      <tr key={form.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/form/${form.id}/responses`} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                            {form.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {form.responses}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2 max-w-[100px]">
                              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${form.completionRate}%` }}></div>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{form.completionRate}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Device Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Device Breakdown</h2>
              </div>
              <div className="p-6">
                <PieChart data={data.byDevice} />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: '320px' }}>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.recentActivity.map(activity => (
                    <li key={activity.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{activity.formName}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{activity.action}</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(activity.timestamp)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Completion Time */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Completion Time</h2>
              </div>
              <div className="p-6">
                <BarChart data={data.completionTime} />
              </div>
            </div>
          </div>
          
          {/* Geographical Distribution */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Geographical Distribution</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <GlobeIcon className="h-6 w-6 text-indigo-500 mr-2" />
                <p className="text-sm text-gray-700 dark:text-gray-300">Top countries by response count</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  {data.geo.map(item => (
                    <li key={item.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900 dark:text-white">{item.country}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${(item.responses / data.geo[0].responses) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[40px] text-right">{item.responses}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Interactive world map visualization <br />coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;