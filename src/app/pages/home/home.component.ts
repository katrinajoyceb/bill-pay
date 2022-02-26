import { Component, OnInit } from '@angular/core';
import {Apollo, gql } from 'apollo-angular'
import { AuthService } from 'src/app/services/auth.service';

const GET_ACCOUNTS = gql`
{
  account {
    _id
		account_id
		limit
		products
  }
}`


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private apollo: Apollo,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAccounts();
    //this.getToken();
  }

  getToken(){
    this.authService.getToken().subscribe(result => {
      console.log(result);
    })
  }

  getAccounts(){
    this.apollo.watchQuery({
      query: GET_ACCOUNTS,

      
    }).valueChanges.subscribe((result) => {
      console.log(result);
    })
  }

}
