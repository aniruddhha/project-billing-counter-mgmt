import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavCommunicationService {

  private isDrawerOpen: WritableSignal<boolean> = signal(false)

  constructor() { }

  setDrawerState(st : boolean) {
    this.isDrawerOpen.update( prv => !prv)
  }

  getDrawerState() {
    return this.isDrawerOpen()
  }
}
