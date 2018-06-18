import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  searchRepo(q: string) {
    return this.http.get('https://api.github.com/search/repositories?q=' + q);
  }
  
  getRepo(user, name){
    return this.http.get('https://api.github.com/repos/' + user + '/' + name);
  }

  getIssues(user, name){
    return this.http.get('https://api.github.com/repos/' + user + '/' + name + '/issues');
  }
}
