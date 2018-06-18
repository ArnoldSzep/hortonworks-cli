import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  public query: string;
  public searchResults: object;
  public searchLoading: boolean = false;
  public searchHide: boolean = false;
  public searchCount: number;
  public searchError: string = '';

  constructor(private data: DataService) { }

  ngOnInit() {}

  // The search function
  // Bet you're surprised!
  search(query) {
    this.searchHide = true;
    this.searchLoading = true;
    this.searchError = '';

    this.data.searchRepo(query).subscribe(
      data => (this.searchResults = data['items'], this.searchCount = data['total_count']),
      error => (this.searchError = 'YOU DONE FUCKED IT UP!', this.searchLoading = false, this.searchHide = true),
      () => (this.searchLoading = false, this.searchHide = false, this.searchCount <= 0 ? this.searchError = 'DO YOU EVEN TYPE!?' : '')
    )
  }
}
