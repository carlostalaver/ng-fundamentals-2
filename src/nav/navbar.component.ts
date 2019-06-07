import { Component, Inject, forwardRef } from "@angular/core";
import { AuthService } from "src/user/auth.service";
import { IUser } from "src/user/user.model";
import { ISession, EventService } from "src/app/events";


@Component ({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
    .nav.navbar-nav { font-size: 15x; }
    #searchForm {margin-right: 10px;}
    @media (max-width: 1200px) {#searchForm {display: none}}
    li > a.active { color: #F97924; }
  `]
})
export class NavBarComponent {
  searchTerm: string;
  foundSession: ISession[] = [];

  constructor(@Inject(forwardRef(() => AuthService)) public authService: AuthService,
              @Inject(forwardRef(() => EventService)) public eventService: EventService) {

  }


  searchSessions(searchTerm) {
    this.eventService.searchSession(searchTerm).subscribe
    (sessions => {
      this.foundSession = sessions;
      console.log('las sessions ', this.foundSession);
    });
  }

}
