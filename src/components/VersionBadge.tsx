import * as Application from 'expo-application';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';
import app from '../../app.json';
import { getVersionBadge } from '../domain/version';

export function VersionBadge() {
  const badge = getVersionBadge({
    sourceVersion: app.expo.version,
    nativeVersion: Application.nativeApplicationVersion,
    nativeBuildVersion: Application.nativeBuildVersion,
    isPreview: __DEV__ || Constants.executionEnvironment === ExecutionEnvironment.StoreClient,
    buildMetadata: Constants.expoConfig?.extra?.shellBuild,
  });

  // A fixed native row above the toolbar/WebView: no scroll, overlap or injected web badge.
  return <View accessible accessibilityLabel={`${badge.title}. ${badge.updated}`} style={styles.badge}>
    <Text style={styles.version}>{badge.title}</Text>
    <Text style={styles.updated}>{badge.updated}</Text>
  </View>;
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'stretch', alignItems: 'flex-start', flexShrink: 0, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#f5f7f9' },
  version: { color: '#19222b', fontSize: 12, fontWeight: '600', textAlign: 'left' },
  updated: { color: '#253f58', fontSize: 12, textAlign: 'left' },
});
