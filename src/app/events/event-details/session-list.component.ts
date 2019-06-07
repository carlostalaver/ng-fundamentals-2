import { Component, Input, OnChanges, forwardRef, Inject } from "@angular/core";
import { ISession } from "../shared";
import { single } from "rxjs/operators";
import { Session } from "protractor";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/user/auth.service";
import { VoterService } from "./voter.service";

@Component({
  selector: "session-list",
  templateUrl: "./session-list.component.html"
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  visibleSession: ISession[] = [];
  @Input() sortBy: string;

  constructor(
    @Inject(forwardRef(() => AuthService)) public auth: AuthService,
    @Inject(forwardRef(() => VoterService)) private voterService: VoterService
  ) {}
  ngOnChanges() {
    if (this.sessions) {
      this.filterSession(this.filterBy);
      this.sortBy === 'name'
        ? this.visibleSession.sort(sorByNameAsc)
        : this.visibleSession.sort(sortByVotesDesc);
    }
  }
  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(session, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(session, this.auth.currentUser.userName);
    }

    if (this.sortBy === 'votes') {
      this.visibleSession.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
     return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }

  filterSession(filter) {
    if (filter === 'all') {
      this.visibleSession = this.sessions.slice(
        0
      ); /* Crea un clo de la matriz session */
    } else {
      this.visibleSession = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }
}

function sorByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) {
    return 1;
  } else if (s1.name === s2.name) {
    return 0;
  } else {
    return -1;
  }
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
