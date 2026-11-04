import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import {FaX } from "react-icons/fa6";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const linksPrincipais = [
  { label: "HOME", path: "/" },
  { label: "AVATAR", path: "/avatar" },
  { label: "CONTAS", path: "/contas" },
  { label: "QUEM SOMOS", path: "/quem-somos" },
  { label: "SOBRE", path: "/sobre" },
  { label: "FAQ", path: "/faq" },
  { label: "CONTATO", path: "/contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const maisRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function aoClicarFora(evento: MouseEvent) {
      if (maisRef.current && !maisRef.current.contains(evento.target as Node)) {
      }
    }

    document.addEventListener("mousedown", aoClicarFora);
    return () => document.removeEventListener("mousedown", aoClicarFora);
  }, []);

  return (
    <header className="relative z-50 flex items-center justify-between bg-background-secondary px-4 py-3 font-montserrat font-semibold text-gray-800 sm:px-6 lg:justify-around lg:px-8">
      <img className="w-16 sm:w-20 lg:w-1/10" src={Logo} alt="Logo" />

      <nav className="hidden items-center gap-6 text-base lg:flex lg:text-lg">
        {linksPrincipais.map((link) => (
          <Link key={link.path} to={link.path} className="cursor-pointer hover:text-primary">
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        {open ? <FaX className="h-7 w-7" /> : <FaBars className="h-7 w-7" />}
      </button>

      {open && (
        <nav className="absolute left-0 top-full z-50 flex max-h-[70vh] w-full flex-col items-center gap-6 overflow-y-auto bg-white py-8 text-base shadow-xl lg:hidden">
          {linksPrincipais.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className="cursor-pointer hover:text-primary"
            >
              {link.label}
            </Link>
          ))}

        </nav>
      )}
    </header>
  );}