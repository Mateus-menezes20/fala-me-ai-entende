
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Structure for tickets based on what we have in the existing code
const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [detailModal, setDetailModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Load tickets from localStorage
  useEffect(() => {
    const getStoredTickets = () => {
      const stored = localStorage.getItem('tickets');
      return stored ? JSON.parse(stored) : [];
    };
    
    setTickets(getStoredTickets());
    setLoading(false);
  }, []);

  // Listen for storage changes (when tickets are updated in another component)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedTickets = localStorage.getItem('tickets');
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Filter tickets by search term
    // This is client-side filtering since we're using localStorage
    const filteredTickets = tickets.filter(ticket => 
      ticket.titulo.toLowerCase().includes(search.toLowerCase())
    );
    
    if (filteredTickets.length === 0) {
      toast("Nenhum chamado encontrado para esta pesquisa");
    }
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const applyFilter = (status) => {
    setStatusFilter(status);
    setShowFilterModal(false);
  };

  const handleShowDetails = (ticket) => {
    setSelectedTicket(ticket);
    setDetailModal(true);
  };

  const closeDetailModal = () => {
    setDetailModal(false);
    setSelectedTicket(null);
  };

  const displayTickets = statusFilter 
    ? tickets.filter(ticket => ticket.status.includes(statusFilter))
    : tickets;

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
          
          <Link to="/suporte" className="flex items-center gap-2 text-white/70 hover:text-white">
            <span className="w-5 h-5 flex items-center justify-center rounded-sm">🎧</span>
            <span>Suporte</span>
          </Link>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between mb-8">
          <div className="flex items-center">
            <Filter size={24} className="text-gray-500 mr-2" onClick={toggleFilterModal} />
            
            <form onSubmit={handleSearchSubmit} className="relative ml-4">
              <Input 
                type="text" 
                placeholder="Pesquisar chamados..." 
                value={search} 
                onChange={handleSearchChange}
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
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
          
          {loading ? (
            <div className="text-center py-8">
              <p>Carregando chamados...</p>
            </div>
          ) : (
            <div className="bg-white p-6 shadow-sm rounded-md overflow-x-auto">
              {displayTickets.length > 0 ? (
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
                      <TableHead className="bg-gray-200">AÇÕES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayTickets.map((ticket) => (
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
                        <TableCell>
                          <Button 
                            onClick={() => handleShowDetails(ticket)}
                            size="sm"
                            variant="outline"
                            className="text-blue-600"
                          >
                            <Search size={16} />
                          </Button>
                        </TableCell>
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
          )}
        </div>
        
        {/* Filter modal */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Filtrar chamados</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="status" 
                        value="" 
                        checked={statusFilter === ""}
                        onChange={() => applyFilter("")}
                        className="mr-2"
                      />
                      <span>Todos</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="status" 
                        value="Novo"
                        checked={statusFilter === "Novo"}
                        onChange={() => applyFilter("Novo")}
                        className="mr-2"
                      />
                      <span>Novos</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="status" 
                        value="andamento"
                        checked={statusFilter === "andamento"}
                        onChange={() => applyFilter("andamento")}
                        className="mr-2"
                      />
                      <span>Em andamento</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setShowFilterModal(false)}>
                    Fechar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Detail modal */}
        {detailModal && selectedTicket && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Detalhes do Chamado</h2>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium">ID:</span> {selectedTicket.id}
                </div>
                <div>
                  <span className="font-medium">Título:</span> {selectedTicket.titulo}
                </div>
                <div>
                  <span className="font-medium">Descrição:</span> {selectedTicket.descricao}
                </div>
                <div>
                  <span className="font-medium">Entidade:</span> {selectedTicket.entidade}
                </div>
                <div>
                  <span className="font-medium">Tipo:</span> {selectedTicket.tipo}
                </div>
                <div>
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    selectedTicket.status.includes("andamento") 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {selectedTicket.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Categoria:</span> {selectedTicket.categoria}
                </div>
                <div>
                  <span className="font-medium">Atribuído:</span> {selectedTicket.atribuido}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={closeDetailModal}>
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
