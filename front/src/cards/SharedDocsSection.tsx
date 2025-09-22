import React from "react";
import { Plus, FileText, Download, Eye, Edit } from "lucide-react";
import { MOCK_DOCS } from "../data/mockData";

interface Document {
  name: string;
  type: string;
  updated: string;
  owner: string;
  size: string;
  downloads: number;
  category: string;
}

const SharedDocsSection: React.FC = () => {
  return (
    <div className="mt-6 p-8 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg text-gray-900 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight">Documents partagés</h2>
        <div className="flex gap-4 w-full sm:w-auto">
          <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl shadow-md hover:brightness-110 transition focus:outline-none">
            <Plus className="w-5 h-5" />
            Uploader
          </button>
          <select className="px-4 py-3 border border-white/50 rounded-2xl bg-white/40 backdrop-blur-md text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-48">
            <option>Toutes catégories</option>
            <option>Rapports</option>
            <option>Contrats</option>
            <option>Design</option>
            <option>Technique</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {MOCK_DOCS.map((d: Document, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between border border-white/40 p-6 rounded-2xl bg-white/20 backdrop-blur-md shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-indigo-100/70 rounded-xl flex items-center justify-center shadow-inner">
                <FileText className="w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg leading-tight">{d.name}</h3>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mt-1">
                  <span>
                    {d.type} • {d.size}
                  </span>
                  <span>Modifié le {d.updated}</span>
                  <span>Par {d.owner}</span>
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {d.downloads}
                  </span>
                </div>
                <span className="inline-block mt-2 px-3 py-1 bg-white/40 text-gray-600 rounded-full text-xs font-semibold backdrop-blur-sm">
                  {d.category}
                </span>
              </div>
            </div>
            <div className="flex gap-3 text-gray-700">
              <button className="p-3 rounded-lg bg-white/30 backdrop-blur-md hover:bg-white/50 transition text-indigo-600 shadow-sm focus:outline-none">
                <Eye className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-lg bg-white/30 backdrop-blur-md hover:bg-white/50 transition text-green-600 shadow-sm focus:outline-none">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-lg bg-white/30 backdrop-blur-md hover:bg-white/50 transition text-gray-600 shadow-sm focus:outline-none">
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedDocsSection;
