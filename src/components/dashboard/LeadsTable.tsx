import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  MoreHorizontal, 
  ArrowUpDown,
  Download,
  Filter,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Qualificado' | 'Em Negociação' | 'Convertido' | 'Perdido';
  value: number;
  date: string;
}

const initialData: Lead[] = [
  { id: '1', name: 'João Silva', email: 'joao@exemplo.com', phone: '(11) 98888-7777', status: 'Qualificado', value: 1200, date: '2026-03-15' },
  { id: '2', name: 'Maria Oliveira', email: 'maria@exemplo.com', phone: '(21) 97777-6666', status: 'Convertido', value: 3500, date: '2026-03-14' },
  { id: '3', name: 'Pedro Santos', email: 'pedro@exemplo.com', phone: '(31) 96666-5555', status: 'Em Negociação', value: 2100, date: '2026-03-14' },
  { id: '4', name: 'Ana Costa', email: 'ana@exemplo.com', phone: '(41) 95555-4444', status: 'Qualificado', value: 800, date: '2026-03-13' },
  { id: '5', name: 'Lucas Lima', email: 'lucas@exemplo.com', phone: '(51) 94444-3333', status: 'Perdido', value: 0, date: '2026-03-12' },
  { id: '6', name: 'Carla Souza', email: 'carla@exemplo.com', phone: '(61) 93333-2222', status: 'Convertido', value: 4200, date: '2026-03-11' },
  { id: '7', name: 'Roberto Dias', email: 'roberto@exemplo.com', phone: '(71) 92222-1111', status: 'Em Negociação', value: 1500, date: '2026-03-10' },
];

const columnHelper = createColumnHelper<Lead>();

const columns = [
  columnHelper.accessor('name', {
    header: ({ column }) => (
      <button className="flex items-center gap-2 hover:text-brand-black transition-colors font-serif italic lowercase tracking-normal text-sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        nome <ArrowUpDown size={12} />
      </button>
    ),
    cell: info => <span className="font-bold tracking-tight whitespace-nowrap">{info.getValue()}</span>,
  }),
  columnHelper.accessor('email', {
    header: () => <span className="font-serif italic lowercase text-sm">email</span>,
    cell: info => <span className="text-brand-black/40 font-mono text-xs truncate max-w-[120px] block">{info.getValue()}</span>,
  }),
  columnHelper.accessor('phone', {
    header: () => <span className="font-serif italic lowercase text-sm">telefone</span>,
    cell: info => <span className="font-mono text-xs whitespace-nowrap">{info.getValue()}</span>,
  }),
  columnHelper.accessor('status', {
    header: () => <span className="font-serif italic lowercase text-sm">status</span>,
    cell: info => {
      const status = info.getValue();
      const colors = {
        'Qualificado': 'bg-blue-500/10 text-blue-600 border-blue-200',
        'Em Negociação': 'bg-orange-500/10 text-brand-orange border-orange-200',
        'Convertido': 'bg-green-500/10 text-green-600 border-green-200',
        'Perdido': 'bg-gray-500/10 text-gray-500 border-gray-200',
      };
      return (
        <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest border whitespace-nowrap", colors[status])}>
          {status}
        </span>
      );
    },
  }),
  columnHelper.accessor('value', {
    header: ({ column }) => (
      <button className="flex items-center gap-2 hover:text-brand-black transition-colors font-serif italic lowercase tracking-normal text-sm" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        valor <ArrowUpDown size={12} />
      </button>
    ),
    cell: info => <span className="font-mono font-bold text-brand-orange whitespace-nowrap">R$ {info.getValue().toLocaleString()}</span>,
  }),
  columnHelper.accessor('date', {
    header: () => <span className="font-serif italic lowercase text-sm">data</span>,
    cell: info => <span className="text-brand-black/40 font-mono text-[10px] whitespace-nowrap">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <button className="p-1.5 hover:bg-brand-orange hover:text-white rounded-lg transition-all duration-200">
        <MoreHorizontal size={14} />
      </button>
    ),
  }),
];

export default function LeadsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: initialData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-6 md:space-y-8 font-sans">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-brand-line">
        <div>
          <div className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.3em] mb-2 font-mono">Banco_Dados v2.4</div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter leading-none">GESTÃO DE LEADS.</h1>
          <p className="text-brand-black/40 mt-4 font-medium text-sm md:text-base">Contatos qualificados pelo Agente Nexus em tempo real.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn-secondary px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 text-[10px] md:text-xs flex-1 sm:flex-none justify-center">
            <Download size={14} />
            EXPORTAR .CSV
          </button>
          <button className="btn-primary px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 text-[10px] md:text-xs flex-1 sm:flex-none justify-center">
            <Plus size={14} />
            NOVO REGISTRO
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] md:rounded-[32px] border border-brand-line shadow-sm overflow-hidden">
        <div className="px-6 md:px-8 py-4 md:py-6 border-b border-brand-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6 bg-brand-paper/20">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/20" size={16} />
            <input
              placeholder="Filtrar registros..."
              className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-white border border-brand-line rounded-xl md:rounded-2xl text-sm outline-none focus:border-brand-orange/50 transition-all font-medium"
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <div className="text-[9px] md:text-[10px] font-bold text-brand-black/30 uppercase tracking-widest">
              {table.getFilteredRowModel().rows.length} registros
            </div>
            <button className="p-2.5 md:p-3 bg-white border border-brand-line rounded-xl md:rounded-2xl text-brand-black/40 hover:text-brand-orange hover:border-brand-orange transition-all shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-brand-paper/30">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 md:px-8 py-3 md:py-4 border-b border-brand-line">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-brand-black hover:text-white transition-all duration-200 cursor-pointer group">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 md:px-8 py-4 md:py-5 border-b border-brand-line group-last:border-none">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-paper/10">
          <div className="text-[9px] md:text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 rounded-xl hover:bg-brand-orange hover:text-white disabled:opacity-20 transition-all border border-brand-line bg-white shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 rounded-xl hover:bg-brand-orange hover:text-white disabled:opacity-20 transition-all border border-brand-line bg-white shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
