import { Component, ViewChild, AfterViewInit, Output,EventEmitter } from '@angular/core';

declare var google;



@Component({
    selector: 'app-google-place',
    template: `<input #addresstext class="input" type="text">`
})
export class GooglePlaceComponent implements AfterViewInit {
  @ViewChild('addresstext', {static: false}) addresstext: any;
  @Output() googlePlaceObj = new EventEmitter();



  addressEntities: Array<any>;



  constructor() { }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: {country: 'US'},
        types: ['geocode']
      });
    //Google places docs: "MVC state change notifications reflect changes in Maps JavaScript API objects and are named using a property_changed convention."
    //Pass the configured autocomplete class object into event's addListener method.
    //'place_changed' is a custom google event.
    //The function called will get the 'place' object of type <any> and captures from it the 'address_components' array into our 'addressEntities' <any> array.
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      //Emit the custom event declared above in the @Output decorator. A reference to the 'place' object is passed as a parameter.
      this.googlePlaceObj.emit(place);
    });

  }

}