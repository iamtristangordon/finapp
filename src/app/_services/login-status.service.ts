import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginStatusService {
  private status = new Subject<any>();

    //subject above as an observable, hides source identity i.e. no .next()
    //only this service should have access to observer methods
    notification = this.status.asObservable();

    constructor() {}

    public sendStatus (data: any) {
        if (data) {
            this.status.next(data);
        }
    }
}
