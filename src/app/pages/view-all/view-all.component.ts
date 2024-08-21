import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [CommonModule,MaterialModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {

  allPosts: any; 

  constructor(private postService: PostService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (res)=> {
        console.log(res);
        this.allPosts = res;
      },
      (error)=> {
        this.snackBar.open("Error while fetching posts!!!!!", "Ok");
        console.error(error);
      }
    );
  }
}
