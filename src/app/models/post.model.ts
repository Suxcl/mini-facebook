import { Comment } from './comment.model';
export class Post {
    private id:number;
    private username!: string;
    private content!: string;
    private comments!: Comment [];

    constructor(id:number ,username:string, content:string){
        this.id = id;
        this.username = username;
        this.content = content;
        this.comments = [];
    }

    //getters
    public get Username() : string {
        return this.username;
    }

    public get Content() : string {
        return this.content;
    }

    public get Id(): number{
      return this.id;
    }

    public get Comments(): Comment[]{
      return this.comments;
    }

    //setters

    public set Username(v : string) {
        this.username = v;
    }

    public set Content(v : string) {
        this.content = v;
    }

    //comment
    getComment(ind:number):Comment{
        return this.comments[ind];
    }

    addComment(comment:Comment){
        this.comments.push(comment);
    }
}

