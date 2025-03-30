import { Component } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { signOut, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
}
