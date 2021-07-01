import { Component, OnInit,ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  dish: Dish =new Dish;
  dishIds: string[] = [];
  next: string='';
  prev: string='';
  commentForm!: FormGroup;
  comment: Comment = new Comment;
  @ViewChild('cform') commentFormDirective: any;
  
  formErrors:any={
    'name':'',
    'comment':''
  }

  validationMessages:any={
    'name': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.'
    },
    'comment': {
      'required':      'Your comment',
    }
  }

  constructor(private dishService: DishService,
    private route:ActivatedRoute,
    private location:Location,
    private fb:FormBuilder) {}

  ngOnInit(): void {
    this.createForm();

    this.dishService.getDishIds()
    .subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params
    .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe((dish => { this.dish = dish; this.setPrevNext(dish.id);})
    );
  }

  setPrevNext(dishId: string){
    const index=this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(){
    this.commentForm = this.fb.group({
      author:  ['',[ Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment:['', Validators.required]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?:any){
    if(!this.commentForm){return ;}
    const form = this.commentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.dish.comments.push(this.comment);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      name:'',
      rating:5,
      comment:''
    });
    
  }

}
