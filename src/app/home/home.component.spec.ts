import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule.withRoutes([]), NgxPaginationModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sort method should sort values in array', () => {
    component.data = [{ name: 'Regional', description: 'someText', image: '', dateLastEdited: '' },
    { name: 'Dynamic', description: 'someText', image: '', dateLastEdited: '' },
    { name: 'Customer', description: 'someText', image: '', dateLastEdited: '' }];
    let expectedData = [{ name: 'Customer', description: 'someText', image: '', dateLastEdited: '' },
    { name: 'Dynamic', description: 'someText', image: '', dateLastEdited: '' },
    { name: 'Regional', description: 'someText', image: '', dateLastEdited: '' }];
    const value = 'name';
    component.sort(value);
    expect(component.data).toEqual(expectedData);
  });

  it('search method should filter values in array', () => {
    component.completeData = [{ name: 'Regional A', description: 'someText', image: '', dateLastEdited: '' },
    { name: 'Regional B', description: 'someText', image: '', dateLastEdited: '' },
    { name: 'Customer', description: 'someText', image: '', dateLastEdited: '' }];
    let expectedData = [{ name: 'Regional A', description: 'someText', image: '', dateLastEdited: '' },
    { name: 'Regional B', description: 'someText', image: '', dateLastEdited: '' }];
    const value = 'regional';
    component.search(value);
    expect(component.data).toEqual(expectedData);
  });
});
