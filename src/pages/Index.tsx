import Layout from "@/components/Layout";
import PortfolioHome from "@/components/PortfolioHome";
import { Helmet } from "react-helmet-async";

export default function Index() {
  return <Layout>
    <Helmet>
      <title>Lucas Evangelista — Designer</title>
      <meta name="description" content="Design que posiciona sua marca. Identidades visuais, conteúdo e sites por Lucas Evangelista." />
    </Helmet>
    <PortfolioHome />
  </Layout>;
}
