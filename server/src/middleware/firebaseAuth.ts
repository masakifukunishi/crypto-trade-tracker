import admin from "firebase-admin";
import config from "../config/index.js";
import { Request, Response, NextFunction } from "express";

const serviceAccount: any = {
  project_id: config.FIREBASE_PROJECT_ID,
  private_key_id: config.FIREBASE_PRIVATE_KEY_ID,
  private_key: config.FIREBASE_PRIVATE_KEY,
  client_email: config.FIREBASE_CLIENT_EMAIL,
  client_id: config.FIREBASE_CLIENT_ID,
  auth_uri: config.FIREBASE_AUTH_URI,
  token_uri: config.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: config.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: config.FIREBASE_CLIENT_CERT_URL,
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
    console.log(111);
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default firebaseAuthMiddleware;
