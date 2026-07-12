import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { getYouTubeEmbedUrl } from '../utils/youtube';
import { RADIUS, SPACING } from '../utils/theme';

export default function VideoPlayer({ videoUrl }) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (!embedUrl) {
    return null;
  }

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: embedUrl }}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: SPACING.lg,
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
});
