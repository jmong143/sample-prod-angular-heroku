import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminNewsService } from '../news/news.service'
import { News } from '../../../models/admin/News'

@Injectable({
  providedIn: 'root'
})
export class AdminNewsResolverService implements Resolve<News[]> {

  constructor(private newsService : AdminNewsService) { }

  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<News[]> {
    return this.newsService.getNews();
  }
}
