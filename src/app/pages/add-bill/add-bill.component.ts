import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bill, CreditCard, Loan, BudgetType } from '../../classes/Class';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss'],
})
export class AddBillComponent implements OnInit {
  billForm!: FormGroup;
  loanForm!: FormGroup;
  creditCardForm!: FormGroup;
  budgetTypes = BudgetType;

  constructor() {
    this.billForm = new FormGroup({
      name: new FormControl('', Validators.required),
      payment: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.pattern('^\$(0|[1-9][0-9]{0,2})(,\d{3})*(\.\d{1,2})?$')])
      ),
      dueDate: new FormControl('', Validators.required),
      recurring: new FormControl('', Validators.required),
      dueDay: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {

    this.billForm.valueChanges.subscribe((form: any) => {
      console.log(form);
    })
  }
}
