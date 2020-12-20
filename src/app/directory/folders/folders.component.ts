import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  @Input() folder: string;

  constructor() { }

  ngOnInit() 
  {
  }

}
