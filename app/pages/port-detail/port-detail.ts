import {Page, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/port-detail/port-detail.html'
})
export class PortDetailPage {
  port: any;

  constructor(private navParams: NavParams) {
    this.port = navParams.data;
  }
}
