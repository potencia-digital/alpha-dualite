import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PlaceholderSectionProps {
  icon: LucideIcon;
  title: string;
  message: string;
}

export const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ icon: Icon, title, message }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
      <div className="text-center bg-white p-12 rounded-lg border-2 border-dashed border-gray-300">
        <Icon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Em Breve</h3>
        <p className="mt-1 text-sm text-gray-500">
          Esta seção está em desenvolvimento e será disponibilizada em futuras atualizações.
        </p>
      </div>
    </div>
  );
};
