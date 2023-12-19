import { Post } from "./post.model";
import { User } from "./user.model";
export class Comment {
    public id:number;
    public content: string;
    public owner: string;
    public to: number;
    public likes:number;
    public ppl_which_liked: string[] = [];
    public dislikes:number;
    public ppl_which_disliked: string[] = [];
    public publishDate: Date = new Date();
    
    constructor(id:number, content: string, from: string, to: number) {
        this.content = content;
        this.owner = from;
        this.to = to;
        this.id = id;
        this.likes = 0;
        this.dislikes = 0;
        this.ppl_which_liked = [];
        this.ppl_which_disliked = [];

    }

    get Id(): number {
        return this.id;
    }
    get Content(): string {
        return this.content;
    }
    get Owner(): string {
        return this.owner;
    }
    get To(): number {
        return this.to;
    }
    get Likes(): number {
        return this.likes;
    }
    get Dislikes(): number {
        return this.dislikes;
    }
    set Id(id: number) {
        this.id = id;
    }
    set Content(content: string) {
        this.content = content;
    }
    set Owner(owner: string) {
        this.owner = owner;
    }
    set To(to: number) {
        this.to = to;
    }
    set Likes(likes: number) {
        this.likes = likes;
    }
    set Dislikes(dislikes: number) {
        this.dislikes = dislikes;
    }
}
