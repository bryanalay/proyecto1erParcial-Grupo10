import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionServiceService {
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public authStatus: Observable<boolean> = this.isLogged.asObservable();

  private userName: string | null = null;

  constructor() {}

  logout(): void {
    this.isLogged.next(false);
    this.userName = null;
  }

  getUserName(): string | null {
    return this.userName;
  }

  login(userName: string): void {
    this.isLogged.next(true);
    this.userName = userName;
  }
}
