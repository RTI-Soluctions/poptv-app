import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Linking } from "react-native";

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
            className="mb-6 bg-[#1c1c1e] rounded-2xl overflow-hidden border border-white/5"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 8,
            }}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Linking.openURL(item.link)}
                className="w-full bg-[#2a2a2d] justify-center items-center"
                style={{ aspectRatio: 16 / 9 }}
            >
                <Image
                    source={{ uri: item.thumbnail }}
                    className="w-full h-full absolute"
                    resizeMode="cover"
                />
                {/* Badge Vermelho de Notícia Destacada */}
                <View className="absolute top-3 left-3 bg-[#e63946] px-3 py-1 rounded-md">
                    <Text className="text-white font-bold text-xs tracking-wider">DESTAQUE</Text>
                </View>
            </TouchableOpacity>

            <View className="p-4">
                <Text className="font-bold text-lg text-white mb-3" numberOfLines={3}>
                    {item.title}
                </Text>
                <View className="flex-row">
                    <View className="bg-white/10 px-3 py-1 rounded-md border border-white/20">
                        <Text className="text-gray-300 font-semibold text-xs text-center">
                            {item.publishedAt}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View className="flex-1 w-full">
            <View className="px-5 mt-6 mb-20 w-full flex-1">
                <Text className="text-2xl font-bold text-white mb-6">Portal de Notícias</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#e63946" className="mt-10" />
                ) : (
                    <FlatList
                        data={news}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderNewsItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 40 }}
                        ListEmptyComponent={
                            <View className="flex-1 mt-10 p-5 bg-[#1c1c1e] rounded-xl border border-white/5 items-center">
                                <Text className="text-gray-400 text-center font-bold mb-2">Nenhuma notícia encontrada ⚠️</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </View>
    );
};
