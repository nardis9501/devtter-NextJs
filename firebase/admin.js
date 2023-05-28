const admin = require("firebase-admin")

const serviceAccount = require("./devtter-f1bf5-firebase-admins-key.json")
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
} catch (error) {}

export const firestore = admin.firestore()
