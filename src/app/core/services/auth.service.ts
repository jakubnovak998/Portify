import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, shareReplay } from 'rxjs/operators';
import { MockUser, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();

  readonly isLoggedIn = computed(() => this._currentUser() !== null);

  private readonly users$ = this.http
    .get<MockUser[]>('assets/data/mock-users.json')
    .pipe(shareReplay(1));

  login(email: string, password: string): Observable<boolean> {
    return this.users$.pipe(
      map((users) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          const { password: _pwd, ...safeUser } = user;
          this._currentUser.set(safeUser);
        }
        return !!user;
      }),
      delay(600),
    );
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    return this.users$.pipe(
      map((users) => {
        const exists = users.some((u) => u.email === email);
        if (!exists) {
          const newUser: MockUser = {
            id: String(users.length + 1),
            email,
            password,
            name,
          };
          users.push(newUser);
          const { password: _pwd, ...safeUser } = newUser;
          this._currentUser.set(safeUser);
        }
        return !exists;
      }),
      delay(600),
    );
  }

  logout(): void {
    this._currentUser.set(null);
  }

  getCurrentUser(): User | null {
    return this._currentUser();
  }
}
