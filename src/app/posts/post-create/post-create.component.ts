import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {
  enteredValue = 'Enter Text Here';
  newPost = 'New Content Appears Here!';

  onAddPost() {
     this.newPost = this.enteredValue;
   }
}
