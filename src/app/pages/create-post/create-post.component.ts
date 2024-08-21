import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar , private postService: PostService) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      img: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      postedBy: [null, Validators.required],
      tags: this.fb.array([]) // Utilisation correcte de FormArray
    });
  }

  get tags(): FormArray {
    return this.postForm.get('tags') as FormArray;
  }

  add(event: any) {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(this.fb.control(value));
    }
    event.chipInput!.clear();
  }

  remove(tag: string) {
    const index = this.tags.controls.findIndex((control) => control.value === tag);
    if (index >= 0) {
      this.tags.removeAt(index);
    }
  }

  createPost() {
    const data = this.postForm.value;
    console.log(data);

    this.postService.createNewPost(data).subscribe(
      (res) => {
        console.log(res);
        this.snackBar.open("Post created successfully!", "Ok");
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(error);
        this.snackBar.open("Error while creating post", "Ok");
      }
    );
  }

}
