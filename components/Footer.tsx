import { Instagram, Linkedin } from "lucide-react";

const logo = "/logo-foca.png";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/focamarketing/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
  ];

  const footerLinks = [
    {
      title: "Serviços",
      links: ["Tráfego Pago", "Design Gráfico", "Copywriting", "Automação", "Desenvolvimento"],
    },
    {
      title: "Empresa",
      links: ["Sobre nós", "Cases", "Blog", "Carreiras"],
    },
    {
      title: "Legal",
      links: ["Privacidade", "Termos de uso"],
    },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Foca Marketing" className="h-20 w-20 object-contain" />
              <span className="font-bold text-2xl">Foca Marketing</span>
            </div>
            <p className="text-white/70 mb-6 max-w-sm">
              Agência de marketing digital completa. Do tráfego ao design, da copy ao código. 
              Tudo que você precisa para crescer.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-bold text-lg mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <p className="text-white/60 text-sm text-center">
            © {new Date().getFullYear()} Foca Marketing. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
