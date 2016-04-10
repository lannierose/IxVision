import {IonicApp, Page, Modal, Alert, NavController, ItemSliding} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';
import {PortFilterPage} from '../port-filter/port-filter';
import {PortDetailPage} from '../port-detail/port-detail';


@Page({
  templateUrl: 'build/pages/port/port.html'
})
export class PortPage {
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks = [];
  shownPorts = [];
  groups = [];

  constructor(
    private app: IonicApp,
    private nav: NavController,
    private confData: ConferenceData,
    private user: UserData
  ) {
    this.updateSchedule();
  }

  onPageDidEnter() {
    this.app.setTitle('Ports');
  }

  updateSchedule() {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).then(data => {
      this.shownPorts = data.shownPorts;
      this.groups = data.groups;
    });
  }

  presentFilter() {
    let modal = Modal.create(ScheduleFilterPage, this.excludeTracks);
    this.nav.present(modal);

    modal.onDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToPortDetail(portData) {
    // go to the port detail page
    // and pass in the port data
    this.nav.push(PortDetailPage, portData);
  }

  addFavorite(slidingItem: ItemSliding, portData) {

    if (this.user.hasFavorite(portData.name)) {
      // woops, they already favorited it! What shall we do!?
      // create an alert instance
      let alert = Alert.create({
        title: 'Favorite already added',
        message: 'Would you like to remove this port from your favorites?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              // they clicked the cancel button, do not remove the port
              // close the sliding item and hide the option buttons
              slidingItem.close();
            }
          },
          {
            text: 'Remove',
            handler: () => {
              // they want to remove this port from their favorites
              this.user.removeFavorite(portData.name);

              // close the sliding item and hide the option buttons
              slidingItem.close();
            }
          }
        ]
      });
      // now present the alert on top of all other content
      this.nav.present(alert);

    } else {
      // remember this port as a user favorite
      this.user.addFavorite(portData.name);

      // create an alert instance
      let alert = Alert.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      this.nav.present(alert);
    }

  }

}
