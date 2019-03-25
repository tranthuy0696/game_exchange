import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CKEditorComponent } from 'ng2-ckeditor';
import { FileUploadService } from '../../../shared/services/file-upload.service';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.css']
})
export class CreateThreadComponent implements OnInit, AfterContentInit {

  item = { name: 'Clash of Clans Accounts' };
  itemListBreadcromb = [
    {
      title: 'Home',
      path: ''
    },
    {
      title: 'Forums',
      path: ''
    },
    {
      title: 'Featured Marketplaces',
      path: '',
    },
    {
      title: 'Clash of Clans Accounts',
      path: '',
      active: true
    },
  ];

  //
  ckeditorContent = '';
  form: FormGroup;
  listOption = ['Selling', 'Buying', 'Trading', 'Sold'];
  // file
  selectedFile: File;

  @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;
  constructor(private formBuilder: FormBuilder, private fileService: FileUploadService) { }

  ngOnInit() {
    this.initForm();

  }
  ngAfterContentInit() {

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    this.configCkEditor();
  }
  /*config ckeditor */
  configCkEditor() {
    const editor = this.ckEditor.instance;
    editor.config.toolbar = [
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline'] },
      { name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
      { name: 'links', items: ['Link', 'Unlink'] },
      { name: 'insert', items: ['Image', 'Smiley'] },
      { name: 'styles', items: ['Styles', 'Font', 'FontSize'] },
      { name: 'colors', items: ['TextColor', 'BGColor'] },
      { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
    ];

  }
  /*form */
  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      content: [this.ckeditorContent, Validators.required],
      price: ['', [Validators.required]],
      link: ['', [Validators.required]]
    });

  }
  onCreateThread() {
    console.log(this.form.value);
    if (this.form.valid) {
      console.log(this.form.value);
     }

  }
  // upload file
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fileService.uploadFile(this.selectedFile).subscribe((data) => {
      console.log(data);

    }, error => {
      console.log(error);

    });


  }


}
