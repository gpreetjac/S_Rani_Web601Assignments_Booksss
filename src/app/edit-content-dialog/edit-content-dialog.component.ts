import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Content } from '../helper-files/content';


@Component({
  selector: 'app-edit-content-dialog',
  templateUrl: './edit-content-dialog.component.html',
  styleUrls: ['./edit-content-dialog.component.scss']
})
export class EditContentDialogComponent implements OnInit {

  public contentForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public contentData: Content) {
    this.buildContentForm();
  }

  ngOnInit(): void {
    let tags = "";
    if (this.contentData.tags) {
      tags = this.contentData.tags.join(',')
    }
    this.contentForm.setValue({
      title: this.contentData.title,
      description: this.contentData.description,
      prize: this.contentData.prize,
      imgURL: this.contentData.imgURL,
      type: this.contentData.type,
      tags: tags
    });
  }

  buildContentForm() {
    this.contentForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      prize: ['', Validators.required],
      imgURL: ['', Validators.required],
      type: ['', Validators.required],
      tags: ['', Validators.required]
    })
  }

  updateContent(formValues: any): void {
    let newContent = {
      id: this.contentData.id,
      title: formValues.title,
      description: formValues.description,
      prize: formValues.prize,
      imgURL: formValues.imgURL,
      type: formValues.type,
      tags: formValues.tags.split(','),
    };
    this.dialogRef.close({ data: newContent, event: "Update" });
    this.resetFormValues();
  }

  resetFormValues() {
    this.contentForm.reset();
  }

  onCloseClick(): void {
    this.dialogRef.close({ event: "Cancel" });
  }
}
