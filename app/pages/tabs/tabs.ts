import {Page, NavParams} from 'ionic-angular';
import {SchedulePage} from '../schedule/schedule';
import {SpeakerListPage} from '../speaker-list/speaker-list';
import {MapPage} from '../map/map';
import {PortPage} from '../port/port';
import {AboutPage} from '../about/about';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = PortPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}