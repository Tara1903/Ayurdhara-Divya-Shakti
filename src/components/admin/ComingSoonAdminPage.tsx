import { LayoutTemplate } from 'lucide-react';

export default function ComingSoonAdminPage({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-6 h-[80vh] flex flex-col">
      <div>
        <h1 className="text-2xl font-serif text-gray-900 tracking-wide">{title}</h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
          <LayoutTemplate size={32} />
        </div>
        <h2 className="text-xl font-medium text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-500 max-w-md">
          The {title.toLowerCase()} module is currently under development. 
          This feature will be available in a future update to the Ayurdhara Divya Shakti Business Operating System.
        </p>
      </div>
    </div>
  );
}
