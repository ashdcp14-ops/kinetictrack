import { View } from 'react-native';
import { getYouTubeEmbedUrl } from '../utils/youtube';

export default function VideoPlayer({ videoUrl }) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (!embedUrl) {
    return null;
  }

  return (
    <View
      style={{
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#000',
        marginBottom: 16,
      }}
    >
      <iframe
        src={embedUrl}
        title="Exercise demo video"
        style={{ width: '100%', height: '100%', border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </View>
  );
}
