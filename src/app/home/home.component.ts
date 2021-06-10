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

  ngOnInit() {

    this.dishService.getFeaturedDish()
    .then(dishes => this.dish = dishes)

    this.promotionService.getFeaturedPromotion()
    .then( promotion=> this.promotion = promotion)

    this.leaderService.getFeaturedLeader()
    .then(leader => this.leader = leader)
  }



}
