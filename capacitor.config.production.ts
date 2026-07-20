import type { CapacitorConfig } from '@capacitor/cli';

/**
 * PRODUCTION Capacitor config for App Store submission.
 *
 * Differences from capacitor.config.ts (development):
 *  - No `server.url` → app loads bundled assets from /dist (offline-capable, App Store compliant)
 *  - No `cleartext` → enforces HTTPS only (required by Apple)
 *  - appId changed to a unique reverse-domain ID you own (REQUIRED — change before submitting)
 *
 * Usage on your Mac before archiving:
 *   cp capacitor.config.production.ts capacitor.config.ts
 *   npm run build
 *   npx cap sync ios
 *   npx cap open ios
 *   → In Xcode: Product → Archive
 */
const config: CapacitorConfig = {
  // ⚠️ CHANGE THIS to your own reverse-domain bundle ID before submitting.
  // Example: 'com.yourname.thekitchen' or 'org.thekitchen.app'
  // Must match the Bundle Identifier you set in Xcode → Signing & Capabilities.
  appId: 'com.yourname.thekitchen',
  appName: 'The Kitchen HQ',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
    scheme: 'TheKitchen',
    limitsNavigationsToAppBoundDomains: true,
    preferredContentMode: 'mobile',
  },
};

export default config;
