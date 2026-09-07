import { Logo } from "@/components/ui/Logo";
import { site, whatsappUrl } from "@/config/site";

export function Footer() {
  return (
    <footer id="contato" className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Implantação e crescimento de vendas pela internet.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Navegação</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Contato</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <a href={whatsappUrl()} className="hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={site.contact.instagram} className="hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45 md:px-8">
        © {new Date().getFullYear()} Growloja. Todos os direitos reservados.
      </div>
    </footer>
  );
}
