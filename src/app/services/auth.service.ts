import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { firstValueFrom, map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
tokenUri = environment.tokenUri;
apiKey = environment.apiKey;
headers = {
  'Content-Type': 'application/json',
};


  constructor(private http: HttpClient) {}

  getToken() {
    let body = {
      key: this.apiKey,
    };

    let tokenQuery = JSON.stringify(body);

    //console.log(JSON.stringify(body));

   return this.http.post(this.tokenUri, tokenQuery, {headers: this.headers});

  }

  Init() {
 
    return new Promise<void>((resolveFn, rejectFn) => {

      // Some condition to return resolve or reject response function
      this.getToken().subscribe((token: any) => {
        //console.log(token['access_token']);

        localStorage.setItem('token', token['access_token']);

        if (localStorage.getItem('token') !== "") {
          console.log('Token Set')
          // App will load normally
          resolveFn();
        } else {
          
          // App will not load
          rejectFn();
        }
      })
   

    });
}



}
