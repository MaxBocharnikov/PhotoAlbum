export class Photo {
    id: number;
    authorId: number;
    authorName: string;
    title: string;
    img: string;
    text: string;
    date: string;
    updateDate: string;
    views: number;
    likes: number;
    rating: number;
    comments: [{}];
}
