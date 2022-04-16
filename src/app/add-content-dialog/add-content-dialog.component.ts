import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-content-dialog',
  templateUrl: './add-content-dialog.component.html',
  styleUrls: ['./add-content-dialog.component.scss']
})
export class AddContentDialogComponent implements OnInit {
  public contentForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddContentDialogComponent>) {
    this.buildContentForm();
  }

  ngOnInit(): void {
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

  addContent(formValues: any): void {
    let newContent = {
      title: formValues.title,
      description: formValues.description,
      prize: formValues.prize,
      imgURL: formValues.imgURL,
      type: formValues.type,
      tags: formValues.tags.split(','),
    };
    this.dialogRef.close({ data: newContent, event: "Add" });
    this.resetFormValues();
  }

  resetFormValues() {
    this.contentForm.reset();
  }

  onCloseClick(): void {
    this.dialogRef.close({ event: "Cancel" });
  }
}
