import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  @Input() file: string;

  constructor() { }

  ngOnInit() {
  }

}
