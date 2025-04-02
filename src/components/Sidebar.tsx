
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Plus, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="w-64 bg-[#121328] text-white p-6 flex flex-col h-screen">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">ProdTech</h1>
        <p className="text-sm">services</p>
      </div>
      
      <nav className="space-y-6 flex-1">
        <Link 
          to="/" 
          className={`flex items-center gap-2 ${
            location.pathname === "/" ? "text-white" : "text-white/70 hover:text-white"
          }`}
        >
          <MessageSquare size={20} />
          <span>Chamados</span>
        </Link>
        
        <Link 
          to="/criar-chamado" 
          className={`flex items-center gap-2 ${
            location.pathname === "/criar-chamado" ? "text-white" : "text-white/70 hover:text-white"
          }`}
        >
          <div className={`w-5 h-5 flex items-center justify-center ${
            location.pathname === "/criar-chamado" ? "bg-white text-[#121328]" : "bg-white/20 text-white"
          } rounded-sm`}>
            <Plus size={16} />
          </div>
          <span>Criar chamados</span>
        </Link>
        
        <Link 
          to="/suporte" 
          className={`flex items-center gap-2 ${
            location.pathname === "/suporte" ? "text-white" : "text-white/70 hover:text-white"
          }`}
        >
          <span className="w-5 h-5 flex items-center justify-center rounded-sm">🎧</span>
          <span>Suporte</span>
        </Link>
      </nav>
      
      <button 
        className="flex items-center gap-2 text-white/70 hover:text-white mt-auto py-4"
        onClick={() => console.log("Logout functionality would go here")}
      >
        <LogOut size={20} />
        <span>Sair</span>
      </button>
    </div>
  );
};

export default Sidebar;
