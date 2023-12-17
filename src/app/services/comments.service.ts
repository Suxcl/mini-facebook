import { Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  public refreshComments$: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }
}
