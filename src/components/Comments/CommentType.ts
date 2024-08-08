export interface CommentType {
    by: string,
    type?: string,
    text: string,
    id: number,
    parent?: number,
    kids?: number[],
    time?: number
}