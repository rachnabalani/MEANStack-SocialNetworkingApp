import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})

export class PostCreateComponent {
  newPost = 'New Content Appears Here';

  onAddPost(postInput: HTMLTextAreaElement) {
    console.log(postInput);
     this.newPost = postInput.value;
   }
}
