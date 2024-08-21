import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment.service';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule,MaterialModule,FormsModule,ReactiveFormsModule],
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  postId: number; 
  postData: any;
  comments: any;
  private subscription: Subscription = new Subscription();

  commentForm !: FormGroup;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private commentService: CommentService
  ) {
    this.postId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log(this.postId);
    this.getPostById();

    this.commentForm = this.fb.group({
      postedBy: [null, Validators.required],
      comment: [null, Validators.required]
    });
  }

  publishComment(): void {
    const postedBy = this.commentForm.get('postedBy')?.value;
    const comment = this.commentForm.get('comment')?.value;
  
    if (postedBy && comment) {
      this.commentService.createComment(this.postId, postedBy, comment).subscribe(
        (res) => {
          console.log(res);
          this.snackBar.open("Comment Published Successfully!", "OK");
          this.getCommentsPost();
        },
        (error) => {
          console.error(error);
          this.snackBar.open("Something Went Wrong!", "OK");
        }
      );
    } else {
      this.snackBar.open("Please fill in all fields.", "OK");
    }
  }

  getCommentsPost(): void{
    this.commentService.getAllCommentsByPost(this.postId).subscribe(
      (res) => {
        console.log(res);
        this.comments = res;
      },
      (error) => {
        console.error(error);
        this.snackBar.open("Something Went Wrong!!!", "OK");
      }
    );
  }
  

  getPostById(): void {
    const postSubscription = this.postService.getAllPostById(this.postId).subscribe(
      (res) => {
        console.log(res);
        this.postData = res;
        this.getCommentsPost();
      },
      (error) => {
        console.error(error);
        this.snackBar.open("Something Went Wrong !!!!", "OK");
      }
    );

    this.subscription.add(postSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  likePost(): void {
    this.postService.likePostById(this.postId).subscribe(
      (res) => {
        console.log(res);
        this.snackBar.open("Post Liked Successfully!!!!", "OK");
        this.getPostById();
      },
      (error) => {
        console.error(error);
        this.snackBar.open("Something Went Wrong!!!!", "OK");
      }
    );
  }

}
