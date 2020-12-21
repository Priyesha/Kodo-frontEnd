import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { GridData } from '../model/grid-data';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public data: GridData[] = [];
  public completeData: GridData[] = [];
  p: number = 1;
  public filterItem: string = '';
  public sortingValue: string = '';
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('sortByDropdown') sortByDropdown: ElementRef;
  constructor(private homeService: HomeService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.data = this.homeService.getData();
    this.completeData = this.data;
    this.route.queryParams.subscribe(params => {
      this.filterItem = params['searchBy'];
      this.sortingValue = params['sortBy'];
    });
  }

  ngAfterViewInit() {
    this.searchInput.nativeElement.value = this.filterItem;
    this.sortByDropdown.nativeElement.value = this.sortingValue;
    this.search(this.filterItem);
    this.sort(this.sortingValue);
  }

  search(filterValue) {
    this.data = this.completeData;
    this.filterItem = filterValue ? filterValue.trim().toLowerCase() : '';
    console.log(this.filterItem);
    const searchTerms = this.filterItem.split(' ');
    console.log(searchTerms);
    if (this.filterItem && this.filterItem.length > 0) {
      this.data = this.data.filter((item) => {
        return item.name.toLowerCase().includes(this.filterItem) || item.description.toLowerCase().includes(this.filterItem)
      });
    } else {
      this.data = this.data;
    }
    this.updateRoute();
  }

  sort(value) {
    this.sortingValue = value;
    if (this.sortingValue) {
      this.data = this.data.sort((a, b) => a[value].localeCompare(b[value]));
    }
    this.updateRoute();
  }

  updateRoute() {
    const params = { sortBy: this.sortingValue, searchBy: this.filterItem }
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: params
    })
  }
}
