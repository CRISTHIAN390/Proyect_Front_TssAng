import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any = [];
  modalDeleteVisible: boolean = false;
  selectedUser: any = null;
  modalUserVisible = false;
  isCreating: boolean = false;
  userForm: FormGroup;
  isEditMode = false;

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', []],
      role: ['', Validators.required]
    });

    this.userForm.patchValue({
      role: 1
    });
  }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userService.list().subscribe((resp: any) => {
      this.users = resp.data;
      console.log(this.users);
    });
  }
}
