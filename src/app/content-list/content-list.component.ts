import { Component, OnInit, Input } from '@angular/core';
import { ContentService } from '../services/content.service';
import { MessageService } from '../services/message.service';
import { Content } from '../helper-files/content';
@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
})
export class ContentListComponent implements OnInit {
  sizeNotSelected = '';
  small = 'small';
  medium = 'medium';
  large = 'large';

  contentSearched = true;
  firstcard = 'firstcard';
  lastcard = 'lastcard';

  // list of books
  contentList: Content[] = [];

  result: any;
  filteredData: Content[] = [];

  constructor(
    private contentService: ContentService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getContentList();
  }
  getContentList() {
    this.contentService.getContent().subscribe((content) => {
      this.contentList = content;
      this.filteredData = [...this.contentList];
    });
  }


  searchContent(text: any) {
    if (text) {
      let searchtext = text;
      text = text.replace(/^\s+|\s+$/g, '');
      text = text.replace(/ +(?= )/g, '');
      text = new RegExp(text, 'gi');

      this.result = this.contentList.filter((item) => {
        let data = item.title.match(text);
        return data !== null;
      });

      if (this.result.length && this.result.length > 0) {
        this.messageService.add(
          `Content Items found with search text: ${searchtext}`
        );
      } else {
        this.messageService.add(`Content Item not found`);
      }

      this.filteredData = [...this.contentList];

      this.filteredData = this.filteredData.filter(function (
        item: any
      ) {
        let data = item.title.match(text);
        if (data) {
          item.type = item.type + ' highlightSearch';
          return item;
        } else {
          item.type = item.type.split(' ')[0];
          return item;
        }
      });
    } else {
      this.messageService.add(`Please Enter Content Title to Search`);
    }
  }

  getNewContact(event: any) {
    this.getContentList();
  }
}
