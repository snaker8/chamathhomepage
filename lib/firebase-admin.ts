import admin from 'firebase-admin';

function getAdminApp() {
    if (!admin.apps.length) {
        try {
            if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
                throw new Error('Missing Firebase Admin environment variables (.env)');
            }

            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                }),
            });
        } catch (error) {
            console.error('Firebase admin initialization error:', error);
            return null;
        }
    }
    return admin.app();
}

export const getAdminDb = () => {
    const app = getAdminApp();
    if (!app) return null;
    return admin.firestore(app);
};

export const getAdminAuth = () => {
    const app = getAdminApp();
    if (!app) return null;
    return admin.auth(app);
};

// Keep exports for backward compatibility if possible, but they might be null
export const adminDb = getAdminDb();
export const adminAuth = getAdminAuth();
