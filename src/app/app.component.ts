import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

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
        'email': new FormControl(null, [Validators.required, Validators.email], this.emailValidator.bind(this))
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });

    this.signupForm.valueChanges.subscribe(
      (value => console.log(value))
    );

    this.signupForm.statusChanges.subscribe(
      (status => console.log(status))
    );

    this.signupForm.setValue({
      'userData': {
        'username': 'tian',
        'email': 'tt@ttt.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'userData': {
        'username': 'tian',
      },
      'gender': 'male',
      'hobbies': []
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

  emailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'tiansiyu297@gmail.com') {
          resolve({'badEmail': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
