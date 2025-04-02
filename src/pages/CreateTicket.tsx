
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";

const CreateTicket = () => {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({
    title: "",
    email: "",
    phone: "",
    sector: "",
    description: "",
    type: "Incidente",
    category: "REDE",
    entity: "PRODTECH SERVICES",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!ticket.title || !ticket.email || !ticket.description) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Aqui seria a integração com seu sistema de backend
    // Simulação de envio bem-sucedido
    toast.success("Chamado criado com sucesso!");
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
          <div className="flex items-center gap-2 text-white/70">
            <MessageSquare size={20} />
            <span>Chamados</span>
          </div>
          
          <div className="flex items-center gap-2 text-white font-medium">
            <span className="w-5 h-5 flex items-center justify-center bg-white text-[#121328] rounded-sm">+</span>
            <span>Criar chamados</span>
          </div>
          
          <div className="flex items-center gap-2 text-white/70">
            <span className="w-5 h-5 flex items-center justify-center rounded-sm">🎧</span>
            <span>Suporte</span>
          </div>
        </nav>
        
        <div className="mt-auto">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/70 hover:text-white"
          >
            <span>«</span>
            <span>Voltar para o home</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-end mb-8">
          <div className="flex items-center gap-2">
            <span className="font-medium">CLIENTE</span>
          </div>
        </header>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 shadow-sm rounded-md">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <h2 className="text-xl font-bold mb-4">Chamado</h2>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title" className="font-medium">
                  Título*
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={ticket.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="entity" className="font-medium">
                  Entidade
                </Label>
                <Select 
                  value={ticket.entity} 
                  onValueChange={(value) => handleSelectChange("entity", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma entidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRODTECH SERVICES">PRODTECH SERVICES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">
                  E-mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={ticket.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type" className="font-medium">
                  Tipo *
                </Label>
                <Select 
                  value={ticket.type} 
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Incidente">Incidente</SelectItem>
                    <SelectItem value="Solicitação">Solicitação</SelectItem>
                    <SelectItem value="Problema">Problema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-medium">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={ticket.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category" className="font-medium">
                  Categoria*
                </Label>
                <Select 
                  value={ticket.category} 
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REDE">REDE</SelectItem>
                    <SelectItem value="SOFTWARE">SOFTWARE</SelectItem>
                    <SelectItem value="HARDWARE">HARDWARE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sector" className="font-medium">
                  Setor
                </Label>
                <Input
                  id="sector"
                  name="sector"
                  value={ticket.sector}
                  onChange={handleChange}
                />
              </div>
              
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description" className="font-medium">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={ticket.description}
                  onChange={handleChange}
                  className="h-36 resize-none"
                  required
                />
              </div>
              
              <div className="col-span-2 flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Criar Chamado
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
