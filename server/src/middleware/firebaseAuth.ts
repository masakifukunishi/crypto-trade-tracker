import admin from "firebase-admin";
import config from "../config/index.js";
import { Request, Response, NextFunction } from "express";

const serviceAccount = {
  projectId: config.FIREBASE_PROJECT_ID,
  privateKeyId: config.FIREBASE_PRIVATE_KEY_ID,
  privateKey: config.FIREBASE_PRIVATE_KEY,
  clientEmail: config.FIREBASE_CLIENT_EMAIL,
  clientId: config.FIREBASE_CLIENT_ID,
  authUri: config.FIREBASE_AUTH_URI,
  tokenUri: config.FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: config.FIREBASE_AUTH_CERT_URL,
  clientC509CertUrl: config.FIREBASE_CLIENT_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

declare global {
  namespace Express {
    interface Request {
      user: admin.auth.DecodedIdToken;
    }
  }
}

const firebaseAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default firebaseAuthMiddleware;
