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
  private completeData: GridData[] = [];
  p: number = 1;
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.data = this.homeService.getData();
    this.completeData = this.data;
  }

  search(event: Event) {
    this.data = this.completeData;
    const filterValue = (event.target as HTMLInputElement).value;
    const filterItem = filterValue.trim().toLowerCase();
    console.log(filterItem);
    const searchTerms = filterItem.split(' ');
    console.log(searchTerms);
    if (filterItem && filterItem.length > 0) {
      this.data = this.data.filter((item) => {
        return item.name.toLowerCase().includes(filterItem) || item.description.toLowerCase().includes(filterItem)
      });
    } else {
      this.data = this.data;
    }
  }

  sort(value) {
    if(value) {
    this.data = this.data.sort((a,b) => a[value].localeCompare(b[value]));
    } 
  }
}
