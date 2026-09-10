import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Linking } from "react-native";

type NewsItem = {
    id: number;
    title: string;
    thumbnail: string;
    publishedAt: string;
    link: string;
};

export const News = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Endpoint WP do portalPOA24Horas puxando a categoria Destaques (38280) e as imagens embedded
                const response = await fetch(
                    "https://poa24horas.com.br/wp-json/wp/v2/posts?categories=38280&_embed&per_page=12"
                );
                const data = await response.json();

                const formattedNews = data.map((post: any) => {
                    const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/400x200?text=Sem+Imagem";

                    // Limpeza de entidades HTML no titulo do WordPress
                    let cleanTitle = post.title.rendered;
                    cleanTitle = cleanTitle.replace(/&#8211;/g, "-").replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&amp;/g, "&");

                    return {
                        id: post.id,
                        title: cleanTitle,
                        thumbnail: imageUrl,
                        publishedAt: new Date(post.date).toLocaleDateString("pt-BR"),
                        link: post.link,
                    };
                });

                setNews(formattedNews);
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const renderNewsItem = ({ item }: { item: NewsItem }) => (
        <View
            style={styles.card}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Linking.openURL(item.link)}
                style={styles.thumbnailContainer}
            >
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                />
                {/* Badge Vermelho de Notícia Destacada */}
                <View style={styles.badge}>
                    <Text style={styles.badgeLabel}>DESTAQUE</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={3}>
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

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Portal de Notícias</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#1bafff" style={styles.loading} />
                ) : (
                    <FlatList
                        data={news}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderNewsItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyTitle}>Nenhuma notícia encontrada ⚠️</Text>
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
    marginBottom: 24,
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
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#e63946",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 6
  },
  badgeLabel: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
  dateLabel: {
    color: "#d1d5db",
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
  }
});
