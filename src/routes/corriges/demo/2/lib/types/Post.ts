export interface IReactions {
    likes: number;
    dislikes: number;
}

export interface IPost {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: IReactions;
    views: number;
}
