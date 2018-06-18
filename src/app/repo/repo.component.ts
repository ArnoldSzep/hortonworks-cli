import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as d3 from 'd3';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit {

  public repoData;
  public repoUserAvatar;
  public repoUser;
  public repoName;
  public repoLicense;
  public repoError: boolean;
  public searchLoading: boolean = false;
  public showChart: boolean = false;
  public chartIsLive: boolean = false;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.searchLoading = true;

    // switchMap to get the new data even if we are on the same component
    this.repoData = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.data.getRepo(params.get('user'), params.get('name'))
      )
    );

    // Filling license and avatar variables from the API data directly
    // because somehow this throws an error (repoData.owner.avatar_url) in the template
    // even though it shows the value
    this.repoData.subscribe(
      data => (
        this.repoData = data,
        this.repoUserAvatar = data.owner.avatar_url + '&s=120',
        this.repoLicense = (data.license ? data.license.key : 'nothing'),
        this.chartIsLive = false
      ),
      error => (this.repoError = true, this.backToHome()),
    )
  }

  // redirecting to homepage in case of error
  backToHome() {
    let rounter = this.router;

    setTimeout(function () {
      rounter.navigate(['/']);
    }, 2500);
  }


  // Charts
  chart() {
    let chartSvg = document.getElementById('chart_svg').innerHTML = ''; // Reset chart
    this.chartIsLive = true;

    // D3 stuff
    let dataset = [this.repoData.stargazers_count, this.repoData.forks_count, this.repoData.subscribers_count, this.repoData.open_issues_count, this.repoData.size],
      frameW = 500,
      frameH = 300,
      barPadding = 5,
      barW = (frameW / dataset.length);

    let frame = d3.select('svg#chart_svg')
      .attr('width', frameW)
      .attr('height', frameH);

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, frameH - 20]);

    let barChart = frame.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('y', function (d) {
        return frameH - yScale(d);
      })
      .attr('height', function (d) {
        return yScale(d);
      })
      .attr('width', barW - barPadding)
      .attr('transform', function (d, i) {
        let translate = [barW * i, 0]
        return 'translate(' + translate + ')';
      })
      .attr('fill', '#012a46');

    let text = frame.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(function (d) {
        return d;
      })
      .attr('y', function (d, i) {
        return frameH - yScale(d) - 2;
      })
      .attr('x', function (d, i) {
        return barW * i;
      })
      .attr('fill', '#012a46');
  }
}
