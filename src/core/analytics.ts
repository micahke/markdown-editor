import { initializeApp, setLogLevel } from "firebase/app";
import {
  Analytics,
  getAnalytics,
  isSupported,
  logEvent,
} from "firebase/analytics";

const runtime = process.env.NEXT_PUBLIC_RUNTIME as string;

// silence warnings on prod to hide console output
if (runtime === "prod") {
  setLogLevel("silent");
}

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_MSG_ID as string,
  appId: process.env.NEXT_PUBLIC_APP_ID as string,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID as string,
};

const app = initializeApp(config);
let analytics = <Analytics | null>null;

isSupported().then((result) => {
  if (result) analytics = getAnalytics(app);
});

export function trackEvent(event: string) {
  if (analytics && runtime === "prod") {
    console.log(event);
    logEvent(analytics, event);
  }
}
