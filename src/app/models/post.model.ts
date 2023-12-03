export class Post {
    private username!: string;
    private content!: string;
    private comments!: Comment [];

    constructor(username:string, content:string){
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

