import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'; // ✅ Update Store
import { Router } from '@angular/router'; // ✅ Replace `$state`
import { Observable } from 'rxjs'; // ✅ Use RxJS Observables
import { TranslateService } from '@ngx-translate/core'; // ✅ Replace TranslatePipe with TranslateService
import { securityActions } from 'store/reducers/security.reducer';
import { SessionService, DialogManagerService, AuthService } from 'services';
import { DbTypeService } from 'services/dbTypeService';
import { licenseActions } from 'store/reducers/license.reducer';
import { AppState } from 'store/app.state'; // ✅ Define a proper state interface
import { getAuthenticationMethod } from 'store/actions/security.actions';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public isInvalid = false;
  public isDbMaestro = true;
  public username = '';
  public password = '';
  public rememberMe = true;
  public AuthTypeAndData: any;
  public claims: Object;
  public authHead: string;
  


  constructor(
    private store: Store<AppState>, // ✅ Use Typed Store
    private router: Router, // ✅ Use Router instead of `$state`
    private sessionService: SessionService,
    private authService: AuthService,
    private translateService: TranslateService, // ✅ Use TranslateService
    private dbTypeService: DbTypeService,
    private dialogManagerService: DialogManagerService
  ) {}


  ngOnInit(): void {
    this.isDbMaestro = !(localStorage.getItem('loginType') === 'domain-type');

    this.store.dispatch(getAuthenticationMethod());
    this.store.select((state) => state.security.authMethod).subscribe((response) => {
      this.AuthTypeAndData = response;
      localStorage.setItem('AuthType', JSON.stringify(this.AuthTypeAndData?.AuthenticationMethod));

      if (this.AuthTypeAndData?.AuthenticationMethod === 'oidc') {
        this.authService.setConfiguration(this.AuthTypeAndData);
        this.authService.setManagerSetting();
      }
    });
  }

  public navigateToLicenseUpload(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/auth/license-upload']); // ✅ Replace `$state.go` with `router.navigate`
  }

  public async login() {
    this.isInvalid = false;
    const translations = await this.translateService.get(['ERROR_LOGIN', 'ERROR', 'ERROR_LOGIN_SERVER_FAILD']).toPromise();

    if (this.AuthTypeAndData?.AuthenticationMethod === 'oidc') {
      this.authService.startAuthentication();
      this.claims = JSON.stringify(this.authService.getClaims());
      this.authHead = this.authService.getAuthorizationHeaderValue();
    } else {
      try {
        const user = {
          username: this.username,
          password: this.password,
          rememberMe: this.rememberMe,
          authType: this.isDbMaestro ? 'DBmaestro' : 'WINDOWSAUTH'
        };

        const response = await this.store.dispatch(securityActions.TOKEN({ payload: user }));

        if (response.data) {
          this.sessionService.set('warning', response.data.warning);
          this.store.dispatch(licenseActions.GET_LICENSE_WARNINGS());

          response.data.username = this.username;
          this.sessionService.user = response.data;

          this.dbTypeService.prepareDbTypesImages(
            this.store.select((state) => state.enums.DBTypes)
          );

          const redirectUri = new URLSearchParams(window.location.search).get('redirectUri');
          if (redirectUri && redirectUri !== '#/login') {
            window.location.href = redirectUri;
          } else {
            this.router.navigate(['/authorized/projects']);
          }
        }
      } catch (error) {
        switch (error.status) {
          case 401:
            this.isInvalid = true;
            break;
          case 403:
            this.dialogManagerService.showErrorDialog({ title: translations['ERROR'], text: error.statusText });
            break;
          case 439:
            this.dialogManagerService.showErrorDialog({
              title: translations['ERROR'],
              text: translations['ERROR_LOGIN'].replace('%s', error.statusText)
            });
            break;
          case 460:
            const messageLicense = error.data?.substring(1, error.data.length - 1) || '';
            this.dialogManagerService.showErrorDialog({ title: translations['ERROR'], text: messageLicense });
            break;
          default:
            this.dialogManagerService.showErrorDialog({ title: translations['ERROR'], text: translations['ERROR_LOGIN_SERVER_FAILD'] });
            break;
        }
      }
    }
  }

  public loginTypeChange(isDbMaestro: boolean) {
    this.isDbMaestro = isDbMaestro;
    localStorage.setItem('loginType', this.isDbMaestro ? 'dbmaestro-type' : 'domain-type');
  }
}



