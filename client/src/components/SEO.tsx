import { Helmet } from "react-helmet-async";

const title = "Mustarred - Turn complexity into confidence and scale faster";
const description = "Turn complexity into confidence and scale faster with a trusted partner. Get expert guidance for data protection, regulatory compliance, corporate governance, and transaction advisory services.";
const ogImage = "/assets/brand/logo.png";

export function SEO() {
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
