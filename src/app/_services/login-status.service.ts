//this 

import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginStatusService {
    private status = new Subject<any>();

    notification = this.status.asObservable();

    constructor() {}

    public sendStatus (data: any) {
        if (data) {
            this.status.next(data);
        }
    }
}
