import { Injectable } from '@angular/core';
import * as sampleData from '../../assets/mockData/mock_data.json';

@Injectable({providedIn: 'root'})
export class HomeService  {

    constructor() {}

    getData() {
        return sampleData['default'];
    }
}