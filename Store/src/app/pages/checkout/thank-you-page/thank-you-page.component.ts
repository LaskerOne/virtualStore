import { Component } from '@angular/core';

@Component({
  selector: 'app-thank-you-page',
  template: `
    <div class="container">
       <h1 class="title"> Thanks for shopping !</h1>
          <p class="content">
            Your order is on the way
          </p>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit laudantium delectus maiores nam cumque tempora consequuntur eligendi labore quasi harum iste, voluptatum tenetur repellendus necessitatibus ipsa culpa quo placeat ea?</span>
    </div>
  `,
  styleUrls: ['./thank-you-page.component.scss']
})
export class ThankYouPageComponent {

  constructor() { }

}
