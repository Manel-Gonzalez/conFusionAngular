import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { FeedBack } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }


    submitFeedback(feedback: FeedBack): Observable <FeedBack>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      };
      return this.http.post<FeedBack>(baseURL + 'feedback/' + feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError))
    }
}


