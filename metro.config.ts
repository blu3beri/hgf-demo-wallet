import { getDefaultConfig } from '@expo/metro-config'

const defaultConfig = getDefaultConfig(__dirname)

defaultConfig.resolver.sourceExts = ['js', 'json', 'ts', 'tsx', 'cjs']

module.exports = defaultConfig
