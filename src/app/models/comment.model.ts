import { Post } from "./post.model";
import { User } from "./user.model";
export class Comment {
    public id:number;
    public content: string;
    public owner: User;
    public to: Post;
    public likes:number;
    public ppl_which_liked: string[] = [];
    public dislikes:number;
    public ppl_which_disliked: string[] = [];
    
    constructor(id:number, content: string, from: User, to: Post) {
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
    get Owner(): User {
        return this.owner;
    }
    get To(): Post {
        return this.to;
    }
    get Likes(): number {
        return this.likes;
    }
    get Dislikes(): number {
        return this.dislikes;
    }

}
