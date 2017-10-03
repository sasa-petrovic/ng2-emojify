import {Directive, Input, ElementRef} from '@angular/core';
import {MenuDataService} from "./services/menu-data.service";

@Directive({
  selector: '[emotion-menu]',
  host: {'(click)': 'onMouseClick($event)'}
})
export class EmotionMenuDirective {

  @Input('emotion-menu') emotionMenu: any = {};

  constructor(private menuDataService: MenuDataService,
              private _elementRef: ElementRef) {
  }


  ngAfterContentInit() {

    let customData: any = {};
    customData.customEmotionMenuCss = this.emotionMenu.customEmotionMenuCss || null;
    customData.customEmotionContainerCss = this.emotionMenu.customEmotionContainerCss || null;
    customData.customEmotionImageCss = this.emotionMenu.customEmotionImageCss || null;
    customData.directiveHostElementId = this._elementRef.nativeElement.id || null;

    this.menuDataService.SetCustomData(customData);
  }

  onMouseClick(event) {
    event.preventDefault();
    if (event.target.id === this._elementRef.nativeElement.id) {
      const emojiMenu = event.target.parentElement.getElementsByClassName('app-emogi-menu')[0];
      emojiMenu.style.display = 'block';
      let height = Number(emojiMenu.style.height.replace('px', ''));
      let mouseLocation = {
        left: event.clientX,
        top: event.clientY - height
      };
      this.menuDataService.menu.next({mouseLocation: mouseLocation});
    }
  }

}
