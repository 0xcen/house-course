import { AppProps } from "next/app";
import Head from "next/head";
// import { ApolloProvider } from "@apollo/client";
// import { useApollo } from "src/apollo";
import { AuthProvider } from "src/auth/useAuth";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Home sweet Home</title>
        <link
          rel="shortcut icon"
          href="/images/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
