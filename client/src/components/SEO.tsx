import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { client, urlFor } from "@/lib/sanity";

interface SiteSettings {
  title: string;
  description: string;
  ogImage: any;
}

export function SEO() {
  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const result = await client.fetch(`*[_type == "siteSettings"][0]`);
      return result;
    },
  });

  const title = settings?.title || "Mustarred - Turn complexity into confidence and scale faster";
  const description = settings?.description || "Turn complexity into confidence and scale faster with a trusted partner. Get expert guidance for data protection, regulatory compliance, corporate governance, and transaction advisory services.";
  const ogImage = settings?.ogImage ? urlFor(settings.ogImage).url() : "/assets/brand/logo-rounded.png";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
    </Helmet>
  );
}
