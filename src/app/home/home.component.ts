import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish = new Dish;
  dishErrMess: string ='';
  promotionErrMess: string='';
  leaderErrMess: string='';
  leader:Leader =new Leader;
  promotion: Promotion = new Promotion;

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService:LeaderService,
    @Inject('BaseURL') public BaseURL:any)  {}

  showSpinner =true;

  ngOnInit() {
 
    this.dishService.getFeaturedDish()
    .subscribe(dishes => this.dish = dishes,
      errmess => this.dishErrMess = <any>errmess)

    this.promotionService.getFeaturedPromotion()
    .subscribe( promotions => this.promotion = promotions,
      errmess => this.promotionErrMess = <any>errmess)

    this.leaderService.getFeaturedLeader()
    .subscribe((leaders) => this.leader = leaders,
      errmess => this.leaderErrMess = <any>errmess)
  }



}
