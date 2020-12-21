import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
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
    private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.data = this.homeService.getData();
    this.completeData = this.data;
    this.route.queryParams.subscribe(params => {
      this.filterItem = params['searchBy'];
      this.sortingValue = params['sortBy'];
    });
  }

  ngAfterViewInit() {
    if(this.filterItem && this.filterItem.length > 0) {
      this.searchInput.nativeElement.value = this.filterItem;
      this.search('Enter', this.filterItem);
    }
    if (this.sortingValue && this.sortingValue.length > 0) {
    this.sortByDropdown.nativeElement.value = this.sortingValue;
    this.sort(this.sortingValue);
    }
    this.cdr.detectChanges();
  }

  search(key, filterValue) {
    if (key === "Enter") {
      this.data = this.completeData;
      this.filterItem = filterValue ? filterValue.trim().toLowerCase() : '';
      if (this.filterItem && this.filterItem.length > 0) {
      let keywords = this.filterItem.match(/\w+|"(?:\\"|[^"])+"/g).map(element => element.replace(/"/g,""));
        for(let key in keywords) {
          this.data = this.data.filter((item) => {
             return item.name.toLowerCase().includes(keywords[key]) || item.description.toLowerCase().includes(keywords[key])
        });
      }
    } else {
        this.data = this.data;
      }
      this.updateRoute();
    }
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
