import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApi } from './../../app/shared/elite-api.service';
import { MapPage, TeamHomePage } from '../pages';
declare var window: any;
@Component({
  selector: 'game',
  templateUrl: 'game.page.html'
})
export class GamePage {
  game: any = {};

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi) { }

  ionViewDidLoad() {
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId) {
    const tourneyData = this.eliteApi.getCurrentTourney();
    const team = tourneyData.teams.find(t => t.id === teamId);
    this.nav.push(TeamHomePage, team);
  }

  goToDirections() {
    const tourneyData = this.eliteApi.getCurrentTourney();
    const location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap() {
    this.nav.push(MapPage, this.game);
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2) ? 'secondary' : '';
  }
}
