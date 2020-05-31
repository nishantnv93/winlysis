import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userRef: AngularFirestoreCollection<any> = null;
  userInformation: AngularFirestoreCollection<any> = null;

  constructor(
    public angularFire: AngularFireModule,
    public angularFireStore: AngularFirestore) {
    this.userRef = angularFireStore.collection("user");
  }

  saveUser(userDetails: any) {
    return this.userRef.doc(userDetails.email).set({
      name: userDetails.displayName,
      email: userDetails.email,
      mobile: userDetails.mobile,
      age: userDetails.age
    });
  }

  getUser(key: string) {
    this.userInformation = this.angularFireStore.collection("/user", ref => ref.where('email', '==', key));
    return this.userInformation
  }
}
