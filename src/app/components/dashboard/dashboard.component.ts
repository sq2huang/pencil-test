import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import MediumEditor from 'medium-editor';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})


export class DashboardComponent implements OnInit {
  protected email: string
  public prevDoc: string
  public reload = false;
  constructor(
    public auth: AuthService,
    public router: Router,
    public ngZone: NgZone,
    protected firestore: AngularFirestore,
  ) {  }

  ngOnInit() { }
  
  getFirebase() {
    this.firestore.collection('pencil-assessment').doc(this.email).ref.get()
      .then(doc => {
        if (doc.exists) {
          this.prevDoc = doc.data().value
        }
        this.reload = true
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

  }

  pushFirebase() {
    var newText = document.getElementById("input-field").innerHTML
    var email = this.auth.userData.email;
    let entry = this.firestore.collection('pencil-assessment').doc(email).ref.get()
      .then(doc => {
        this.firestore
          .collection('pencil-assessment')
          .doc(email)
          .set({ value: newText });
      })
  }

  @ViewChild('media') media: ElementRef;
  ngAfterViewInit() {
    this.email = this.auth.userData.email;
    this.getFirebase()
    const edit= this.media.nativeElement;
    const editor = new MediumEditor(edit);
    editor.subscribe('editableInput', this.pushFirebase.bind(this));
  }
}
