import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Cliente } from '../../types';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface PipelineColumnProps {
  stage: string;
  leads: Cliente[];
  color: string;
}

const LeadCard: React.FC<{ lead: Cliente; index: number }> = ({ lead, index }) => (
  <Draggable draggableId={lead.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="bg-white p-3 rounded-md border border-gray-200 shadow-sm mb-3"
      >
        <p className="font-semibold text-sm text-gray-800">{lead.nome}</p>
        <p className="text-xs text-gray-500">{lead.email}</p>
        <p className="text-sm font-bold text-green-600 mt-2">
          R$ {lead.totalCompras.toFixed(2)}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex -space-x-2">
            <img className="w-6 h-6 rounded-full border-2 border-white" src={`https://i.pravatar.cc/40?u=${lead.id}`} alt={lead.nome} />
          </div>
          <span className={`px-2 py-0.5 text-xs rounded-full ${
            lead.categoria === 'VIP' ? 'bg-purple-100 text-purple-800' :
            lead.categoria === 'Regular' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {lead.categoria}
          </span>
        </div>
      </div>
    )}
  </Draggable>
);

const PipelineColumn: React.FC<PipelineColumnProps> = ({ stage, leads, color }) => {
  return (
    <div className="flex-1 min-w-[280px] bg-gray-50 rounded-lg p-3 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className={`font-semibold text-sm ${color}`}>{stage}</h3>
        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{leads.length}</span>
      </div>
      <Droppable droppableId={stage}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 flex-grow min-h-[100px]"
          >
            {leads.map((lead, index) => (
              <LeadCard key={lead.id} lead={lead} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button className="w-full mt-3 text-sm text-gray-600 hover:bg-gray-200 p-2 rounded-md flex items-center justify-center gap-1">
        <Plus size={14} /> Adicionar Lead
      </button>
    </div>
  );
};

interface PipelineViewProps {
    leads: Cliente[];
    onLeadsChange: (leads: Cliente[]) => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({ leads, onLeadsChange }) => {
  const stageOrder: Cliente['stage'][] = ['Lead', 'Qualificado', 'Proposta', 'Fechado', 'Perdido'];
  
  const columns: { [key: string]: Cliente[] } = {};
  stageOrder.forEach(stage => {
    columns[stage] = leads.filter(l => l.stage === stage);
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];
    
    const startItems = Array.from(startColumn);
    const [removed] = startItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      startItems.splice(destination.index, 0, removed);
    } else {
      // Move to a different column
      removed.stage = destination.droppableId as Cliente['stage'];
      const endItems = Array.from(endColumn);
      endItems.splice(destination.index, 0, removed);
    }

    const newLeads = Object.values(columns).flat();
    onLeadsChange(newLeads);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-250px)]">
        <PipelineColumn stage="Lead" leads={columns['Lead']} color="text-blue-600" />
        <PipelineColumn stage="Qualificado" leads={columns['Qualificado']} color="text-yellow-600" />
        <PipelineColumn stage="Proposta" leads={columns['Proposta']} color="text-orange-600" />
        <PipelineColumn stage="Fechado" leads={columns['Fechado']} color="text-green-600" />
        <PipelineColumn stage="Perdido" leads={columns['Perdido']} color="text-red-600" />
      </div>
    </DragDropContext>
  );
};
