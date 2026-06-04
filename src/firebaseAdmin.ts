import admin from "firebase-admin";
import fs from "fs";
import path from "path";

type ServiceAccount = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

const getFirebaseAdmin = () => {
  if (admin.apps.length) {
    return admin;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const serviceAccountPath =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    path.resolve(__dirname, "..", "firebase_creds.json");
  const databaseURL = process.env.FIREBASE_DATABASE_URL;

  let resolvedProjectId = projectId;
  let resolvedClientEmail = clientEmail;
  let resolvedPrivateKey = privateKey;

  if (!resolvedProjectId || !resolvedClientEmail || !resolvedPrivateKey) {
    if (!fs.existsSync(serviceAccountPath)) {
      throw new Error(
        "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY or provide firebase_creds.json."
      );
    }
    const serviceAccount = JSON.parse(
      fs.readFileSync(serviceAccountPath, "utf-8")
    ) as ServiceAccount;
    resolvedProjectId = serviceAccount.project_id;
    resolvedClientEmail = serviceAccount.client_email;
    resolvedPrivateKey = serviceAccount.private_key?.replace(/\\n/g, "\n");
  }

  if (!resolvedProjectId || !resolvedClientEmail || !resolvedPrivateKey) {
    throw new Error("Firebase Admin credentials are incomplete.");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: resolvedProjectId,
      clientEmail: resolvedClientEmail,
      privateKey: resolvedPrivateKey,
    }),
    databaseURL,
  });

  return admin;
};

export { getFirebaseAdmin };
