import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmotionService {
  private emotionInformation: any;
  private subject: Subject<any> = new Subject<any>();

  constructor() {
  }

  SetEmotionInformation(emotionInformation: any, chatType: string): void {
    this.emotionInformation = ' ' + emotionInformation.emojiId + ' ';

    let data = {
      chatType: chatType,
      emotionInformation: this.emotionInformation
    }

    this.subject.next(data);
  }

  CaptureEmojiClick(): Observable<any> {
    return this.subject.asObservable();
  }

}
