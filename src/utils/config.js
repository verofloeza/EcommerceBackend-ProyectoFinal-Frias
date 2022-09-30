import admin from "firebase-admin";
import serviceAccount from '../db/ecommercefrias-firebase-adminsdk-nx0e5-130db415e7.json' assert {type: "json"};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
export const config = {
    atlas: {
        strConn: `mongodb+srv://VeroFLoeza:Vfrias3001@cluster0.8t0bcmz.mongodb.net/ecommerceFrias`
    },
    firebase: {
        strConn: admin
    }
}