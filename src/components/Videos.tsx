import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Linking } from "react-native";

// Coloque exatamente o CHANNEL ID do seu canal (que costuma começar com as letras "UC") 
// Não confunda com o '@' alias da URL.
const CHANNEL_ID = "UC37k2Ty6Ex4qzJwJKnxXoHA";

type VideoItem = {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
    link: string;
};

export const Videos = () => {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchYouTubeVideos = async () => {
            try {
                // Conversão do sinal RSS do Youtube para JSON nativo via intermediário gratuito
                const response = await fetch(
                    `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
                );
                const data = await response.json();

                if (data.status === "ok" && data.items) {
                    const items = data.items.map((item: any) => {
                        // Tenta primeiro capturar o ID puro que o YouTube entrega no `guid` (yt:video:ID)
                        let videoId = item.guid?.includes("yt:video:")
                            ? item.guid.replace("yt:video:", "")
                            : "";

                        // Caso seja um feed incomum, varre diretamente no link (v=, shorts/ ou youtu.be/)
                        if (!videoId && item.link) {
                            const match = item.link.match(/(?:v=|shorts\/|youtu\.be\/)([\w-]{11})/);
                            videoId = match ? match[1] : item.guid;
                        }

                        return {
                            id: videoId || item.link || String(Math.random()),
                            title: item.title,
                            thumbnail: item.thumbnail,
                            publishedAt: new Date(item.pubDate).toLocaleDateString("pt-BR"),
                            link: item.link,
                        };
                    });
                    setVideos(items);
                }
            } catch (error) {
                console.error("Erro ao buscar vídeos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchYouTubeVideos();
    }, []);

    const renderVideo = ({ item }: { item: VideoItem }) => {
        return (
            <View
                style={styles.card}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    // Acessa nativamente o aplicativo do Youtube passando a URL
                    onPress={() => Linking.openURL(item.link)}
                    style={styles.thumbnailContainer}
                >
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={styles.thumbnail}
                        resizeMode="cover"
                    />
                    {/* Overlay Escuro com Ícone de Play para indicar ser clicável */}
                    <View style={styles.playButton}>
                        <Text style={styles.playIcon}>▶</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle} numberOfLines={2}>
                        {item.title}
                    </Text>
                    <View style={styles.metadata}>
                        <View style={styles.dateBadge}>
                            <Text style={styles.dateLabel}>
                                {item.publishedAt}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Últimos Vídeos</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#1bafff" style={styles.loading} />
                ) : (
                    <FlatList
                        data={videos}
                        keyExtractor={(item, index) => item.id + index.toString()}
                        renderItem={renderVideo}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyTitle}>Canal não configurado ⚠️</Text>
                                <Text style={styles.emptyDescription}>
                                    Substitua a variável CHANNEL_ID no código pelo código da sua página.
                                </Text>
                            </View>
                        }
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 40,
  },
  card: {
    marginBottom: 32,
    backgroundColor: "#1c1c1e",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8
  },
  thumbnailContainer: {
    width: "100%",
    backgroundColor: "#2a2a2d",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 16 / 9
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  playButton: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: 64,
    height: 64,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
  playIcon: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    marginLeft: 4
  },
  cardContent: {
    padding: 16
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 28,
    color: "#ffffff",
    marginBottom: 12
  },
  metadata: {
    flexDirection: "row"
  },
  dateBadge: {
    backgroundColor: "rgba(27, 175, 255, 0.2)",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(27, 175, 255, 0.3)"
  },
  dateLabel: {
    color: "#1bafff",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center"
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    width: "100%"
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 24,
    marginBottom: 80,
    width: "100%",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%"
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 24
  },
  loading: {
    marginTop: 40
  },
  emptyState: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
    marginTop: 40,
    padding: 20,
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center"
  },
  emptyTitle: {
    color: "#9ca3af",
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 8
  },
  emptyDescription: {
    color: "#6b7280",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20
  }
});
