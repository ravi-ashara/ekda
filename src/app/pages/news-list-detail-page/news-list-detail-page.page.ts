import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-list-detail-page',
  templateUrl: './news-list-detail-page.page.html',
  styleUrls: ['./news-list-detail-page.page.scss'],
})
export class NewsListDetailPagePage {
  public newsDetails: any;
  constructor(public router: Router,
    public activated: ActivatedRoute) {
    this.activated.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state.news) {
        this.newsDetails = this.router.getCurrentNavigation().extras.state.news;
      }
    });
  }
}
