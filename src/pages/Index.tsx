
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-[#121328] text-white p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">ProdTech</h1>
          <p className="text-sm">services</p>
        </div>
        
        <nav className="space-y-6 flex-1">
          <Link to="/" className="flex items-center gap-2 text-white">
            <MessageSquare size={20} />
            <span>Chamados</span>
          </Link>
          
          <Link to="/criar-chamado" className="flex items-center gap-2 text-white/70 hover:text-white">
            <div className="w-5 h-5 flex items-center justify-center bg-white/20 text-white rounded-sm">
              <Plus size={16} />
            </div>
            <span>Criar chamados</span>
          </Link>
          
          <div className="flex items-center gap-2 text-white/70">
            <span className="w-5 h-5 flex items-center justify-center rounded-sm">🎧</span>
            <span>Suporte</span>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-end mb-8">
          <div className="flex items-center gap-2">
            <span className="font-medium">CLIENTE</span>
          </div>
        </header>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Meus Chamados</h1>
            <Link to="/criar-chamado">
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>Criar Chamado</span>
              </Button>
            </Link>
          </div>
          
          <div className="bg-white p-6 shadow-sm rounded-md">
            <p className="text-center text-gray-500 py-8">
              Bem-vindo ao sistema de chamados. Use o botão acima ou o menu lateral para criar um novo chamado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
