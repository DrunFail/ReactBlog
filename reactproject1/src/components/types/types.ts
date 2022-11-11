export interface Post {
    id: number,
    title: string,
    body: string
}

export interface Comment {
    body: string,
    email: string,
    id: number,
    postId: number
}