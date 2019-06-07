import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { EventsListComponent,
         EventThumbnailComponent,
         EventDetailsComponent,
         CreateEventComponent,
         EventRouteActivator,
         EventListResolver,
         DurationPipe
        } from './events/index';

import { TOASTR_TOKEN,
         Toastr,
         CollapsibleWellComponent,
         JQ_TOKEN,
         SimpleModalComponent ,
         ModalTriggerDirective
        } from './common/index';

import { EventsAppComponent} from './events-app.component';
import { UpVoteComponent } from './events/event-details/up-vote.component'
import { NavBarComponent } from 'src/nav/navbar.component';
import { appRoutes } from './route';
import { Error404Component } from './errors/404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSessionComponent } from './events/event-details/create-session.componet';
import { SessionListComponent } from './events/event-details/session-list.component';


let toastr: Toastr = window['toastr'];
//declare let toastr: Toastr;
let jQuery: Object = window['$'];

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpVoteComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    EventRouteActivator,
    EventListResolver,
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState,

    }],
    bootstrap: [EventsAppComponent],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

// tslint:disable-next-line:max-line-length
export function checkDirtyState(component: CreateEventComponent) { /* el primer parametro que recibe la funcion canDeactivate es el componente en sí */

  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
