
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MessageSquare, Plus, ArrowLeft } from "lucide-react";

const Support = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    problem: ""
  });

  const [darkMode, setDarkMode] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.problem) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Aqui poderíamos processar o envio do formulário para um sistema de suporte
    // Neste caso, vamos apenas transformar em um chamado

    // Recupera chamados existentes
    const storedTickets = localStorage.getItem('tickets');
    const existingTickets = storedTickets ? JSON.parse(storedTickets) : [];
    
    // Gera ID para o novo chamado
    const lastId = existingTickets.length > 0 
      ? parseInt(existingTickets[existingTickets.length - 1].id) 
      : 0;
    const newId = (lastId + 1).toString().padStart(3, '0');
    
    // Cria o novo chamado a partir da solicitação de suporte
    const newTicket = {
      id: newId,
      titulo: `Suporte: ${formData.name}`,
      descricao: `${formData.problem}. Contato: ${formData.email}, ${formData.contact || 'sem telefone'}.`,
      entidade: "PRODTECH SERVICES",
      tipo: "Suporte",
      status: "Novo",
      categoria: "SUPORTE",
      atribuido: "-"
    };
    
    // Adiciona o novo chamado à lista
    const updatedTickets = [...existingTickets, newTicket];
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    
    // Dispara evento para atualizar outras abas
    window.dispatchEvent(new Event('storage'));
    
    toast.success("Solicitação de suporte enviada com sucesso!");
    navigate("/");
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
          <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white">
            <MessageSquare size={20} />
            <span>Chamados</span>
          </Link>
          
          <Link to="/criar-chamado" className="flex items-center gap-2 text-white/70 hover:text-white">
            <div className="w-5 h-5 flex items-center justify-center bg-white/20 text-white rounded-sm">
              <Plus size={16} />
            </div>
            <span>Criar chamados</span>
          </Link>
          
          <div className="flex items-center gap-2 text-white">
            <span className="w-5 h-5 flex items-center justify-center rounded-sm">🎧</span>
            <span>Suporte</span>
          </div>
        </nav>
        
        <div className="mt-auto">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} />
            <span>Voltar para o home</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-end mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  value="" 
                  className="sr-only peer" 
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">CLIENTE</span>
            </div>
          </div>
        </header>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Texto de Introdução */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Bem-vindo ao nosso Suporte!</h1>
              
              <div className="space-y-4">
                <p className="text-lg">
                  Este canal é exclusivo para resolução de problemas relacionados ao nosso sistema.
                </p>
                
                <p className="text-lg">
                  Caso sua solicitação envolva questões técnicas ou serviços, por favor, utilize a opção de criação de chamados. Estamos aqui para ajudar você da melhor forma possível!
                </p>
              </div>
            </div>
            
            {/* Formulário */}
            <div className="bg-[#121328] text-white p-6 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nome:</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-100 text-black"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">E-mail:</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-100 text-black"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-white">Número de contato:</Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="bg-gray-100 text-black"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="problem" className="text-white">Descrição do problema:</Label>
                  <Textarea
                    id="problem"
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    className="h-36 resize-none bg-gray-100 text-black"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Enviar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
