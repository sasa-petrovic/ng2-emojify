import { Component, Input, OnInit, Renderer } from '@angular/core';
import {EmotionService} from "./services/emotion.service";
import {MenuDataService} from "./services/menu-data.service";
import {CustomEmotionService} from "./services/custom-emotion.service";
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'emoji-menu',
  templateUrl: './ng2-emojify.component.html',
  styleUrls: ['./ng2-emojify.component.css']
})
export class Ng2EmojifyComponent implements OnInit {

  targetId: string;
  private mouseLocation: {left: number, top: number} = {left: 0, top: 0};
  images: any = [];

  @Input() chatType: string;


  /* ***********************************************
   * Custom css variables
   * *********************************************** */
  customEmotionMenuCss: any;
  customEmotionContainerCss: any;
  customEmotionImageCss: any;

  /* ***********************************************
   * Default css declarations
   * *********************************************** */
  defaultDisplayCss: any = {
    position: 'fixed',
    display: 'none',
    left: '0px',
    top: '0px',
    width: 200 + 'px',
    height: 200 + 'px',
    border: '1px solid blue',
    'background-color': 'white',
    'border-radius': '0px',
    'z-index': 999,
    'overflow-x': 'hidden'
  };

  defaultEmotionContainerCss: any = {
    float: 'left',
    width: 20 + 'px',
    height: 20 + 'px',
    margin: '5px',
  };

  defaultEmotionImageCss: any = {
    width: '100%',
    height: '100%',
    margin: '0px'
  };

  constructor(private menuDataService: MenuDataService,
              private emotionService: EmotionService,
              private customEmotionService: CustomEmotionService,
              private renderer: Renderer) {
    /* ***********************************************
     * Setting image content to display in menu
     * *********************************************** */

    this.images = this.customEmotionService.GetEmotions();
  }


  ngOnInit() {


    /* ***************************************************
     * Sets Custom css and target Id
     * *************************************************** */
    this.menuDataService.GetCustomData().subscribe((customData: any) => {
      this.customEmotionMenuCss = customData.customEmotionMenuCss;
      this.customEmotionContainerCss = customData.customEmotionContainerCss;
      this.customEmotionImageCss = customData.customEmotionImageCss;
      this.targetId = customData.directiveHostElementId;
    });

    this.menuDataService.menu.subscribe(mouseLocation => {
      this.mouseLocation = mouseLocation.mouseLocation;
    });

    this.renderer.listenGlobal('document', 'click', (event) => {
      const emojiMenu = document.getElementsByClassName('app-emogi-menu') as HTMLCollectionOf<HTMLElement>;
      if ( this.targetId && event.target.id !== this.targetId && event.target.className !== 'app-emogi-image' && emojiMenu) {

        for (var i = 0; i < emojiMenu.length; i++){
          emojiMenu[i].style.display = 'none';
        }
      }
    });
  }

  /* **************************************************************************************
   * Methods definitions
   * ************************************************************************************** */

  setImageInformation(imageInfo: any, event): void {

    if(!this.chatType) {
      this.chatType = '';
    }

    this.emotionService.SetEmotionInformation(imageInfo, this.chatType);

    // this.messageInputValue += imageInfo.emojiId;

    /*const formElement = this.findParentBySelector(event.target, 'form');

    if (formElement) {
      const input = formElement.getElementsByTagName('input')[0];

      input.value = input.value + ' ' + imageInfo.emojiId + ' ';
    }*/
  }

  findParentBySelector(elm, selector) {
    const all = document.querySelectorAll(selector);
    let cur = elm.parentNode;
    while(cur && !this.collectionHas(all, cur)) { //keep going up until you find a match
      cur = cur.parentNode; //go up
    }
    return cur; //will return null if not found
  }
  collectionHas(a, b) { //helper function (see below)
    for(var i = 0, len = a.length; i < len; i ++) {
      if(a[i] == b) return true;
    }
    return false;
  }



  get emotionMenuCss() {
    if (this.customEmotionMenuCss) {
      this.customEmotionMenuCss.left = this.mouseLocation.left + 'px';
      this.customEmotionMenuCss.top = this.mouseLocation.top + 'px';
      this.customEmotionMenuCss.display = 'none';
    } else {
      this.defaultDisplayCss.left = this.mouseLocation.left + 'px';
      this.defaultDisplayCss.top = this.mouseLocation.top + 'px';
    }
    return (this.customEmotionMenuCss || this.defaultDisplayCss);
  }

  get emotionContainerCss() {
    return (this.customEmotionContainerCss || this.defaultEmotionContainerCss);
  }

  get emotionImageCss() {
    return (this.customEmotionImageCss || this.defaultEmotionImageCss);
  }

}
