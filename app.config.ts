import { ExpoConfig } from '@expo/config-types'

const config: ExpoConfig = {
  name: 'Demo Wallet',
  owner: "hgf-workshop",
  slug: 'demo-wallet-hyperledger',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  plugins: ['@animo-id/indy-sdk-expo-plugin'],
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'demo.wallet.hyperledger',
    infoPlist: {
      NSCameraUsageDescription:
        'This app uses the camera to scan invitations.',
    },
  },
  android: {
    permissions: ['CAMERA'],
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'demo.wallet.hyperledger',
  },
  web: {
    favicon: './assets/favicon.png',
  },
}

export default config
