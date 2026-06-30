'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import { navLinks } from '@/lib/nav'
import { WHATSAPP_URL } from '@/lib/constants'
import { Equador } from '@/components/marca/Equador'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 bg-marfim/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Identidade da marca */}
          <Link
            href="/"
            className="flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro rounded-sm"
          >
            <span className="font-display text-onix text-xl tracking-tight">ROMÃO</span>
            <span className="font-body uppercase tracking-joias text-xs text-onix/70">JOIAS</span>
          </Link>

          {/* Navegação desktop */}
          <nav aria-label="Principal" className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro rounded-sm px-1 pb-px',
                  isActive(href)
                    ? 'text-onix font-semibold border-b-2 border-ouro'
                    : 'text-onix hover:text-onix/70'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-ouro text-onix font-body text-sm font-medium px-4 py-2 rounded-lg hover:bg-ouro/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro focus-visible:ring-offset-2 focus-visible:ring-offset-marfim"
          >
            Falar no WhatsApp
          </a>

          {/* Hambúrguer mobile */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Abrir menu"
                    className="text-onix hover:text-onix/70 focus-visible:ring-ouro"
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>

              <SheetContent
                side="left"
                className="bg-marfim border-r border-champanhe/40 flex flex-col p-0"
              >
                <SheetHeader className="px-5 pt-5 pb-2">
                  <SheetTitle className="text-left font-normal leading-none">
                    <span className="font-display text-onix text-lg block">ROMÃO</span>
                    <span className="font-body uppercase tracking-joias text-xs text-onix/70 block mt-0.5">
                      JOIAS
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <Equador className="mx-5 w-auto" />

                <nav
                  aria-label="Menu principal"
                  className="flex flex-col gap-0.5 px-3 pt-3 flex-1"
                >
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'font-body text-base py-3 px-3 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro',
                        isActive(href)
                          ? 'text-onix font-semibold border-l-2 border-ouro pl-3 bg-ouro/5'
                          : 'text-onix hover:text-onix/70 hover:bg-ouro/5'
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>

                <div className="px-5 pb-8 pt-4">
                  <Equador className="mb-5" />
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 bg-ouro text-marfim font-body text-sm font-medium w-full py-3 rounded-lg hover:bg-ouro/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ouro"
                  >
                    Falar no WhatsApp
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
      <Equador />
    </header>
  )
}
