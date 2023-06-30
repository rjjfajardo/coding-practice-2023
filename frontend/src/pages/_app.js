import Layout from "@/components/templates/Layout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SWRConfig } from "swr";
import { swrConfig } from "@/lib/swr";

export default function App({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SWRConfig value={swrConfig}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </LocalizationProvider>
  );
}
