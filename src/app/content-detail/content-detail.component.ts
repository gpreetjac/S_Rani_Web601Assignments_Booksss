import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Content } from '../helper-files/content';
import { ContentService } from '../services/content.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {
  private routeSub: Subscription;
  public content: Content;
  constructor(private router: Router, private route: ActivatedRoute, private contentService: ContentService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(
      params => {
        if (params && params['id']) {
          this.contentService
            .getContentDetails(params['id'])
            .subscribe(
              {
                next: (content: Content) => {
                  this.content = content;
                  this.messageService.add(`${content.title} content with id: ${content.id} is retrieved `);
                },
                error: () => {
                  this.router.navigate(['/page-not-found']);
                },
              });
        } else {
          this.goToContentList();
        }
      });
  }

  goToContentList() {
    this.router.navigate(['/list']);
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
