import { useRef, useState } from 'react';
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { canNavigate, SITE_URL } from '../domain/navigation';

export default function Wardrobe() {
  const web = useRef<WebView>(null);
  const [back, setBack] = useState(false);
  const [failed, setFailed] = useState(false);
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [generation, setGeneration] = useState(0);
  function retry() { setFailed(false); setNotice(''); setLoading(true); setGeneration(value => value + 1); }
  function blocked() { setNotice('Bu giriş yöntemi yeni pencere veya farklı bir sağlayıcı gerektiriyor. E-posta ya da telefonla girişi dene. Tarayıcıda devam edersen oturum uygulamaya aktarılmaz.'); }
  async function openBrowser() {
    try { await Linking.openURL(SITE_URL); }
    catch { setNotice('Tarayıcı açılamadı. Lütfen yeniden dene.'); }
  }
  return <SafeAreaView style={s.screen} edges={['top', 'bottom']}>
    <View style={s.toolbar}>
      <Pressable accessibilityRole="button" accessibilityLabel="Geri" accessibilityState={{ disabled: !back }} disabled={!back} onPress={() => web.current?.goBack()} style={s.button}><Text style={!back && s.disabled}>Geri</Text></Pressable>
      <Text style={s.title}>Wardrobe</Text>
      <Pressable accessibilityRole="button" onPress={retry} style={s.button}><Text>Yenile</Text></Pressable>
    </View>
    <View style={s.hint}><Text style={s.small}>iPhone giriş testi · Mevcut gardırobun güvenli giriş sayfası. E-posta veya telefonla giriş yap.</Text></View>
    {!!notice && <View style={s.hint}><Text accessibilityRole="alert" style={s.small}>{notice}</Text><Pressable accessibilityRole="button" onPress={() => setNotice('')} style={s.button}><Text>Kapat</Text></Pressable></View>}
    {failed ? <View style={s.error}><Text>Gardırop yüklenemedi. Bağlantını kontrol edip yeniden dene.</Text><Pressable accessibilityRole="button" onPress={retry} style={s.button}><Text>Yeniden dene</Text></Pressable></View> : <WebView
      key={generation}
      ref={web}
      source={{ uri: SITE_URL }}
      originWhitelist={['*']}
      onShouldStartLoadWithRequest={request => { const allowed = canNavigate(request.url); if (!allowed) blocked(); return allowed; }}
      onOpenWindow={blocked}
      onNavigationStateChange={state => setBack(state.canGoBack)}
      onLoadStart={() => setLoading(true)}
      onLoadEnd={() => setLoading(false)}
      onError={() => { setFailed(true); setLoading(false); }}
      onHttpError={event => { if (event.nativeEvent.statusCode >= 500) { setFailed(true); setLoading(false); } }}
      onContentProcessDidTerminate={retry}
      allowsBackForwardNavigationGestures
      sharedCookiesEnabled={false}
      thirdPartyCookiesEnabled={false}
      style={s.web}
    />}
    {loading && !failed && <ActivityIndicator accessibilityLabel="Gardırop yükleniyor" style={s.loading} />}
    <Pressable accessibilityRole="button" onPress={openBrowser} style={s.browser}><Text style={s.small}>Tarayıcıda aç</Text></Pressable>
  </SafeAreaView>;
}
const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' }, toolbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#e0e4e8' },
  title: { fontSize: 18, fontWeight: '600', color: '#19222b' }, button: { minHeight: 44, padding: 12, alignItems: 'center', justifyContent: 'center' }, disabled: { opacity: 0.35 },
  hint: { padding: 10, backgroundColor: '#eef3f7' }, small: { fontSize: 14, lineHeight: 20, color: '#253f58' }, web: { flex: 1 },
  error: { flex: 1, padding: 24, justifyContent: 'center', gap: 16 }, loading: { position: 'absolute', top: '50%', alignSelf: 'center' }, browser: { minHeight: 44, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#e0e4e8' },
});
