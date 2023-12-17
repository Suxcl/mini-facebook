import { Post } from "./post.model";
import { User } from "./user.model";
export class Comment {
    public id:number;
    public content: string;
    public owner: User;
    public to: Post;
    public anwser_to_comment?: Comment;
    public likes:number = 0;
    public dislikes:number = 0;
    
    constructor(id:number, content: string, from: User, to: Post) {
        this.content = content;
        this.owner = from;
        this.to = to;
        this.id = id;
    }



}
