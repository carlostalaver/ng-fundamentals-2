import { Component, Input, EventEmitter , Output} from "@angular/core";

@Component({
  selector: 'upvote',
  styleUrls: ['./up-vote.component.css'],
  template: `<div class="votingWidgetContainer pointable" (click)="onClick()">
  <div class="well votingWidget">
    <div class="votingButton">
      <i class="glyphicon glyphicon-heart" *ngIf="voted"></i>
      <i class="glyphicon glyphicon-heart-emply" *ngIf="!voted"></i>
      <div class="badge badge-inverse votingCount">
        <div>{{ count }}</div>
      </div>
    </div>
  </div>
</div>`
})
export class UpVoteComponent {
  @Input() count: number;
  @Input() voted: boolean;
  @Output() vote = new EventEmitter();

  onClick() {
    this.vote.emit({});
  }
}

