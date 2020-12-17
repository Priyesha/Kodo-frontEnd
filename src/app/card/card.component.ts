import { Component, OnInit, Input } from '@angular/core';
import { GridData } from '../model/grid-data';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardData: GridData;
  constructor() { }

  ngOnInit(): void {
  }

}
