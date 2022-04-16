import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { Content } from '../helper-files/content';
import { ContentService } from '../services/content.service';
import { MessageService } from '../services/message.service';
import { InMemoryDataService } from '../services/in-memory-data.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddContentDialogComponent } from '../add-content-dialog/add-content-dialog.component';
import { EditContentDialogComponent } from '../edit-content-dialog/edit-content-dialog.component';

@Component({
  selector: 'app-modify-content',
  templateUrl: './modify-content.component.html',
  styleUrls: ['./modify-content.component.scss'],
})
export class ModifyContentComponent implements OnInit {
  @Output() newContentEvent: EventEmitter<Content> =
    new EventEmitter<Content>();
  @Output() updatedContentEvent: EventEmitter<Content> =
    new EventEmitter<Content>();
  @Input() contentId: number;
  addDialogRef: any;
  editDialogRef: any;
  constructor(
    private contentService: ContentService,
    private messageService: MessageService,
    private inMemoryDataService: InMemoryDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  addContentToDb(content: Content): void {
    this.contentService
      .addContent(content)
      .subscribe((newContentFromServer) => {
        this.messageService.add(
          `Content Item added by id:${newContentFromServer.id}`
        );
        this.newContentEvent.emit(newContentFromServer);
        if (this.addDialogRef) {
          this.addDialogRef.close();
          this.addDialogRef = null;
        }
      });
  }

  updateContentToDb(content: Content): void {
    this.contentService.updateContent(content).subscribe(() => {
      this.messageService.add(`Content Item updated at id:${content.id}`);
      if (this.editDialogRef) {
        this.editDialogRef.close();
        this.editDialogRef = null;
      }
      this.updatedContentEvent.emit(content);
    });
  }

  addContent() {
    this.addDialogRef = this.dialog.open(AddContentDialogComponent);

    this.addDialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.event && result.event === 'Add') {
        this.contentService.getContent().subscribe((content) => {
          let id = this.inMemoryDataService.genId(content);
          result.data.id = id;
          this.addContentToDb(result.data);
        });
      }
    });
  }

  updateContent() {
    this.contentService
      .getContentDetails(this.contentId)
      .subscribe((content) => {
        this.editDialogRef = this.dialog.open(EditContentDialogComponent, {
          data: content,
        });
        this.editDialogRef.afterClosed().subscribe((result: any) => {
          if (result && result.event && result.event === 'Update') {
            this.updateContentToDb(result.data);
          }
        });
      });
  }
}
