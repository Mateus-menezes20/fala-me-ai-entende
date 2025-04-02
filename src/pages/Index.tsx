
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, Filter, ArrowLeft } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data para exibição inicial
const mockTickets = [
  {
    id: "001",
    titulo: "Problema na rede",
    descricao: "Conexão instável no setor X. Contato: email, telefone.",
    entidade: "Empresa ABC",
    tipo: "Incidente",
    status: "Em andamento (atribuído)",
    categoria: "Manutenção de Rede",
    atribuido: "Técnico João"
  },
  {
    id: "002",
    titulo: "Instalação de Software",
    descricao: "Solicitação de instalação do software Y. Contato: email, telefone.",
    entidade: "Empresa XYZ",
    tipo: "Requisição",
    status: "Novo",
    categoria: "Instalação de Software",
    atribuido: "-"
  }
];

const Index = () => {
  // Estado para controlar os chamados
  const [tickets, setTickets] = useState(mockTickets);
  const [darkMode, setDarkMode] = useState(true);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
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
        <header className="flex justify-between mb-8">
          <div className="flex items-center">
            <Filter size={24} className="text-gray-500 mr-2" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  value="" 
                  className="sr-only peer" 
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">CLIENTE</span>
            </div>
          </div>
        </header>
        
        <div className="max-w-full mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Meus Chamados</h1>
            <Link to="/criar-chamado">
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>Criar Chamado</span>
              </Button>
            </Link>
          </div>
          
          <div className="bg-white p-6 shadow-sm rounded-md overflow-x-auto">
            {tickets.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] bg-gray-200">ID</TableHead>
                    <TableHead className="bg-gray-200">TÍTULO</TableHead>
                    <TableHead className="bg-gray-200">DESCRIÇÃO</TableHead>
                    <TableHead className="bg-gray-200">ENTIDADE</TableHead>
                    <TableHead className="bg-gray-200">TIPO</TableHead>
                    <TableHead className="bg-gray-200">STATUS</TableHead>
                    <TableHead className="bg-gray-200">CATEGORIA</TableHead>
                    <TableHead className="bg-gray-200">ATRIBUÍDO</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.titulo}</TableCell>
                      <TableCell>{ticket.descricao}</TableCell>
                      <TableCell>{ticket.entidade}</TableCell>
                      <TableCell>{ticket.tipo}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status.includes("andamento") 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {ticket.status}
                        </span>
                      </TableCell>
                      <TableCell>{ticket.categoria}</TableCell>
                      <TableCell>{ticket.atribuido}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500 py-8">
                Não há chamados registrados. Use o botão acima ou o menu lateral para criar um novo chamado.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
