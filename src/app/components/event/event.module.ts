import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { eventRouting } from './event-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EventsComponent, EventCreateComponent, EventEditComponent],
  imports: [
    CommonModule,
    eventRouting,
    ReactiveFormsModule
  ]
})
export class EventModule { }
