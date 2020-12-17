import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { GridData } from '../model/grid-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public data: GridData[] = [];
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.data = this.homeService.getData();
  }

}
