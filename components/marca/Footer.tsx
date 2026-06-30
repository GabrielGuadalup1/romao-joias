import Image from 'next/image'
import Link from 'next/link'
import { Equador } from '@/components/marca/Equador'
import { navLinks } from '@/lib/nav'
import { WHATSAPP_URL } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-onix text-marfim">
      <Equador />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Coluna 1 — Identidade da marca */}
          <div className="flex flex-col gap-3">
            <Image
              src="/logo-escura.png"
              alt="Romão Joias — desde 1962"
              width={760}
              height={760}
              className="h-16 w-16"
            />
            <div className="leading-none">
              <p className="font-display text-marfim text-2xl tracking-tight">ROMÃO</p>
              <p className="font-body uppercase tracking-joias text-xs text-champanhe mt-1">
                JOIAS
              </p>
            </div>
            <p className="font-body text-sm text-pedra leading-relaxed mt-2">
              Tradição de família em ouro.
            </p>
            <p className="font-body text-xs text-pedra tracking-widest uppercase mt-1">
              Aliança · Joias · Relógios.
            </p>
          </div>

          {/* Coluna 2 — Navegação */}
          <nav aria-label="Rodapé">
            <p className="font-body uppercase tracking-eyebrow text-xs text-champanhe mb-5">
              Navegação
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-marfim/75 hover:text-champanhe transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coluna 3 — Contato */}
          <div>
            <p className="font-body uppercase tracking-eyebrow text-xs text-champanhe mb-5">
              Contato
            </p>
            <address className="not-italic flex flex-col gap-3">
              <p className="font-body text-sm text-marfim/75 leading-relaxed">
                {/* PLACEHOLDER — substituir pelo endereço real */}
                [ENDEREÇO AQUI]
              </p>
              <p className="font-body text-sm text-marfim/75">
                {/* PLACEHOLDER — substituir pelo horário de funcionamento */}
                [HORÁRIO AQUI]
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-champanhe hover:text-ouro transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro rounded-sm inline-block"
              >
                Falar no WhatsApp
              </a>
            </address>
          </div>

        </div>
      </div>

      {/* Linha final */}
      <div className="border-t border-marfim/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="font-body text-xs text-pedra text-center">
            © 1962–2026 ROMÃO JOIAS · Macapá–AP
          </p>
        </div>
      </div>
    </footer>
  )
}
