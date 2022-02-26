import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { HomeComponent } from './pages/home/home.component';
import { InMemoryCache,ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { AuthService } from './services/auth.service';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddBillComponent } from './pages/add-bill/add-bill.component';
import { ReactiveFormsModule } from '@angular/forms';


// function initializeApp(authService: AuthService): Promise<any> {
//   return new Promise((resolve, reject) => {
//     // Do some asynchronous stuff
//   authService.getToken().subscribe((result: any) => {
//     console.log('App Initializing')
//       console.log(result);
//       let token = result['access_token'];
//       localStorage.setItem('token', result['access_token']);
//     })
    
//     resolve();
//   });
// }


export function initializeApp(authService: AuthService) {
  return (): Promise<any> => { 
    return authService.Init();
  }
}


const uri = environment.graphQlUri;

export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
       'Accept': 'charset=utf-8',
      'Content-Type': 'application/json'
    }
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
}
  
    
  






@NgModule({
  declarations: [AppComponent, HomeComponent, AddBillComponent],
  imports: [BrowserModule,  ReactiveFormsModule, AppRoutingModule, ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService:AuthService)=>()=>authService.Init(),
      deps: [AuthService],
      multi: true
     },
     {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
