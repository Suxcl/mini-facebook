import { Comment } from './comment.model';
export class Post {
    private id:number;
    private username!: string;
    private content!: string;
    private comments!: Comment [];
    private comments_count:number = 0;
    private likes:number = 0;
    private dislikes:number = 0;
    private img: string[] = [];
    private publishDate: Date = new Date();



    public constructor(id:number ,username:string, content:string){
        this.id = id;
        this.username = username;
        this.content = content;
        this.comments = [];
        this.comments_count = this.comments.length;
        this.likes = 0;
        this.dislikes = 0;
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
}

