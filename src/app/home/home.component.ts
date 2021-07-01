import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish = new Dish;
  leader:Leader =new Leader;
  promotion: Promotion = new Promotion;

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService:LeaderService) { }

  showSpinner =true;

  ngOnInit() {
 
    this.dishService.getFeaturedDish()
    .subscribe(dishes => this.dish = dishes)

    this.promotionService.getFeaturedPromotion()
    .subscribe( promotion=> this.promotion = promotion)

    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader)
  }



}
