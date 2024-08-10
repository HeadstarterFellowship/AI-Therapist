import NavBar from "@/components/NavBar";
import ClientComponent from "../../components/ClientComponent";
import { fetchAccessToken } from "hume";

export default async function HumeTest() {
  const accessToken = await fetchAccessToken({
    apiKey: String(process.env.HUME_API_KEY),
    secretKey: String(process.env.HUME_SECRET_KEY),
  });

  if (!accessToken) {
    throw new Error();
  }

  const configId = String(process.env.HUME_CONFIG_ID);

  return (
        <>
        <NavBar />
      <ClientComponent accessToken={accessToken} configId={configId} />
        </>
  );
}