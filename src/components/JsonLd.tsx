import { site } from "@/config/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    description: site.seo.description,
    email: site.contact.email,
    areaServed: "BR",
    slogan: site.tagline,
    serviceType: "Implantação e crescimento de vendas pela internet",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
