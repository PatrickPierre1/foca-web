"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const logo = "/logo-foca.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#servicos", label: "Serviços" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-lg shadow-brand py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Foca Marketing"
            className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className={`font-bold text-xl transition-colors duration-300 ${
            isScrolled ? "text-foreground" : "text-white"
          }`}>
            Foca Marketing
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-accent ${
                isScrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button
            variant={isScrolled ? "accent" : "hero"}
            size="default"
            onClick={() => window.open("https://wa.me/5511965781953?text=Olá!%20Quero%20falar%20com%20a%20Foca!", "_blank")}
          >
            Fale com a Foca
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-foreground" : "text-white"} size={24} />
          ) : (
            <Menu className={isScrolled ? "text-foreground" : "text-white"} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
          <nav className="container flex flex-col py-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 font-medium py-2 hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="accent"
              size="lg"
              className="mt-2 w-full"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.open("https://wa.me/5511965781953?text=Olá!%20Quero%20falar%20com%20a%20Foca!", "_blank");
              }}
            >
              Fale com a Foca
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
