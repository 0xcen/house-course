import * as admin from "firebase-admin";
import { NextApiRequest } from "next";

export const verifyIdToken = async (token: string) => {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Check if app has been initialized
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
      }),
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(() => null);
};

export const loadIdToken = async (
  req: NextApiRequest
): Promise<string | null> => {
  if (!req.cookies.token) return null;
  else {
    const decoded = await verifyIdToken(req.cookies.token);

    if (!decoded) return null;
    else {
      return decoded.uid;
    }
  }
};
