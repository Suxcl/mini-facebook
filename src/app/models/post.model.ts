import { Comment } from './comment.model';

export class Post {
    private id:number;
    private username!: string;
    private content!: string;
    private comments!: Comment [];
    private comments_count:number = 0;
    private likes:number = 0;
    private ppl_who_like:string[] = [];
    private dislikes:number = 0;
    private ppl_who_dislike:string[] = [];
    private img: string[] = [];
    private publishDate: Date = new Date();

    public constructor(id:number ,username:string, content:string){
        this.id = id;
        this.username = username;
        this.content = content;
        this.comments = [];
        this.comments_count = this.comments.length;
        this.likes = 0;
        this.ppl_who_like = [];
        this.dislikes = 0;
        this.ppl_who_dislike = [];
        this.img = [];
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

    public get Likes(): number{
      return this.likes;
    }

    public get Dislikes():number{
      return this.dislikes;
    }

    public get CommentsCount():number{
      return this.comments_count;
    }

    public get PublishDate():Date{
      return this.publishDate;
    }

    //setters

    public set Username(v : string) {
        this.username = v;
    }

    public set Content(v : string) {
        this.content = v;
    }
    public set Id(v : number){
        this.id = v;
    }

    //comment
    getComment(ind:number):Comment{
        return this.comments[ind];
    }

    addComment(comment:Comment){
        this.comments.push(comment);
    }

    removeComment(ind:number){
        this.comments.splice(ind,1);
    }
    //likes
    like(u:string){
        this.ppl_who_like.push(u);
        this.likes++;
    }
    unlike(u:string){
        this.ppl_who_like.splice(this.ppl_who_like.indexOf(u),1);
        this.likes--;
    }

    dislike(u:string){
        this.ppl_who_dislike.push(u);
        this.dislikes++;
    }
    undislike(u:string){
        this.ppl_who_like.splice(this.ppl_who_like.indexOf(u),1);
        this.dislikes--;
    }
}

