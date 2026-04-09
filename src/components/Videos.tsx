import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Linking } from "react-native";

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
                className="mb-8 bg-[#1c1c1e] rounded-2xl overflow-hidden border border-white/5"
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
                    // Acessa nativamente o aplicativo do Youtube passando a URL
                    onPress={() => Linking.openURL(item.link)}
                    className="w-full bg-[#2a2a2d] justify-center items-center"
                    style={{ aspectRatio: 16 / 9 }}
                >
                    <Image
                        source={{ uri: item.thumbnail }}
                        className="w-full h-full absolute"
                        resizeMode="cover"
                    />
                    {/* Overlay Escuro com Ícone de Play para indicar ser clicável */}
                    <View className="bg-black/60 w-16 h-16 rounded-full justify-center items-center border border-white/20">
                        <Text className="text-white text-2xl font-bold ml-1">▶</Text>
                    </View>
                </TouchableOpacity>

                <View className="p-4">
                    <Text className="font-bold text-lg text-white mb-3" numberOfLines={2}>
                        {item.title}
                    </Text>
                    <View className="flex-row">
                        <View className="bg-[#1bafff]/20 px-3 py-1 rounded-md border border-[#1bafff]/30">
                            <Text className="text-[#1bafff] font-semibold text-xs text-center">
                                {item.publishedAt}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View className="flex-1 w-full">
            <View className="px-5 mt-6 mb-20 w-full flex-1">
                <Text className="text-2xl font-bold text-white mb-6">Últimos Vídeos</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#1bafff" className="mt-10" />
                ) : (
                    <FlatList
                        data={videos}
                        keyExtractor={(item, index) => item.id + index.toString()}
                        renderItem={renderVideo}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 40 }}
                        ListEmptyComponent={
                            <View className="flex-1 mt-10 p-5 bg-[#1c1c1e] rounded-xl border border-white/5 items-center">
                                <Text className="text-gray-400 text-center font-bold mb-2">Canal não configurado ⚠️</Text>
                                <Text className="text-gray-500 text-center text-sm">
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
