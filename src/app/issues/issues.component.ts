import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  public issueData: object;
  public issueError: boolean;
  public repoUser: string;
  public repoName: string;

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Getting repository name and user from the route parameters for the template
    // Filling up issueData with the API response
    this.route.params.subscribe(
      params => {
        this.repoUser = params.user,
        this.repoName = params.name,
        this.data.getIssues(this.repoUser, this.repoName).subscribe(
          data => this.issueData = data,
          error => (this.issueError = true)
        )
      }
    );
  }
}
