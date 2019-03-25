import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { PostService } from '../../shared/services/post.service';
@Component({
  selector: 'app-post-items',
  templateUrl: './post-items.component.html',
  styleUrls: ['./post-items.component.css']
})
export class PostItemsComponent implements OnInit, AfterContentInit {
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
      active: true
    }];
  ckeditorContent = '';
  selectedFile: File;
  // data
  item;

  @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;
  constructor(private fileService: FileUploadService, private postService: PostService) { }

  ngOnInit() {
    this.item = this.postService.getComent(1);

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
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fileService.uploadFile(this.selectedFile).subscribe((data) => {
      console.log(data);

    }, error => {
      console.log(error);

    });


  }

}
