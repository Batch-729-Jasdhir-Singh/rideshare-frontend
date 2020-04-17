import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
declare var google;



@Component({
    selector: 'app-google-place',
    template: `<input #inputFieldRef style="border:none; outline:none; width:100%;" type="text">`
})
export class GooglePlaceComponent implements AfterViewInit {
  @ViewChild('inputFieldRef', {static: false}) inputFieldRef: any;
  @Output() googlePlaceObj = new EventEmitter();



  //This is the restrictions object, where we can configure the result restrictions.
  //It is injected into the Autocomplete query instance, each time an autocomplete query is sent.
  //Read Google docs: Place Autocomplete for more information about restrictions at this link: https://developers.google.com/places/web-service/autocomplete .
  restrictions = {
    componentRestrictions: {country: 'US'},
    types: ['address']
  };



  constructor() { }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.inputFieldRef.nativeElement, this.restrictions);
    //Google places docs: "MVC state change notifications reflect changes in Maps JavaScript API objects and are named using a property_changed convention."
    //Pass the configured autocomplete class object into event's addListener method. Note: 'place_changed' is a custom google event.
    //The function called will get the 'place' object of type <any> and emit it to wherever it is implemented.
    //The implementation must have a getGooglePlace() method in the component. See the 'sign-up-modal' template and component for a working example.
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.googlePlaceObj.emit(place);
    });

  }

}