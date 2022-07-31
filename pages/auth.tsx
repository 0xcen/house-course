import Layout from "src/components/layout";
import FirebaseAuth from "src/components/firebaseAuth";
import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";

export default function Auth() {
  return <Layout main={<FirebaseAuth />} />;
}

// Special NextJS function that gets run on the server
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (uid) {
    // intercepts request on server and if there's a uid it redirects to homepage
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};
