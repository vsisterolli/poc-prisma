type Anime = {
    id: number,
    name: string,
    image: string, 
    status: string,
    user_id: number
};

type AnimeInstance = Partial<Anime>;

export {
    Anime,
    AnimeInstance
};