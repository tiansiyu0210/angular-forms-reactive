import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['chris', 'alan'];


  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl('default name', [Validators.required, this.userNameValidator.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required));
  }

  userNameValidator(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserNames.includes(control.value)) {
      return {'badName': true};
    }
    return {'badName': false};
  }
}
