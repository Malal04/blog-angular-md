import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-by-name',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MaterialModule,RouterModule],
  templateUrl: './search-by-name.component.html',
  styleUrl: './search-by-name.component.scss'
})
export class SearchByNameComponent {

  result : any = [];
  name : any = "";

  constructor(private postService: PostService, private snackBar: MatSnackBar){}

  searchByName(): void{
    this.postService.searchByName(this.name).subscribe(
      (res) => {
        this.result = res;
        console.log(this.result);
      },
      (error) => {
        console.error(error);
        this.snackBar.open("Error while searching posts by name", "Ok");
      }
    )
  }

}
